/*
  # Fix Campaigns RLS Policies

  1. Changes
    - Drop existing RLS policies for campaigns table
    - Create new, more specific policies with proper checks
    - Ensure user_id is properly handled for new campaigns

  2. Security
    - Maintain row-level security
    - Add proper checks for user_id on insert
    - Keep existing access patterns for other operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

-- Create new policies with proper checks
CREATE POLICY "Users can insert own campaigns"
ON campaigns FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id = auth.uid()
);

CREATE POLICY "Users can read own campaigns"
ON campaigns FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update own campaigns"
ON campaigns FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own campaigns"
ON campaigns FOR DELETE
TO authenticated
USING (user_id = auth.uid());