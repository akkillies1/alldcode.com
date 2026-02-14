import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CostGuide = () => {
    const tableData = [
        { type: "1 BHK Apartment", basic: "₹3.5L - ₹5L", premium: "₹6L - ₹8L", ultra: "₹10L+" },
        { type: "2 BHK Apartment", basic: "₹5L - ₹7.5L", premium: "₹9L - ₹12L", ultra: "₹15L+" },
        { type: "3 BHK Apartment", basic: "₹7L - ₹10L", premium: "₹12L - ₹18L", ultra: "₹25L+" },
        { type: "Luxury Villa", basic: "₹15L - ₹20L", premium: "₹30L - ₹50L", ultra: "₹75L+" },
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Complete Cost Guide for Interior Design in Kerala (2026)",
        "description": "An exhaustive guide to understanding interior design costs, turnkey project timelines, and material quality for homes and apartments in Kerala.",
        "author": {
            "@type": "Organization",
            "name": "DPL Homestar"
        },
        "publisher": {
            "@type": "Organization",
            "name": "DPL Homestar",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.dplhomestar.com/dcode-logo.jpg"
            }
        },
        "datePublished": "2026-02-15",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.dplhomestar.com/guides/interior-design-cost-kerala"
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Interior Design Cost in Kerala 2026 | Comprehensive Guide"
                description="Planning your interiors? Discover the latest 2026 cost guide for apartments and villas in Kochi, Trivandrum, and across Kerala. Budget-friendly luxury revealed."
                schema={schema}
            />
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                <Breadcrumbs />

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                        The 2026 Comprehensive <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Cost Guide</span> for Interior Design in Kerala
                    </h1>

                    <p className="lead text-xl text-muted-foreground">
                        Navigating the costs of home interiors in Kerala can be overwhelming. Whether you own a 2BHK flat in Kochi or a luxury villa in Kottayam, understanding where your money goes is crucial for a successful project.
                    </p>

                    <section className="my-12 not-prose">
                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                { icon: <DollarSign className="w-6 h-6" />, label: "Transparent Pricing", desc: "No hidden costs" },
                                { icon: <Clock className="w-6 h-6" />, label: "45-Day Delivery", desc: "Fast & Reliable" },
                                { icon: <CheckCircle2 className="w-6 h-6" />, label: "Premium Materials", desc: "ISO Certified" }
                            ].map((item, idx) => (
                                <Card key={idx} className="p-6 border-accent/20 bg-accent/5">
                                    <div className="text-accent mb-3">{item.icon}</div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider mb-1">{item.label}</h3>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <h2>Interior Design Estimations by Home Type</h2>
                    <p>
                        In 2026, the interior landscape in Kerala has shifted towards <strong>intelligent turnkey solutions</strong>. Here is a breakdown of estimated costs based on prevailing market rates and DPL Homestar standards.
                    </p>

                    <div className="overflow-x-auto my-8 not-prose">
                        <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-accent text-accent-foreground">
                                    <th className="p-4 border-b border-accent/20">Type</th>
                                    <th className="p-4 border-b border-accent/20">Basic (Essentials)</th>
                                    <th className="p-4 border-b border-accent/20">Premium (Designer)</th>
                                    <th className="p-4 border-b border-accent/20">Ultra Luxury</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, i) => (
                                    <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-bold">{row.type}</td>
                                        <td className="p-4">{row.basic}</td>
                                        <td className="p-4 font-medium text-accent">{row.premium}</td>
                                        <td className="p-4">{row.ultra}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 id="factors">Factors Influencing Interior Cost in Kerala</h2>
                    <ul>
                        <li><strong>Material Selection:</strong> Marine-grade plywood (BWP) vs. Commercial-grade (BWR). At DPL Homestar, we primarily use high-resistance BWP for Kochi and coastal regions.</li>
                        <li><strong>Finishes:</strong> High-gloss laminates, acrylics, or PU-coatings significantly alter the aesthetic and price point.</li>
                        <li><strong>Production:</strong> Modular production in a factory setting is often 20% more cost-effective than on-site local carpentery.</li>
                    </ul>

                    <section className="bg-card border border-border rounded-3xl p-8 md:p-12 my-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <MapPin className="w-24 h-24 text-accent/10 -rotate-12" />
                        </div>
                        <h2 className="mt-0 tracking-tight">Looking for a tailored quote?</h2>
                        <p className="text-muted-foreground mb-8">
                            Our designers in Kochi can provide a detailed room-by-room breakdown within 24 hours. No obligations.
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold">
                            <Link to="/#contact">Click to Get Your Estimate</Link>
                        </Button>
                    </section>

                    <h2>Why DPL Homestar is the Preferred Choice</h2>
                    <p>
                        We have successfully executed 200+ projects across the South Indian corridor. From <strong>Apartment interiors in Kochi</strong> to <strong>Villa projects in Bangalore</strong>, our turnkey model removes the stress of dealing with multiple subcontractors.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default CostGuide;
