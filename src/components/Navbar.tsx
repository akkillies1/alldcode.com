
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
    activeSection?: string;
}

export const Navbar = ({ activeSection = "" }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (id: string) => {
        if (isHomePage) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/#${id}`);
        }
    };

    const navItems = ['Home', 'About', 'Philosophy', 'Process', 'Services', 'Work'];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50 py-3' : 'bg-gradient-to-b from-black/60 to-transparent border-b border-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4 cursor-pointer group" onClick={() => isHomePage ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}>
                    <Logo className="w-32 md:w-48 h-auto transition-all duration-500 group-hover:scale-[1.02]" />
                    <div className={`hidden md:block h-8 w-[1px] transition-all duration-500 ${isScrolled ? 'bg-white/10' : 'bg-white/30'}`} />
                    <div className="flex flex-col">
                        <span className={`text-[8px] md:text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-500 text-accent`}>
                            Premier Turnkey
                        </span>
                        <span className={`hidden md:block text-[9px] font-bold tracking-[0.1em] uppercase transition-all duration-500 text-accent`}>
                            Interior Design
                        </span>
                        <span className={`md:hidden text-[7px] font-bold tracking-[0.1em] uppercase transition-all duration-500 text-accent`}>
                            Design Studio
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const id = item.toLowerCase() === 'home' ? 'home' : (item.toLowerCase() === 'work' ? 'work' : item.toLowerCase());
                        const isActive = activeSection === id;
                        // On non-home pages, links are always "foreground" color if scrolled, otherwise accent/white based on design
                        // But since we are reusing this class string, let's simplify.
                        const linkColor = isScrolled ? 'text-foreground' : 'text-accent';

                        return (
                            <a
                                key={item}
                                href={`/#${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(id);
                                }}
                                className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive
                                    ? `${linkColor} after:w-full`
                                    : `${linkColor}/70 hover:${linkColor} after:w-0 hover:after:w-full`
                                    }`}
                            >
                                {item}
                            </a>
                        );
                    })}
                    <a
                        href="/mood-board"
                        className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isScrolled ? 'text-foreground' : 'text-accent'}/70 hover:${isScrolled ? 'text-foreground' : 'text-accent'} after:w-0 hover:after:w-full`}
                    >
                        Mood Board
                    </a>
                    <a
                        href="/blog"
                        className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isScrolled ? 'text-foreground' : 'text-accent'}/70 hover:${isScrolled ? 'text-foreground' : 'text-accent'} after:w-0 hover:after:w-full`}
                    >
                        Blog
                    </a>
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        onClick={() => handleNavigation('contact')}
                    >
                        Contact
                    </Button>
                    <ThemeToggle />
                </div>

                <MobileMenu isScrolled={isScrolled} />
            </div>
        </nav>
    );
};
