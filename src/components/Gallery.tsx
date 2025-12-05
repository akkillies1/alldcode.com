import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { GalleryModal } from "./GalleryModal";

interface GalleryImage {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    thumbnail_url: string | null;
    tags: string[];
}

export const Gallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchFeaturedImages();
    }, []);

    const fetchFeaturedImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery_images')
                .select('*')
                .eq('is_published', true)
                .eq('is_featured', true)
                .order('display_order', { ascending: true })
                .limit(8);

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="portfolio" className="py-[60px] md:py-[80px]">
                <div className="container-custom">
                    <div className="text-center">
                        <p className="text-muted-foreground">Loading gallery...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (images.length === 0) {
        return null; // Don't show section if no images
    }

    return (
        <>
            <section id="portfolio" className="py-[60px] md:py-[80px]">
                <div className="container-custom">
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">
                            Our Work
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                            A curated selection of our interior design projects
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <Card
                                key={image.id}
                                className="group relative overflow-hidden cursor-pointer premium-card-hover animate-fade-in aspect-square"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <img
                                    src={image.thumbnail_url || image.image_url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="text-white">
                                        <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                                        {image.description && (
                                            <p className="text-sm text-white/80 line-clamp-2">
                                                {image.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                            className="min-w-[200px]"
                        >
                            View Full Gallery
                        </Button>
                    </div>
                </div>
            </section>

            <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
