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

// Mock browser globals for SSG
global.localStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    length: 0,
    key: () => null
};
global.sessionStorage = global.localStorage;

async function getBlogRoutes() {
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase credentials missing. Skipping dynamic blog routes.');
        return [];
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('is_published', true);

    return posts ? posts.map(post => `/blog/${post.slug}`) : [];
}

async function build() {
    const root = path.resolve(__dirname, '..');
    const dist = path.resolve(root, 'dist');

    // 1. Create vite server to load the server entry
    const vite = await createServer({
        root,
        server: { middlewareMode: true },
        appType: 'custom'
    });

    try {
        // 2. Load the template
        const template = fs.readFileSync(path.resolve(dist, 'index.html'), 'utf-8');

        // 3. Load the server entry
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        // 4. Define routes to render
        const blogRoutes = await getBlogRoutes();
        const routes = ['/', '/blog', '/mood-board', ...blogRoutes]; // Add any other public routes here

        console.log(`Prerendering ${routes.length} routes...`);

        for (const url of routes) {
            const helmetContext = {};
            const { html: appHtml } = await render(url, helmetContext);
            const { helmet } = helmetContext;

            // Extract helmet tags
            const headHtml = [
                helmet.title.toString(),
                helmet.priority.toString(),
                helmet.meta.toString(),
                helmet.link.toString(),
                helmet.script.toString()
            ].join('\n');

            // 5. Inject into template
            const html = template
                .replace('<!--app-head-->', headHtml)
                .replace('<!--app-html-->', appHtml);

            // 6. Save target file
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
    } finally {
        await vite.close();
    }
}

build();
