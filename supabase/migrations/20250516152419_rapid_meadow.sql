/*
  # Create participations table

  1. New Tables
    - `participations`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key to campaigns)
      - `civilite` (text, required)
      - `nom` (text, required)
      - `prenom` (text, required)
      - `email` (text)
      - `adresse` (text)
      - `code_postal` (text)
      - `ville` (text)
      - `pays` (text)
      - `date_naissance` (date)
      - `reglement_accepte` (boolean, required)
      - `created_at` (timestamptz)

  2. Indexes
    - Index on campaign_id for faster lookups
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

CREATE INDEX IF NOT EXISTS idx_participations_campaign ON participations(campaign_id);