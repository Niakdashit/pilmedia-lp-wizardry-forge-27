/*
  # Fix Campaign Background Image Column

  1. Changes
    - Rename backgroundImage column to background_image to follow SQL naming conventions
    - Update existing data to preserve values
*/

-- Rename the column
ALTER TABLE campaigns 
RENAME COLUMN "backgroundImage" TO background_image;