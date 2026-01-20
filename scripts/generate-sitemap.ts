import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BASE_URL = 'https://www.dplhomestar.com';

const staticRoutes = [
    '/',
    '/mood-board',
    '/blog',
    '/privacy-policy',
];

async function generateSitemap() {
    console.log('Generating sitemap...');

    try {
        // Fetch blog posts
        const { data: posts, error: postsError } = await supabase
            .from('blog_posts')
            .select('slug, updated_at')
            .eq('is_published', true)
            .order('updated_at', { ascending: false });

        if (postsError) console.error('Error fetching posts:', postsError);

        // Fetch gallery images for mood board lastmod
        const { data: galleryImages, error: galleryError } = await supabase
            .from('gallery_images')
            .select('updated_at')
            .eq('is_published', true)
            .order('updated_at', { ascending: false })
            .limit(1);

        if (galleryError) console.error('Error fetching gallery images:', galleryError);

        const latestPostDate = posts && posts.length > 0 ? new Date(posts[0].updated_at) : new Date();
        const latestGalleryDate = galleryImages && galleryImages.length > 0 ? new Date(galleryImages[0].updated_at) : new Date();

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static routes with dynamic lastmod
        staticRoutes.forEach(route => {
            let lastmod = new Date().toISOString();
            let priority = '0.8';
            let changefreq = 'weekly';

            if (route === '/') {
                priority = '1.0';
            } else if (route === '/blog') {
                lastmod = latestPostDate.toISOString();
                changefreq = 'daily';
            } else if (route === '/mood-board') {
                lastmod = latestGalleryDate.toISOString();
                changefreq = 'daily';
            }

            sitemap += `
    <url>
        <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
        });

        // Add individual blog posts
        posts?.forEach(post => {
            sitemap += `
    <url>
        <loc>${BASE_URL}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        const publicDir = path.resolve(__dirname, '../public');
        const distDir = path.resolve(__dirname, '../dist');

        // Write to both public (for next build) and dist (for current deploy)
        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        if (fs.existsSync(distDir)) {
            fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
        }

        console.log('Sitemap generated successfully!');
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

generateSitemap();
