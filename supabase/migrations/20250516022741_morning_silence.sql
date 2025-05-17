/*
  # Add Game-Specific Tables

  1. New Tables
    - `wheel_settings`: Stores wheel of fortune settings
    - `memory_settings`: Stores memory game settings
    - `scratch_settings`: Stores scratch card settings
    - `puzzle_settings`: Stores puzzle game settings
    - `dice_settings`: Stores dice game settings
    - `target_settings`: Stores target shooting game settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create wheel_settings table
CREATE TABLE IF NOT EXISTS wheel_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  segments jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create memory_settings table
CREATE TABLE IF NOT EXISTS memory_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  pairs integer NOT NULL DEFAULT 6,
  cards jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scratch_settings table
CREATE TABLE IF NOT EXISTS scratch_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  prize jsonb NOT NULL DEFAULT '{}'::jsonb,
  reveal_percent integer NOT NULL DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create puzzle_settings table
CREATE TABLE IF NOT EXISTS puzzle_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  image_url text,
  grid_size integer NOT NULL DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dice_settings table
CREATE TABLE IF NOT EXISTS dice_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  sides integer NOT NULL DEFAULT 6,
  style text NOT NULL DEFAULT 'classic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create target_settings table
CREATE TABLE IF NOT EXISTS target_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  targets integer NOT NULL DEFAULT 5,
  speed integer NOT NULL DEFAULT 1000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE wheel_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scratch_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzle_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE dice_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE target_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for wheel_settings
CREATE POLICY "Users can manage wheel settings from own campaigns"
  ON wheel_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for memory_settings
CREATE POLICY "Users can manage memory settings from own campaigns"
  ON memory_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for scratch_settings
CREATE POLICY "Users can manage scratch settings from own campaigns"
  ON scratch_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for puzzle_settings
CREATE POLICY "Users can manage puzzle settings from own campaigns"
  ON puzzle_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for dice_settings
CREATE POLICY "Users can manage dice settings from own campaigns"
  ON dice_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for target_settings
CREATE POLICY "Users can manage target settings from own campaigns"
  ON target_settings
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Add triggers for updated_at
CREATE TRIGGER update_wheel_settings_updated_at
  BEFORE UPDATE ON wheel_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memory_settings_updated_at
  BEFORE UPDATE ON memory_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scratch_settings_updated_at
  BEFORE UPDATE ON scratch_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_puzzle_settings_updated_at
  BEFORE UPDATE ON puzzle_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dice_settings_updated_at
  BEFORE UPDATE ON dice_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_target_settings_updated_at
  BEFORE UPDATE ON target_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();