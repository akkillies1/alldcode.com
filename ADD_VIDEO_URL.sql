
-- Add video_url column to projects table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'video_url') THEN
        ALTER TABLE projects ADD COLUMN video_url TEXT;
    END IF;
END $$;
