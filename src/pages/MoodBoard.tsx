import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { SEO } from "@/components/SEO";
import { GalleryModal } from "@/components/GalleryModal";
import { ArrowLeft, LayoutGrid, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    tags: string[];
    mood?: string | null;
}

const MoodBoard = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery_images')
                .select('*')
                .eq('is_published', true)
                .order('display_order', { ascending: true });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenImage = (index: number) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent/30">
            <SEO
                title="The Design Mood Board | Signature Luxury Selection"
                description="Explore the curated design vision of DPL Homestar. An immersive gallery of luxury interiors, bespoke furniture, and architectural inspirations."
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                        <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:block">Back</span>
                        </Link>

                        <Link to="/" className="flex items-center gap-3 group">
                            <Logo className="w-32 md:w-40 h-auto transition-transform duration-500 group-hover:scale-105" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Home</Link>
                        <Link to="/blog" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Journal</Link>
                        <Link to="/#contact">
                            <Button
                                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 font-bold uppercase tracking-wider text-[10px]"
                            >
                                Inquire Now
                            </Button>
                        </Link>
                    </div>

                    <MobileMenu isScrolled={true} />
                </div>
            </nav>

            <main className="pt-32 pb-24">
                <div className="container-custom">
                    {/* Header Section */}
                    <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold">The Signature Atelier</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 tracking-tighter leading-[0.9]">
                            The Design <br />
                            <span className="text-accent italic font-light">Mood Board</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 font-serif italic max-w-2xl mx-auto leading-relaxed">
                            "Artistic visions, precision crafted. Explore our curated selection of signature spaces and atmospheric details."
                        </p>
                    </div>

                    {/* Grid Gallery (Equal Size Tiles) */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                            <span className="text-white/20 text-[10px] uppercase tracking-widest mt-6 font-bold">Curating gallery...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] aspect-square transition-all duration-700 hover:border-accent/40 hover:shadow-[0_0_50px_rgba(252,211,77,0.1)]"
                                    onClick={() => handleOpenImage(index)}
                                >
                                    <img
                                        src={image.image_url}
                                        alt={image.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-accent text-[9px] uppercase tracking-[0.3em] font-bold block mb-2">
                                                {image.mood || 'Signature Luxury'}
                                            </span>
                                            <h3 className="text-white text-2xl font-serif italic mb-4">
                                                {image.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {image.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[8px] uppercase tracking-widest px-2 py-1 bg-white/10 rounded-sm border border-white/5">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Small mood badge (always visible) */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-60 group-hover:opacity-0 transition-opacity">
                                        <span className="text-[8px] uppercase tracking-widest font-bold">
                                            {image.mood || 'Luxury'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Back to Home CTA */}
                    <div className="mt-32 text-center">
                        <div className="h-px w-24 bg-white/10 mx-auto mb-16" />
                        <h2 className="text-3xl md:text-5xl font-serif mb-12 italic text-white/80">Inspired by what you see?</h2>
                        <Link to="/#contact">
                            <Button className="bg-white text-black hover:bg-accent hover:text-accent-foreground rounded-full px-12 h-16 text-lg font-bold transition-all duration-500 group shadow-2xl">
                                Let's Shape Your Vision
                                <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-black">
                <div className="container-custom flex flex-col items-center">
                    <Logo className="w-48 h-auto opacity-40 grayscale hover:grayscale-0 transition-all mb-8" />
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium text-center">
                        © {new Date().getFullYear()} DPL HOMESTAR. CURATED WITH PRECISION BY DCODE PRIVATE LIMITED.
                    </p>
                </div>
            </footer>

            <GalleryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialIndex={selectedIndex}
                initialViewMode="detail"
            />
        </div>
    );
};

export default MoodBoard;
