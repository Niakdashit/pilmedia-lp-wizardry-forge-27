/*
  # Campaign Management Schema

  1. New Tables
    - campaigns: Stores campaign information
    - questions: Stores quiz/survey questions
    - form_fields: Stores form field configurations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  status text NOT NULL,
  background_image text,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  participants integer DEFAULT 0,
  colors jsonb,
  style jsonb
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  text text NOT NULL,
  type text NOT NULL,
  options jsonb,
  correct_answer text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create form_fields table
CREATE TABLE IF NOT EXISTS form_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  label text NOT NULL,
  type text NOT NULL,
  required boolean DEFAULT false,
  options jsonb,
  placeholder text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_fields ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;
    DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
    DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
    DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;
    DROP POLICY IF EXISTS "Users can read questions from own campaigns" ON questions;
    DROP POLICY IF EXISTS "Users can manage questions from own campaigns" ON questions;
    DROP POLICY IF EXISTS "Users can read form fields from own campaigns" ON form_fields;
    DROP POLICY IF EXISTS "Users can manage form fields from own campaigns" ON form_fields;
EXCEPTION
    WHEN undefined_object THEN
END $$;

-- Create policies for campaigns
CREATE POLICY "Users can read own campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for questions
CREATE POLICY "Users can read questions from own campaigns"
  ON questions
  FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage questions from own campaigns"
  ON questions
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

-- Create policies for form_fields
CREATE POLICY "Users can read form fields from own campaigns"
  ON form_fields
  FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage form fields from own campaigns"
  ON form_fields
  FOR ALL
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));