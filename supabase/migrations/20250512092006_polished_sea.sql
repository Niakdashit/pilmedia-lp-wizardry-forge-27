/*
  # Add public URL to campaigns

  1. Changes
    - Add public_url column to campaigns table
    - Add unique constraint on public_url
    - Add function to generate unique slugs
    - Add trigger to auto-generate public_url on insert
*/

-- Function to generate URL-safe slug from campaign name
CREATE OR REPLACE FUNCTION generate_unique_slug(name text) 
RETURNS text AS $$
DECLARE
  base_slug text;
  new_slug text;
  counter integer := 0;
BEGIN
  -- Convert name to URL-safe slug
  base_slug := lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'));
  new_slug := base_slug;
  
  -- Add counter if slug exists
  WHILE EXISTS (SELECT 1 FROM campaigns WHERE public_url = new_slug) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- Add public_url column
ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS public_url text UNIQUE;

-- Create trigger to generate public_url on insert
CREATE OR REPLACE FUNCTION set_public_url()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.public_url IS NULL THEN
    NEW.public_url := generate_unique_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_campaign_public_url
  BEFORE INSERT ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION set_public_url();

-- Update existing campaigns
UPDATE campaigns 
SET public_url = generate_unique_slug(name) 
WHERE public_url IS NULL;