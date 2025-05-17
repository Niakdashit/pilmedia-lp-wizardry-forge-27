/*
  # Update Campaign Policies for Full Access

  1. Changes
    - Modify all policies to allow any authenticated user to perform any operation
    - Remove user_id restrictions from all policies
    
  2. Security
    - Maintain authentication requirement
    - Allow all authenticated users to perform any operation on any campaign
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

-- Create new policies that allow all authenticated users to perform any operation
CREATE POLICY "Users can view all campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update any campaign"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete any campaign"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (true);