/*
  # Fix Campaigns RLS Policies

  1. Changes
    - Drop existing RLS policies for campaigns table
    - Create new, more specific RLS policies with proper conditions
    
  2. Security
    - Enable RLS on campaigns table (already enabled)
    - Add policies for:
      - INSERT: Users can only insert campaigns with their own user_id
      - SELECT: Users can only read their own campaigns
      - UPDATE: Users can only update their own campaigns
      - DELETE: Users can only delete their own campaigns
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

-- Create new policies with proper conditions
CREATE POLICY "Users can insert own campaigns"
ON campaigns
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()
);

CREATE POLICY "Users can read own campaigns"
ON campaigns
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

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