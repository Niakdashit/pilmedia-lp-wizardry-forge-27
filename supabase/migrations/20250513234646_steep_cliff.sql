/*
  # Add Campaign Analytics

  1. New Tables
    - `campaign_analytics`: Stores participation and view data
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `ip_address` (text)
      - `event_type` (text): 'view' | 'participation' | 'form_view' | 'question_view' | 'completion'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Allow public inserts for analytics
    - Allow campaign owners to view analytics
*/

-- Create campaign_analytics table
CREATE TABLE IF NOT EXISTS campaign_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  ip_address text NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX campaign_analytics_campaign_id_idx ON campaign_analytics(campaign_id);
CREATE INDEX campaign_analytics_ip_event_idx ON campaign_analytics(ip_address, event_type);
CREATE INDEX campaign_analytics_created_at_idx ON campaign_analytics(created_at);

-- Enable RLS
ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public inserts"
  ON campaign_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Campaign owners can view analytics"
  ON campaign_analytics
  FOR SELECT
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM campaigns WHERE user_id = auth.uid()
  ));