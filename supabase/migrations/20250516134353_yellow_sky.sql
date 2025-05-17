/*
  # Standardize Campaigns Schema

  1. Changes
    - Ensure consistent column naming
    - Add missing columns
    - Set proper default values
    - Add necessary indexes
    - Update foreign key relationships
    - Add missing triggers
    
  2. Security
    - Maintain RLS policies
    - Add missing policies for participations table
*/

-- Standardize campaigns table columns
ALTER TABLE campaigns
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN type SET NOT NULL,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN participants SET DEFAULT 0,
  ALTER COLUMN colors SET DEFAULT '{}'::jsonb,
  ALTER COLUMN style SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_settings SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_content SET DEFAULT '{}'::jsonb,
  ALTER COLUMN game_style SET DEFAULT '{}'::jsonb;

-- Add missing indexes
CREATE INDEX IF NOT EXISTS campaigns_name_idx ON campaigns(name);
CREATE INDEX IF NOT EXISTS campaigns_type_idx ON campaigns(type);
CREATE INDEX IF NOT EXISTS campaigns_status_idx ON campaigns(status);
CREATE INDEX IF NOT EXISTS campaigns_start_date_idx ON campaigns(start_date);
CREATE INDEX IF NOT EXISTS campaigns_end_date_idx ON campaigns(end_date);

-- Enable RLS on participations table
ALTER TABLE participations ENABLE ROW LEVEL SECURITY;

-- Add policies for participations table
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

-- Add trigger to update campaign participants count
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

-- Add trigger to record analytics on participation
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