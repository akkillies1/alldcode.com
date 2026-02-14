import { MapPin, Instagram, Mail, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

export const Footer = () => {
    return (
        <footer className="bg-muted text-foreground pt-20 pb-8 border-t border-border mt-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Logo className="w-48 h-auto mb-6 opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer" />
                        <p className="text-sm text-foreground/60 leading-relaxed italic mb-6">
                            The luxury home interior brand by DCODE Private Limited. Transforming spaces into refined living experiences.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-1">
                        <h4 className="text-xs font-bold mb-6 tracking-widest uppercase text-foreground/40">Contact</h4>
                        <div className="flex flex-col gap-4">
                            <a href="mailto:info@dplhomestar.com" className="group flex items-center gap-3 text-sm text-foreground/60 hover:text-accent transition-colors">
                                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                info@dplhomestar.com
                            </a>
                            <a href="tel:+919633860898" className="group flex items-center gap-3 text-sm text-foreground/60 hover:text-accent transition-colors">
                                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                +91 96338 60898
                            </a>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="lg:col-span-1">
                        <h4 className="text-xs font-bold mb-6 tracking-widest uppercase text-foreground/40">Instagram</h4>
                        <a
                            href="https://instagram.com/dplhomestar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-sm text-foreground/60 hover:text-accent transition-colors"
                        >
                            <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </div>
                            @dplhomestar
                        </a>
                    </div>

                    {/* Location Section */}
                    <div className="lg:col-span-1">
                        <h4 className="text-xs font-bold mb-6 tracking-widest uppercase text-foreground/40">Location</h4>
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-accent/5 shrink-0">
                                <MapPin className="w-4 h-4 text-accent" />
                            </div>
                            <div className="text-sm text-foreground/60 leading-relaxed">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src="/dcode-logo.jpg" alt="DCODE Logo" className="w-8 h-8 rounded shadow-sm" />
                                    <strong className="text-foreground text-xs uppercase tracking-wider">DCODE PRIVATE LTD</strong>
                                </div>
                                24/1701, Door No 14/22AB4, Suite No 883,<br />
                                2nd floor, KC Arcade, Near TV center,<br />
                                Cochin Special Economin Zone,<br />
                                Ernakulam, Kerala 682037
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <img src="/dcode-logo.jpg" alt="DCODE Logo" className="w-6 h-6 rounded-sm grayscale opacity-50" />
                            <p className="text-[11px] md:text-xs text-foreground/40 font-medium tracking-wide">
                                &copy; {new Date().getFullYear()} DPL Homestar — A brand of DCODE Private Limited. All rights reserved.
                                <Link to="/privacy-policy" className="ml-4 hover:text-accent underline underline-offset-4">Privacy Policy</Link>
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <a
                                href="/admin/login"
                                className="text-[10px] text-foreground/20 hover:text-accent transition-all duration-300 uppercase tracking-[0.2em] font-black"
                                aria-label="Admin Access"
                            >
                                *
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
