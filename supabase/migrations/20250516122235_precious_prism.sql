/*
  # Add Participations Table

  1. New Tables
    - `participations`: Stores user participation data
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `civilite` (text)
      - `nom` (text)
      - `prenom` (text)
      - `email` (text)
      - `adresse` (text)
      - `code_postal` (text)
      - `ville` (text)
      - `pays` (text)
      - `date_naissance` (date)
      - `reglement_accepte` (boolean)
      - `created_at` (timestamp)

  2. Indexes
    - Add index on campaign_id for better query performance
*/

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

-- Create index for better performance
CREATE INDEX idx_participations_campaign ON participations(campaign_id);