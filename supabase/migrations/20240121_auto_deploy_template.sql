-- Vercel Auto-Deploy Webhook Setup
-- This script creates a trigger to call Vercel's Deploy Hook whenever content changes.

-- 1. First, create the function that calls the webhook
-- REPLACE 'YOUR_VERCEL_DEPLOY_HOOK_URL' with your actual URL from Vercel Project Settings > Git > Deploy Hooks
-- Example URL format: https://api.vercel.com/v1/integrations/deploy/prj_...

CREATE OR REPLACE FUNCTION trigger_vercel_deploy()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the change is a publish/unpublish event or content update
  IF (TG_OP = 'INSERT' AND NEW.is_published = true) OR
     (TG_OP = 'UPDATE' AND (NEW.is_published != OLD.is_published OR NEW.title != OLD.title OR NEW.content != OLD.content)) OR
     (TG_OP = 'DELETE' AND OLD.is_published = true) THEN
     
     -- Call the Vercel Deploy Hook
     -- Note: Requires pg_net extension to be enabled in Supabase
     -- Enable it in Database > Extensions
     
     -- Using pg_net (recommended)
     PERFORM net.http_post(
        url := 'YOUR_VERCEL_DEPLOY_HOOK_URL',
        body := '{}'::jsonb
     );
     
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create Triggers for Blog Posts
DROP TRIGGER IF EXISTS on_blog_post_change ON blog_posts;
CREATE TRIGGER on_blog_post_change
AFTER INSERT OR UPDATE OR DELETE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION trigger_vercel_deploy();

-- 3. Create Triggers for Gallery Images (Mood Board)
DROP TRIGGER IF EXISTS on_gallery_image_change ON gallery_images;
CREATE TRIGGER on_gallery_image_change
AFTER INSERT OR UPDATE OR DELETE ON gallery_images
FOR EACH ROW EXECUTE FUNCTION trigger_vercel_deploy();

-- NOTE: To enable the pg_net extension, run:
-- CREATE EXTENSION IF NOT EXISTS "pg_net";
