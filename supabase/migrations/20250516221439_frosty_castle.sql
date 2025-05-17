/*
  # Add Participations Table

  1. New Tables
    - `participations`: Stores campaign participation data
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - Basic participant info (civilite, nom, prenom)
      - Contact info (email, address)
      - Consent tracking (reglement_accepte)
      - Timestamps (created_at)

  2. Changes
    - Create participations table if it doesn't exist
    - Add index for campaign_id lookups
    - Add cascade delete for campaign references
*/

-- Create participations table
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
  created_at timestamptz DEFAULT timezone('utc', now())
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
END
$$;