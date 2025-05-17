/*
  # Fix Database Schema Inconsistencies

  1. Changes
    - Remove duplicate camelCase columns
    - Standardize all column names to snake_case
    - Fix foreign key constraints and indexes
    - Add missing triggers
    - Update RLS policies
    - Add proper defaults for JSON columns
    - Fix campaign analytics integration

  2. Security
    - Maintain RLS policies
    - Ensure proper access control
*/

-- Drop duplicate camelCase columns from campaigns
ALTER TABLE campaigns
  DROP COLUMN IF EXISTS "startDate",
  DROP COLUMN IF EXISTS "endDate",
  DROP COLUMN IF EXISTS "startTime",
  DROP COLUMN IF EXISTS "endTime",
  DROP COLUMN IF EXISTS "createdAt",
  DROP COLUMN IF EXISTS "updatedAt",
  DROP COLUMN IF EXISTS "backgroundImage";

-- Ensure all required columns exist with proper types
ALTER TABLE campaigns
  ADD COLUMN IF NOT EXISTS start_date timestamptz,
  ADD COLUMN IF NOT EXISTS end_date timestamptz,
  ADD COLUMN IF NOT EXISTS start_time time with time zone,
  ADD COLUMN IF NOT EXISTS end_time time with time zone,
  ADD COLUMN IF NOT EXISTS background_image text,
  ADD COLUMN IF NOT EXISTS public_url text UNIQUE,
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN type SET NOT NULL,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN participants SET DEFAULT 0,
  ALTER COLUMN colors SET DEFAULT '{}'::jsonb,
  ALTER COLUMN style SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_settings SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_content SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_style SET DEFAULT '{}'::jsonb;

-- Drop and recreate participations table with proper constraints
DROP TABLE IF EXISTS participations CASCADE;
CREATE TABLE participations (
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
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- Create proper indexes
CREATE INDEX IF NOT EXISTS idx_participations_campaign_id ON participations(campaign_id);
CREATE INDEX IF NOT EXISTS campaigns_name_idx ON campaigns(name);
CREATE INDEX IF NOT EXISTS campaigns_type_idx ON campaigns(type);
CREATE INDEX IF NOT EXISTS campaigns_status_idx ON campaigns(status);
CREATE INDEX IF NOT EXISTS campaigns_start_date_idx ON campaigns(start_date);
CREATE INDEX IF NOT EXISTS campaigns_end_date_idx ON campaigns(end_date);
CREATE INDEX IF NOT EXISTS campaigns_user_id_idx ON campaigns(user_id);

-- Enable RLS on all tables
ALTER TABLE participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "Public can insert participations" ON participations;
DROP POLICY IF EXISTS "Campaign owners can view participations" ON participations;

CREATE POLICY "Public can insert participations"
  ON participations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Campaign owners can view participations"
  ON participations
  FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create or replace analytics trigger
CREATE OR REPLACE FUNCTION record_participation_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO campaign_analytics (
    campaign_id,
    event_type,
    created_at
  ) VALUES (
    NEW.campaign_id,
    'participation',
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS record_participation_analytics ON participations;
CREATE TRIGGER record_participation_analytics
  AFTER INSERT ON participations
  FOR EACH ROW
  EXECUTE FUNCTION record_participation_analytics();

-- Create or replace participants counter trigger
CREATE OR REPLACE FUNCTION increment_campaign_participants()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE campaigns
  SET participants = participants + 1,
      updated_at = now()
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_campaign_participants ON participations;
CREATE TRIGGER update_campaign_participants
  AFTER INSERT ON participations
  FOR EACH ROW
  EXECUTE FUNCTION increment_campaign_participants();

-- Create or replace updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();