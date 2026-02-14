-- ============================================
-- 1. CREATE PROJECTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT, 
  cover_image_url TEXT, 
  
  -- Social / Video Link for the Project itself (e.g. Walkthrough Reel)
  video_url TEXT, 
  
  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published, published_at DESC);

-- Trigger for updated_at (Safe Re-creation)
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (Safe Creation)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public can view published projects') THEN
        CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (is_published = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Authenticated users can manage projects') THEN
        CREATE POLICY "Authenticated users can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;


-- ============================================
-- 2. UPDATE GALLERY IMAGES TABLE
-- ============================================

-- Add reference to projects table
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

-- Add media_type
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image';

-- CRITICAL: Allow image_url to be NULL so we can have "Social Only" posts without uploads
ALTER TABLE gallery_images 
ALTER COLUMN image_url DROP NOT NULL;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_gallery_project ON gallery_images(project_id);

-- ============================================
-- 3. STORAGE UPDATE (Safe Creation)
-- ============================================
-- Create a bucket for project covers if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-covers', 'project-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for Storage (Using DO block to avoid duplicate errors)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public can view project covers') THEN
        CREATE POLICY "Public can view project covers" ON storage.objects FOR SELECT USING (bucket_id = 'project-covers');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload project covers') THEN
        CREATE POLICY "Authenticated users can upload project covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-covers' AND auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can update project covers') THEN
        CREATE POLICY "Authenticated users can update project covers" ON storage.objects FOR UPDATE USING (bucket_id = 'project-covers' AND auth.role() = 'authenticated');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can delete project covers') THEN
        CREATE POLICY "Authenticated users can delete project covers" ON storage.objects FOR DELETE USING (bucket_id = 'project-covers' AND auth.role() = 'authenticated');
    END IF;
END $$;
