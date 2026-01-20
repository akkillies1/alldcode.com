import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const BASE_URL = 'https://www.dplhomestar.com';
const SKIP_SSG = process.env.SKIP_SSG === '1';
const HARD_TIMEOUT_MS = 600000;

// Mock browser globals for SSG
global.window = {
    location: {
        pathname: '/',
        href: BASE_URL,
        origin: BASE_URL,
    },
    scrollTo: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
};
global.document = {
    cookie: '',
    getElementById: () => null,
    querySelector: () => null,
    documentElement: {
        style: {},
        classList: {
            add: () => { },
            remove: () => { },
            contains: () => false,
        },
    },
};
global.localStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 0,
    key: () => null
};
global.sessionStorage = global.localStorage;

function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
    ]);
}

async function getAppData() {
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase credentials missing. Skipping dynamic data fetching.');
        return { posts: [], latestGalleryDate: new Date() };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts } = await withTimeout(
        supabase
            .from('blog_posts')
            .select('slug, updated_at')
            .eq('is_published', true)
            .order('updated_at', { ascending: false }),
        15000
    );

    const { data: galleryImages } = await withTimeout(
        supabase
            .from('gallery_images')
            .select('updated_at')
            .eq('is_published', true)
            .order('updated_at', { ascending: false })
            .limit(1),
        15000
    );

    return {
        posts: posts || [],
        latestGalleryDate: galleryImages && galleryImages.length > 0 ? new Date(galleryImages[0].updated_at) : new Date()
    };
}

function generateSitemap(posts, latestGalleryDate, distPath, publicPath) {
    console.log('Generating sitemap...');
    const staticRoutes = ['/', '/mood-board', '/blog', '/privacy-policy'];
    const latestPostDate = posts.length > 0 ? new Date(posts[0].updated_at) : new Date();

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

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

    posts.forEach(post => {
        sitemap += `
    <url>
        <loc>${BASE_URL}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    sitemap += '\n</urlset>';

    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
    if (fs.existsSync(distPath)) {
        fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
    }
    console.log('Sitemap generated successfully!');
}

async function build() {
    const root = path.resolve(__dirname, '..');
    const dist = path.resolve(root, 'dist');
    const publicDir = path.resolve(root, 'public');
    const hardTimer = setTimeout(() => {
        console.error('SSG hard timeout');
        process.exit(1);
    }, HARD_TIMEOUT_MS);

    // 1. Fetch data once
    console.log('Fetching application data...');
    const { posts, latestGalleryDate } = await getAppData();

    // 2. Generate Sitemap
    generateSitemap(posts, latestGalleryDate, dist, publicDir);

    if (SKIP_SSG) {
        console.log('Skipping SSG because SKIP_SSG=1');
        clearTimeout(hardTimer);
        process.exit(0);
    }

    // 3. Create vite server to load the server entry
    const vite = await createServer({
        root,
        server: { middlewareMode: true },
        appType: 'custom'
    });

    try {
        // 4. Load the template
        console.log('Loading template...');
        const template = fs.readFileSync(path.resolve(dist, 'index.html'), 'utf-8');

        // 5. Load the server entry
        console.log('Loading server entry...');
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        // 6. Define routes to render
        const blogRoutes = posts.map(post => `/blog/${post.slug}`);
        const routes = ['/', '/blog', '/mood-board', '/privacy-policy', ...blogRoutes];

        console.log(`Prerendering ${routes.length} routes...`);

        for (const url of routes) {
            console.log(`Prerendering: ${url}`);
            const helmetContext = {};
            const { html: appHtml } = await render(url, helmetContext);
            const { helmet } = helmetContext;

            const headHtml = [
                helmet.title.toString(),
                helmet.priority ? helmet.priority.toString() : '',
                helmet.meta.toString(),
                helmet.link.toString(),
                helmet.script.toString()
            ].filter(Boolean).join('\n');

            const html = template
                .replace('<!--app-head-->', headHtml)
                .replace('<!--app-html-->', appHtml);

            const fileName = url === '/' ? 'index.html' : `${url}/index.html`;
            const filePath = path.resolve(dist, fileName);
            const dirPath = path.dirname(filePath);

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(filePath, html);
            console.log(`Successfully prerendered: ${url}`);
        }

        console.log('SSG complete!');

    } catch (e) {
        console.error('SSG failed:', e);
        clearTimeout(hardTimer);
        process.exit(1);
    } finally {
        await vite.close();
        clearTimeout(hardTimer);
        process.exit(0);
    }
}

build();
