/*
  # Add Game Settings Support

  1. Changes
    - Add game_type column for storing the type of game
    - Add game_settings column for storing game-specific configuration
    - Add game_content column for storing game content (questions, options, etc.)
    - Add game_style column for storing visual customization
*/

-- Add columns for game settings if they don't exist
DO $$ 
BEGIN
  -- Add game_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'game_type'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN game_type text;
  END IF;

  -- Add game_settings column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'game_settings'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN game_settings jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add game_content column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'game_content'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN game_content jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add game_style column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'game_style'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN game_style jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;