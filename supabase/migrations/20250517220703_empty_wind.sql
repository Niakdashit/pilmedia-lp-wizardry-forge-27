/*
  # Enable Public Campaign Access

  1. Changes
    - Add policy to allow public read access to campaigns
    - Add policy to allow public read access to questions
    - Add policy to allow public read access to form_fields
    
  2. Security
    - Only allow read access to published campaigns
    - Maintain existing policies for authenticated users
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published campaigns" ON campaigns;
DROP POLICY IF EXISTS "Public can view campaign questions" ON questions;
DROP POLICY IF EXISTS "Public can view campaign form fields" ON form_fields;

-- Create policy for public campaign access
CREATE POLICY "Public can view published campaigns"
  ON campaigns
  FOR SELECT
  TO public
  USING (status = 'active' OR status = 'published');

-- Create policy for public question access
CREATE POLICY "Public can view campaign questions"
  ON questions
  FOR SELECT
  TO public
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE status = 'active' OR status = 'published'
  ));

-- Create policy for public form fields access
CREATE POLICY "Public can view campaign form fields"
  ON form_fields
  FOR SELECT
  TO public
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE status = 'active' OR status = 'published'
  ));