import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface MobileMenuProps {
  isScrolled: boolean;
}

export const MobileMenu = ({ isScrolled }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-foreground hover:text-primary' : 'text-foreground hover:text-primary bg-background/10 backdrop-blur-sm rounded-md'}`}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] !bg-white dark:!bg-black border-l border-border z-[100] p-0">
        <span className="sr-only">
          <SheetTitle>Mobile Navigation Menu</SheetTitle>
          <SheetDescription>Navigation links for mobile devices</SheetDescription>
        </span>
        <div className="flex flex-col h-full bg-white dark:bg-black p-6">
          <div className="mb-8 px-2">
            <h2 className="text-2xl font-serif font-medium tracking-tight">The <span className="text-red-600">AllDcode</span></h2>
            <p className="text-sm text-muted-foreground font-light">Elevate Everything</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            <button
              onClick={() => handleNavigation('hero')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('philosophy')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Philosophy
            </button>
            <button
              onClick={() => handleNavigation('services')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation('process')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Process
            </button>
            <button
              onClick={() => handleNavigation('portfolio')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Work
            </button>
            <button
              onClick={() => handleNavigation('testimonials')}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Testimonials
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/blog');
              }}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent/50 text-foreground"
            >
              Blog
            </button>
          </nav>

          <div className="mt-auto px-2 pt-6 border-t border-border/50">
            <Button
              variant="hero"
              className="w-full justify-center"
              onClick={() => handleNavigation('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
