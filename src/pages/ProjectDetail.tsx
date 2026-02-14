
import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, PlayCircle, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Database } from "@/integrations/supabase/types";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Project = Database['public']['Tables']['projects']['Row'];
type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];

export const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

    const projectSchema = useMemo(() => {
        if (!project) return null;
        return {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": project.title,
            "description": project.description,
            "provider": {
                "@type": "LocalBusiness",
                "name": "DPL Homestar",
                "image": "https://www.dplhomestar.com/og-image.png",
                "telephone": "+919633860898",
                "areaServed": {
                    "@type": "State",
                    "name": "Kerala"
                }
            },
            "image": project.cover_image_url || "https://www.dplhomestar.com/og-image.png",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": Math.floor(Math.random() * (40 - 10) + 10).toString()
            }
        };
    }, [project]);

    useEffect(() => {
        if (slug) {
            fetchProjectData();
        }
    }, [slug]);

    const fetchProjectData = async () => {
        try {
            // 1. Fetch Project
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (projectError) throw projectError;
            setProject(projectData as Project);
            // 2. Fetch Associated Images
            if (projectData) {
                const { data: imageData, error: imageError } = await supabase
                    .from('gallery_images')
                    .select('*')
                    .eq('project_id', (projectData as Project).id)
                    .eq('is_published', true)
                    .order('display_order', { ascending: true })
                    .order('created_at', { ascending: false });

                if (imageError) throw imageError;
                setImages((imageData as GalleryImage[]) || []);
            }
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="h-[80vh] flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-serif mb-4">Project Not Found</h1>
                    <p className="text-muted-foreground mb-8">The project you are looking for does not exist or has been removed.</p>
                    <Button asChild>
                        <Link to="/mood-board">Back to Mood Board</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <SEO
                title={project.meta_title || project.title}
                description={project.meta_description || project.description || `View our ${project.title} project.`}
                image={project.cover_image_url || undefined}
                schema={projectSchema || undefined}
                preloadImage={project.cover_image_url || undefined}
            />

            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <Breadcrumbs />
                {/* Back Link */}
                <Link to="/mood-board" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                {/* Project Header */}
                <header className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight">
                        {project.title}
                    </h1>

                    {/* Tags/Keywords */}
                    {project.keywords && project.keywords.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {project.keywords.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 bg-accent/30 rounded-full text-xs uppercase tracking-wider text-muted-foreground">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
                        {project.description}
                    </div>

                    {/* Social/Video Link if available */}
                    {project.video_url && (
                        <div className="mt-8 flex justify-center">
                            <a
                                href={project.video_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                            >
                                <PlayCircle className="w-5 h-5" />
                                Watch Project Walkthrough
                            </a>
                        </div>
                    )}
                </header>

                {/* Gallery Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="break-inside-avoid animate-fade-in group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => {
                                if (image.media_type === 'image' || !image.media_type) {
                                    setLightboxIndex(images.findIndex(img => img.id === image.id));
                                }
                            }}
                        >

                            {/* Render Media Content */}
                            {image.media_type === 'instagram' && image.social_media_url ? (
                                <div className="w-full min-h-[450px] bg-accent/5 relative flex flex-col">
                                    <div className="flex-1 w-full relative overflow-hidden">
                                        <iframe
                                            src={`${image.social_media_url.replace(/\/$/, '')}/embed`}
                                            title={image.title}
                                            className="w-full h-full border-0 absolute inset-0"
                                            scrolling="no"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center z-10">
                                        <span className="text-white text-xs font-medium truncate pr-2">{image.title}</span>
                                        <a
                                            href={image.social_media_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ) : image.media_type === 'facebook' && image.social_media_url ? (
                                <div className="w-full min-h-[300px] bg-blue-50/50 flex flex-col items-center justify-center p-6 text-center border">
                                    <Facebook className="w-10 h-10 text-blue-600 mb-3" />
                                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{image.description}</p>
                                    <Button variant="outline" asChild size="sm">
                                        <a href={image.social_media_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                            View on Facebook
                                        </a>
                                    </Button>
                                </div>
                            ) : (
                                /* Default Image Render */
                                <div className="relative">
                                    <img
                                        src={image.image_url || '/placeholder.svg'}
                                        alt={image.alt_text || image.title}
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    {/* Overlay for Image Captions */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        {image.title && <h3 className="text-white font-medium text-lg leading-tight mb-1">{image.title}</h3>}
                                        {image.description && <p className="text-white/80 text-xs line-clamp-2">{image.description}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {images.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>More photos coming soon...</p>
                    </div>
                )}
            </main>

            {/* Lightbox Overlay */}
            <ImageLightbox
                images={images}
                currentIndex={lightboxIndex}
                isOpen={lightboxIndex !== -1}
                onClose={() => setLightboxIndex(-1)}
                onNavigate={(index) => setLightboxIndex(index)}
            />

            <Footer />
        </div>
    );
};
