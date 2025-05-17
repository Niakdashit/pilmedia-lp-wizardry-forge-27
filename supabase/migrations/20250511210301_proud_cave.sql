/*
  # Update users table schema

  1. Changes
    - Set default values for existing NULL records
    - Make full_name, company, and phone required
    - Add performance indexes
    - Update RLS policies with validation

  2. Security
    - Update RLS policies to enforce data validation
    - Maintain existing security model
*/

-- Set default values for existing NULL records
UPDATE public.users 
SET 
  full_name = COALESCE(full_name, 'Unknown User'),
  company = COALESCE(company, 'Unknown Company'),
  phone = COALESCE(phone, 'No Phone');

-- Make columns required
ALTER TABLE public.users
  ALTER COLUMN full_name SET DEFAULT 'Unknown User',
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN company SET DEFAULT 'Unknown Company',
  ALTER COLUMN company SET NOT NULL,
  ALTER COLUMN phone SET DEFAULT 'No Phone',
  ALTER COLUMN phone SET NOT NULL;

-- Add performance indexes
CREATE INDEX IF NOT EXISTS users_full_name_idx ON public.users (full_name);
CREATE INDEX IF NOT EXISTS users_company_idx ON public.users (company);

-- Update policies with validation
DROP POLICY IF EXISTS "Users can insert own record" ON public.users;
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

CREATE POLICY "Users can insert own record"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id AND
    full_name IS NOT NULL AND
    company IS NOT NULL AND
    phone IS NOT NULL
  );

CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    full_name IS NOT NULL AND
    company IS NOT NULL AND
    phone IS NOT NULL
  );