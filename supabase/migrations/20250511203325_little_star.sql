/*
  # Fix users table RLS policies

  1. Security Changes
    - Add INSERT policy for users table to allow new signups
    - Ensure users can only insert their own record
    - Keep existing policies for SELECT and UPDATE

  Note: This migration adds the missing INSERT policy that was preventing new user signups
*/

-- Add policy to allow users to insert their own record during signup
CREATE POLICY "Users can insert own record"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);