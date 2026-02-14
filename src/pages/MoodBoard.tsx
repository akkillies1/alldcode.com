import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { ImageLightbox } from "@/components/ImageLightbox";

type Project = Database['public']['Tables']['projects']['Row'];
type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];

const MoodBoard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [unassignedImages, setUnassignedImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 1. Fetch Published Projects
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (projectError) throw projectError;
            setProjects(projectData || []);

            // 2. Fetch Unassigned Images (Orphans) for the Stream
            const { data: imageData, error: imageError } = await supabase
                .from('gallery_images')
                .select('*')
                .is('project_id', null)
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (imageError) throw imageError;
            setUnassignedImages(imageData || []);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
            <SEO
                title="Projects & Mood Board | DPL Homestar"
                description="Explore our portfolio of completed luxury interiors and our daily design mood board."
            />

            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8">

                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Layers className="w-5 h-5 text-accent animate-pulse" />
                            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold">The Collection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 tracking-tight">
                            Signature <span className="text-accent italic">Projects</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-serif italic max-w-2xl mx-auto">
                            "A showcase of our finest turnkey executions and architectural narratives."
                        </p>
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {projects.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                                    {projects.map((project) => (
                                        <Link
                                            key={project.id}
                                            to={`/mood-board/${project.slug}`}
                                            className="group block"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted mb-4">
                                                <img
                                                    src={project.cover_image_url || '/placeholder.svg'}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-serif mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Unassigned / Mood Board Stream */}
                            {unassignedImages.length > 0 && (
                                <div className="animate-fade-in">
                                    <div className="flex items-center justify-center gap-4 mb-12">
                                        <div className="h-px w-12 bg-border" />
                                        <h2 className="text-2xl font-serif italic text-muted-foreground">Daily Inspiration</h2>
                                        <div className="h-px w-12 bg-border" />
                                    </div>

                                    <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                        {unassignedImages.map((image) => (
                                            <div key={image.id} className="break-inside-avoid relative group rounded-lg overflow-hidden bg-card mb-4 shadow-sm hover:shadow-md transition-shadow">
                                                {image.media_type === 'instagram' && image.social_media_url ? (
                                                    <div className="relative w-full aspect-[4/5] bg-accent/5">
                                                        <iframe
                                                            src={`${image.social_media_url.replace(/\/$/, '')}/embed`}
                                                            className="w-full h-full border-0 absolute inset-0"
                                                            scrolling="no"
                                                            title={image.title}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ) : image.media_type === 'facebook' && image.social_media_url ? (
                                                    <div className="w-full p-4 bg-[#1877F2]/5 flex flex-col items-center justify-center text-center min-h-[200px]">
                                                        <span className="text-xs font-bold text-[#1877F2] mb-2 uppercase tracking-widest">Facebook Post</span>
                                                        <p className="text-sm font-medium mb-4 line-clamp-3">{image.title}</p>
                                                        <a
                                                            href={image.social_media_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-xs bg-[#1877F2] text-white px-3 py-1 rounded-full hover:bg-[#1877F2]/90 transition-colors"
                                                        >
                                                            View Post
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="relative cursor-pointer"
                                                        onClick={() => setLightboxIndex(unassignedImages.findIndex(img => img.id === image.id))}
                                                    >
                                                        <img
                                                            src={image.image_url || '/placeholder.svg'}
                                                            alt={image.title}
                                                            className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                            <p className="text-white text-sm font-medium line-clamp-2">{image.title}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* CTA */}
                    <div className="mt-32 text-center">
                        <h2 className="text-3xl font-serif mb-8 italic">Ready to start your project?</h2>
                        <Link to="/#contact">
                            <Button size="lg" className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                                Get in Touch <Sparkles className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <ImageLightbox
                images={unassignedImages}
                currentIndex={lightboxIndex}
                isOpen={lightboxIndex !== -1}
                onClose={() => setLightboxIndex(-1)}
                onNavigate={(index) => setLightboxIndex(index)}
            />

            <Footer />
        </div>
    );
};

export default MoodBoard;
