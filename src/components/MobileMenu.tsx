import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-border">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col p-6 gap-4">
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-lg py-3 px-4 hover:bg-accent rounded-md transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('philosophy')}
            className="text-left text-lg py-3 px-4 hover:bg-accent rounded-md transition-colors"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-left text-lg py-3 px-4 hover:bg-accent rounded-md transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-left text-lg py-3 px-4 hover:bg-accent rounded-md transition-colors"
          >
            Work
          </button>
          <Button
            variant="hero"
            size="lg"
            className="mt-4"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </Button>
        </nav>
      </div>
    </>
  );
};
