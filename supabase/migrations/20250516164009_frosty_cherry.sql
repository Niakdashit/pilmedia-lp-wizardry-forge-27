/*
  # Add form_fields column to campaigns table

  1. Changes
    - Add `form_fields` column to `campaigns` table to store form field data
    - Column type is JSONB to store structured form field data
    - Default value is an empty array
*/

ALTER TABLE campaigns
ADD COLUMN IF NOT EXISTS form_fields JSONB DEFAULT '[]'::jsonb;