/*
  # Add Reusable Content Support

  1. New Tables
    - `content_templates`: Stores reusable content templates
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `type` (text)
      - `user_id` (uuid, foreign key)
      - `data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on content_templates table
    - Add policies for authenticated users
*/

-- Create content_templates table
CREATE TABLE IF NOT EXISTS content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id)
);

-- Enable RLS
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all content templates"
  ON content_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own content templates"
  ON content_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content templates"
  ON content_templates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own content templates"
  ON content_templates
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster searches
CREATE INDEX content_templates_name_idx ON content_templates (name);
CREATE INDEX content_templates_type_idx ON content_templates (type);
CREATE INDEX content_templates_user_id_idx ON content_templates (user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_content_templates_updated_at
  BEFORE UPDATE ON content_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();