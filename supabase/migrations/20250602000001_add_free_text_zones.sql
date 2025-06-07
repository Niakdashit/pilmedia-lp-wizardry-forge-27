-- Add free_text_zones column to campaigns
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'campaigns' AND column_name = 'free_text_zones'
    ) THEN
        ALTER TABLE campaigns ADD COLUMN free_text_zones JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;
