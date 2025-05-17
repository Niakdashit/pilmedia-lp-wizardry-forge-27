/*
  # Rename campaign date columns to follow PostgreSQL conventions

  1. Changes
    - Rename `endDate` to `end_date` to follow PostgreSQL naming conventions
    - Rename `startDate` to `start_date` to follow PostgreSQL naming conventions
    - Rename `createdAt` to `created_at` to follow PostgreSQL naming conventions
    - Rename `updatedAt` to `updated_at` to follow PostgreSQL naming conventions

  2. Notes
    - This migration ensures consistent column naming across the database
    - All columns use snake_case as per PostgreSQL best practices
*/

DO $$ 
BEGIN
  -- Only rename if the columns exist with the old names
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'enddate'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "endDate" TO end_date;
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'startdate'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "startDate" TO start_date;
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'createdat'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "createdAt" TO created_at;
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'campaigns' 
    AND column_name = 'updatedat'
  ) THEN
    ALTER TABLE campaigns RENAME COLUMN "updatedAt" TO updated_at;
  END IF;
END $$;