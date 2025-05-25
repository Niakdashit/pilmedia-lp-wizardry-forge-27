/*
  # Game Results Schema

  1. New Tables
    - `game_results`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `game_type` (text)
      - `result` (jsonb)
      - `score` (integer)
      - `duration` (integer)
      - `is_winner` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `game_results` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS game_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  game_type text NOT NULL,
  result jsonb NOT NULL DEFAULT '{}',
  score integer,
  duration integer,
  is_winner boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own results"
  ON game_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own results"
  ON game_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_game_results_campaign_id ON game_results(campaign_id);
CREATE INDEX idx_game_results_user_id ON game_results(user_id);
CREATE INDEX idx_game_results_game_type ON game_results(game_type);