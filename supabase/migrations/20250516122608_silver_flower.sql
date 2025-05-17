/*
  # Fix Campaign Date Columns

  1. Changes
    - Add end_date and start_date columns if they don't exist
    - Migrate data from endDate and startDate if they exist
    - Drop old columns after migration
    - Add time columns for start and end times
*/

-- Add new columns if they don't exist
DO $$ 
BEGIN
  -- Add end_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN end_date timestamptz;
  END IF;

  -- Add start_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN start_date timestamptz;
  END IF;

  -- Add end_time column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'end_time'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN end_time time with time zone;
  END IF;

  -- Add start_time column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'start_time'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN start_time time with time zone;
  END IF;

  -- Migrate data from old columns if they exist
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'enddate'
  ) THEN
    UPDATE campaigns SET end_date = "endDate";
    ALTER TABLE campaigns DROP COLUMN "endDate";
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'startdate'
  ) THEN
    UPDATE campaigns SET start_date = "startDate";
    ALTER TABLE campaigns DROP COLUMN "startDate";
  END IF;
END $$;