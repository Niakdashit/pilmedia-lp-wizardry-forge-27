/*
  # Participations Table and Policies

  1. New Tables
    - `participations` table for storing campaign participation data
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key to campaigns)
      - Various participant fields (civilite, nom, prenom, etc.)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on participations table
    - Add policies for viewing and inserting participations
    - Create triggers for analytics and participant counting

  3. Indexes
    - Add index on campaign_id for better query performance
*/

-- Create participations table if it doesn't exist
CREATE TABLE IF NOT EXISTS participations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  civilite text NOT NULL,
  nom text NOT NULL,
  prenom text NOT NULL,
  email text,
  adresse text,
  code_postal text,
  ville text,
  pays text,
  date_naissance date,
  reglement_accepte boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- Create index if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_participations_campaign'
  ) THEN
    CREATE INDEX idx_participations_campaign ON participations(campaign_id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE participations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Campaign owners can view participations" ON participations;
  DROP POLICY IF EXISTS "Public can insert participations" ON participations;
  DROP POLICY IF EXISTS "campaign_owners_can_view_participations" ON participations;
  DROP POLICY IF EXISTS "public_can_insert_participations" ON participations;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies for participations
CREATE POLICY "campaign_owners_can_view_participations"
  ON participations
  FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

CREATE POLICY "public_can_insert_participations"
  ON participations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS record_participation_analytics ON participations;
DROP TRIGGER IF EXISTS increment_campaign_participants ON participations;
DROP TRIGGER IF EXISTS update_campaign_participants ON participations;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS record_participation_analytics();
DROP FUNCTION IF EXISTS increment_campaign_participants();

-- Create or replace functions and triggers
CREATE OR REPLACE FUNCTION record_participation_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO campaign_analytics (campaign_id, event_type)
  VALUES (NEW.campaign_id, 'participation');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER record_participation_analytics
  AFTER INSERT ON participations
  FOR EACH ROW
  EXECUTE FUNCTION record_participation_analytics();

CREATE OR REPLACE FUNCTION increment_campaign_participants()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE campaigns
  SET participants = participants + 1
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_campaign_participants
  AFTER INSERT ON participations
  FOR EACH ROW
  EXECUTE FUNCTION increment_campaign_participants();