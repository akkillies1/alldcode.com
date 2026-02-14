import { X, Calendar, Hash, Info, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";
import { Button } from "./ui/button";

type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];

interface ImageLightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export const ImageLightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) => {
    const image = images[currentIndex];

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex, onClose]);

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        onNavigate(newIndex);
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const newIndex = (currentIndex + 1) % images.length;
        onNavigate(newIndex);
    };

    if (!isOpen || !image) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows - Desktop Only Side Buttons */}
            <div className="hidden md:flex absolute inset-y-0 left-0 w-24 items-center justify-center z-[105]">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 pointer-events-auto"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-0 w-24 items-center justify-center z-[105]">
                <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 pointer-events-auto"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            <div
                className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row p-4 md:p-12 gap-6 md:gap-12 pointer-events-none"
            >
                {/* 1. Image Area */}
                <div className="flex-1 flex items-center justify-center min-h-0 pointer-events-auto relative group">
                    <img
                        key={image.id}
                        src={image.image_url || '/placeholder.svg'}
                        alt={image.alt_text || image.title}
                        className="max-w-full max-h-[60vh] md:max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Mobile Navigation Overlays */}
                    <div className="md:hidden absolute inset-y-0 left-0 w-1/3" onClick={handlePrev} />
                    <div className="md:hidden absolute inset-y-0 right-0 w-1/3" onClick={handleNext} />
                </div>

                {/* 2. Metadata Sidebar (RHS) */}
                <div
                    className="w-full md:w-[380px] lg:w-[440px] shrink-0 bg-zinc-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-8 text-left pointer-events-auto overflow-y-auto max-h-[35vh] md:max-h-[calc(100vh-6rem)] shadow-2xl animate-in slide-in-from-right-8 duration-500"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">
                                {image.media_type || 'Image'}
                            </span>
                            <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest font-medium">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(image.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white font-medium leading-tight tracking-tight">
                            {image.title}
                        </h2>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />

                    {/* Description */}
                    {image.description && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest">
                                <Info className="w-3.5 h-3.5" />
                                <span>Project Narrative</span>
                            </div>
                            <p className="text-white/70 text-base leading-relaxed font-light font-serif italic">
                                "{image.description}"
                            </p>
                        </div>
                    )}

                    {/* Tags */}
                    {image.tags && image.tags.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest">
                                <Hash className="w-3.5 h-3.5" />
                                <span>Design Tokens</span>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {image.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-default"
                                    >
                                        #{tag.toLowerCase()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Image Info / Counter */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
                            Frame <span className="text-white/60">{currentIndex + 1}</span> of <span className="text-white/60">{images.length}</span>
                        </div>

                        {image.social_media_url && (
                            <a
                                href={image.social_media_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-accent text-xs hover:underline underline-offset-4 transition-all"
                            >
                                Source Archive <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>

                    {/* Responsive Navigation Buttons (Mobile) */}
                    <div className="flex md:hidden gap-3 mt-4">
                        <Button
                            variant="outline"
                            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
                            onClick={handleNext}
                        >
                            Next <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
