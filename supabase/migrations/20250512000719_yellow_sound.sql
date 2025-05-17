/*
  # Add user_id column to campaigns table

  1. Changes
    - Add `user_id` column to `campaigns` table
    - Add foreign key constraint to link with users table
    - Add index on user_id for better query performance
    - Update RLS policies to use user_id

  2. Security
    - Ensure RLS policies are updated to use the new user_id column
    - Maintain existing security model where users can only access their own campaigns
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN user_id uuid REFERENCES auth.users(id);
    CREATE INDEX campaigns_user_id_idx ON campaigns(user_id);
  END IF;
END $$;

-- Update RLS policies to use user_id
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;
CREATE POLICY "Users can read own campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
CREATE POLICY "Users can insert own campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid() IS NOT NULL) AND (user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
CREATE POLICY "Users can update own campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;
CREATE POLICY "Users can delete own campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());