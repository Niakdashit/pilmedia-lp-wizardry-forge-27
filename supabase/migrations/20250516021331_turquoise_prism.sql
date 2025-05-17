/*
  # Add background_image column to campaigns table

  1. Changes
    - Add background_image column to campaigns table
    - Update existing null values to empty string
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add background_image column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'background_image'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN background_image text;
  END IF;
END $$;

-- Update any existing null values to empty string
UPDATE campaigns 
SET background_image = ''
WHERE background_image IS NULL;