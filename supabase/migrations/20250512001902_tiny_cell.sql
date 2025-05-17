/*
  # Update Campaign Policies for Shared Access

  1. Changes
    - Modify SELECT policy to allow all authenticated users to view all campaigns
    - Keep other policies (INSERT, UPDATE, DELETE) restricted to campaign owners
    
  2. Security
    - Maintain write restrictions to campaign owners
    - Allow read access to all authenticated users
*/

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;

-- Create new SELECT policy that allows all authenticated users to view campaigns
CREATE POLICY "Users can view all campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (true);

-- Keep existing policies for write operations
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

CREATE POLICY "Users can insert own campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid() IS NOT NULL) AND (user_id = auth.uid()));

CREATE POLICY "Users can update own campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());