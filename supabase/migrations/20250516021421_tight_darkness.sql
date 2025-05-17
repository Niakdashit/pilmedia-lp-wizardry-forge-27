/*
  # Fix background image column naming

  1. Changes
    - Add an alias for the background_image column to support camelCase naming
    - This ensures compatibility between the frontend code and database schema
    - No data migration needed as this is just an alias

  2. Technical Details
    - Uses a computed column to create an alias
    - Maintains backward compatibility
    - No data loss or modification
*/

ALTER TABLE campaigns 
ADD COLUMN IF NOT EXISTS "backgroundImage" text 
GENERATED ALWAYS AS (background_image) STORED;