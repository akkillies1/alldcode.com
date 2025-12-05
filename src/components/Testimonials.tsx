import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
    id: string;
    client_name: string;
    client_photo_url: string | null;
    rating: number;
    review_text: string;
    project_type: string | null;
    location: string | null;
}

export const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_published', true)
                .order('display_order', { ascending: true })
                .limit(6);

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    if (loading) {
        return (
            <section className="py-[60px] md:py-[80px] bg-card">
                <div className="container-custom">
                    <div className="text-center">
                        <p className="text-muted-foreground">Loading testimonials...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null; // Don't show section if no testimonials
    }

    return (
        <section id="testimonials" className="py-[60px] md:py-[80px] bg-card">
            <div className="container-custom">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">
                        Client Testimonials
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        What our clients say about working with us
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={testimonial.id}
                            className="p-8 bg-background shadow-[var(--shadow-soft)] premium-card-hover animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {testimonial.client_photo_url ? (
                                    <img
                                        src={testimonial.client_photo_url}
                                        alt={testimonial.client_name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                        <span className="text-xl font-medium text-accent">
                                            {testimonial.client_name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-medium text-lg">{testimonial.client_name}</h3>
                                    {testimonial.project_type && (
                                        <p className="text-sm text-muted-foreground">
                                            {testimonial.project_type}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>

                            <p className="text-muted-foreground leading-relaxed mb-4">
                                "{testimonial.review_text}"
                            </p>

                            {testimonial.location && (
                                <p className="text-sm text-muted-foreground italic">
                                    {testimonial.location}
                                </p>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
