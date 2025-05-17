/*
  # Fix Campaign Table Timestamp Columns

  1. Changes
    - Rename timestamp columns to follow PostgreSQL naming conventions
    - createdAt -> created_at
    - updatedAt -> updated_at
    
  2. Notes
    - This ensures consistent column naming across the database
    - All columns use snake_case as per PostgreSQL best practices
*/

-- Rename timestamp columns if they exist with the old names
DO $$ 
BEGIN
  -- Rename createdAt to created_at if it exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'createdat'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "createdAt" TO created_at;
  END IF;

  -- Rename updatedAt to updated_at if it exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'updatedat'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "updatedAt" TO updated_at;
  END IF;

  -- Add columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'created_at'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create or replace trigger for updated_at
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