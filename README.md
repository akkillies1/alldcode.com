# dplHomestar | Luxury Interior Design & Turnkey Solutions

dplHomestar is a premium digital platform for a boutique interior design firm specializing in turnkey executions and architectural narratives. Designed for a high-end designer aesthetic, it blends seamless user experiences with a powerful admin-driven content management system.

## 🌟 Key Features

### 🏢 Signature Projects
- **Boutique Showcase**: High-resolution project galleries with custom SEO metadata per project.
- **Narrative-Driven**: Detailed project descriptions and walkthrough links.

### 🎨 Interactive Mood Board
- **Design Inspiration Stream**: A dynamic masonry grid featuring unassigned "Daily Inspiration" images.
- **Image Lightbox**: A premium, fullscreen image viewer with:
    - **Metadata Sidebar**: Dedicated RHS information area for desktop.
    - **Smart Navigation**: Arrow button navigation and full keyboard support (←/→/Esc).
    - **Mobile Optimized**: Responsive stacking and touch-friendly interface.
- **Social Integration**: Seamless support for Instagram and Facebook media embeds.

### 📝 Design Journal (Blog)
- **Content Marketing**: A fully optimized blog system for sharing insights, trends, and design stories.
- **Tagging System**: Categorize and filter articles by design tokens.
- **SEO Ready**: Article-level schema and meta tags for high search engine visibility.

### 📬 Lead Management System
- **Smart Contact Form**: Intelligent validation including country-specific mobile number checks.
- **Enquiry Database**: Direct integration with Supabase for reliable lead storage.
- **Automated Notifications**: Real-time email alerts via Brevo/Supabase Edge Functions.

### 🔐 Admin Atelier (CMS)
- **Role-Based Access**: Secured admin panel via Supabase Auth and RLS.
- **Media Management**: Upload images, link project galleries, and manage social embeds.
- **Workflow Tools**: Dedicated managers for Projects, Testimonials, Blogs, and Leads.

## 🚀 Performance & Optimization
- **Lazy Loading**: Route-based code splitting using `React.lazy` and Suspense.
- **Image Optimization**: Native browser lazy loading applied across all galleries and feeds.
- **SEO Excellence**: Integrated React Helmet Async for dynamic metadata and social graph tags.
- **Security Checkpoint**: PIN-gated admin access with rate-limiting.

## 🛠️ Tech Stack
- **Frontend**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **State & Data**: [TanStack Query (React Query)](https://tanstack.com/query/latest), [Supabase SDK](https://supabase.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, Edge Functions)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) Project

### Steps
1. **Clone the Project**
   ```bash
   git clone [repository-url]
   cd dplhomestar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Schema**
   Execute the SQL scripts provided in the `/supabase` folder or the root migrations (`ADD_VIDEO_URL.sql`, etc.) in your Supabase SQL Editor to set up the tables and RLS policies.

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📄 License
**Property of DCODE PRIVATE LIMITED.**
All rights reserved. Unauthorized copying, modification, or distribution of this software is strictly prohibited.
