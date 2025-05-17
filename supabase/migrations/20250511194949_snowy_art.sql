/*
  # Create users table and policies

  1. New Tables
    - `users` table with basic profile information
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `phone` (text, nullable)
      - `company` (text, nullable)
      - `role` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on users table
    - Add policies for users to read and update their own data
    
  3. Automation
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  phone text,
  company text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON public.users;
  DROP POLICY IF EXISTS "Users can update own data" ON public.users;
END $$;

-- Create policies
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
  WITH CHECK (auth.uid() = id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();