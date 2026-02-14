import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy loading all pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin").then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(module => ({ default: module.AdminDashboard })));
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager").then(module => ({ default: module.GalleryManager })));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager").then(module => ({ default: module.TestimonialsManager })));
const BlogManager = lazy(() => import("./pages/admin/BlogManager").then(module => ({ default: module.BlogManager })));
const GalleryImageForm = lazy(() => import("./pages/admin/GalleryImageForm").then(module => ({ default: module.GalleryImageForm })));
const TestimonialForm = lazy(() => import("./pages/admin/TestimonialForm").then(module => ({ default: module.TestimonialForm })));
const BlogPostForm = lazy(() => import("./pages/admin/BlogPostForm").then(module => ({ default: module.BlogPostForm })));
const LeadsManager = lazy(() => import("./pages/admin/LeadsManager").then(module => ({ default: module.LeadsManager })));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const MoodBoard = lazy(() => import("./pages/MoodBoard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Locations = lazy(() => import("./pages/Locations"));
const Location = lazy(() => import("./pages/Location"));
const InteriorDesignCostGuide = lazy(() => import("./pages/guides/InteriorDesignCostGuide"));
const ProjectList = lazy(() => import("./pages/admin/ProjectList").then(module => ({ default: module.ProjectList })));
const ProjectForm = lazy(() => import("./pages/admin/ProjectForm").then(module => ({ default: module.ProjectForm })));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then(module => ({ default: module.ProjectDetail })));

const LoadingFallback = () => (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
);

export const AppRoutes = () => (
    <Suspense fallback={<LoadingFallback />}>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mood-board" element={<MoodBoard />} />
            <Route path="/mood-board/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:city" element={<Location />} />
            <Route path="/guides/interior-design-cost-kerala" element={<InteriorDesignCostGuide />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/leads" element={<LeadsManager />} />

                {/* Projects Management */}
                <Route path="/admin/projects" element={<ProjectList />} />
                <Route path="/admin/projects/new" element={<ProjectForm />} />
                <Route path="/admin/projects/:id" element={<ProjectForm />} />

                <Route path="/admin/blog/:id" element={<BlogPostForm />} />
                <Route path="/admin/gallery" element={<GalleryManager />} />
                <Route path="/admin/gallery/new" element={<GalleryImageForm />} />
                <Route path="/admin/gallery/:id" element={<GalleryImageForm />} />
                <Route path="/admin/testimonials" element={<TestimonialsManager />} />
                <Route path="/admin/testimonials/new" element={<TestimonialForm />} />
                <Route path="/admin/testimonials/:id" element={<TestimonialForm />} />
                <Route path="/admin/blog" element={<BlogManager />} />
                <Route path="/admin/blog/new" element={<BlogPostForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

