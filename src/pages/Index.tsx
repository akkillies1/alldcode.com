import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Phone, MapPin, Layers, Ruler, PenTool, ChevronDown, Lightbulb, Hammer, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MobileMenu } from "@/components/MobileMenu";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import heroImage from "@/assets/hero-interior.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Track scroll position for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'philosophy', 'services', 'portfolio', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.message) {
      toast({
        title: "✗ Missing Fields",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "✗ Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-brevo-email', {
        body: formData,
      });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "✓ Message Sent Successfully",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        className: "bg-green-50 border-green-200 text-green-900",
      });
      
      setFormData({ name: "", email: "", phone: "", location: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "✗ Failed to Send Message",
        description: error?.message || "Something went wrong. Please try calling us directly at +91 9633860898.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Action Buttons */}
      <FloatingActionButtons />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg transition-all duration-300 ${isHeaderScrolled ? 'shadow-lg border-b border-border/50' : 'border-b border-border/20'}`}>
        <div className="container-custom py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Allthing Decode Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm md:text-base font-light text-muted-foreground tracking-wide">Allthing</span>
              <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight">Decode</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#about" 
              className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${activeSection === 'about' ? 'text-foreground after:w-full' : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full'}`}
            >
              About
            </a>
            <a 
              href="#philosophy" 
              className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${activeSection === 'philosophy' ? 'text-foreground after:w-full' : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full'}`}
            >
              Philosophy
            </a>
            <a 
              href="#services" 
              className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${activeSection === 'services' ? 'text-foreground after:w-full' : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full'}`}
            >
              Services
            </a>
            <a 
              href="#portfolio" 
              className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${activeSection === 'portfolio' ? 'text-foreground after:w-full' : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full'}`}
            >
              Work
            </a>
            <Button 
              variant="hero" 
              size="sm" 
              className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact
            </Button>
          </div>
          
          <MobileMenu />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/96 via-background/90 to-background/96" />
        </div>
        
        <div className="relative z-10 container-custom section-padding text-center">
          <div className="flex items-baseline justify-center gap-3 mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-light text-muted-foreground tracking-wide">
              Allthing
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-semibold tracking-tight">
              Decode
            </h1>
          </div>
          <p className="text-3xl md:text-4xl font-medium mb-4 leading-tight text-balance animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Decode Allthing. Elevate Everything.
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed text-balance animate-fade-in" style={{ animationDelay: '0.4s' }}>
            We Decode. You Live Beautifully.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[220px] h-14 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="hero-outline" 
              size="lg" 
              className="min-w-[220px] h-14 hover:scale-105 transition-all duration-300" 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </Button>
          </div>
          
          {/* Scroll Cue */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-card">
        <div className="container-custom max-w-4xl">
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-8 tracking-tight">Our Story</h2>
            <p className="text-xl font-medium mb-8 leading-relaxed">
              Allthing Decode was born from a simple belief — that every space has the potential to rise above the ordinary.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
              We design not just interiors, but transformations — environments that elevate the way people live, move, and feel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
              Inspired by the quiet discipline of craftsmanship and the timeless elegance of luxury design, Allthing Decode blends precision, purity of form, and intentional simplicity. Every line, material, and texture is chosen with purpose. Every project is a journey upward — toward refinement, clarity, and harmony.
            </p>
            <p className="text-xl font-medium mb-8 leading-relaxed">
              From bespoke interiors to signature spatial experiences, Allthing Decode creates environments that feel sculpted, luminous, and effortlessly sophisticated.
            </p>
            <p className="text-xl text-muted-foreground italic leading-relaxed font-light">
              We don't just design spaces.<br />
              We elevate them.<br />
              We ascend.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Philosophy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic font-light">
              Our philosophy is rooted in growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Layers className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Inspire Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spaces should inspire progress — environments that elevate the way you live and feel.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Move Upward</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design should move upward, not outward — reaching for refinement and clarity.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Ruler className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Elevate, Not Excess</h3>
              <p className="text-muted-foreground leading-relaxed">
                Luxury is not about excess, but elevation — sculpted, luminous, effortlessly sophisticated.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">DECODE Workflow</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Our systematic approach to transforming your vision into reality
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Step 1: D → Discovery */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">D</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Discovery</h3>
                  <p className="text-muted-foreground text-sm">Understand client needs</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-32 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We dive deep into your vision — understanding your needs, goals, and site potential, capturing every detail from lifestyle to logistics, and creating a clear project brief that sets the foundation.
                </p>
              </Card>
            </div>

            {/* Step 2: E → Engagement */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">E</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Engagement</h3>
                  <p className="text-muted-foreground text-sm">Build alignment</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-32 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We bring ideas to life through discussion, aligning expectations, defining scope, timelines, and budget, and formalizing commitment with a signed agreement.
                </p>
              </Card>
            </div>

            {/* Step 3: C → Craft */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">C</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Craft</h3>
                  <p className="text-muted-foreground text-sm">Design & conceptualization</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-32 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We create thoughtful, tailored designs — layouts, materials, color schemes, and project plans — refined with your feedback to form a complete, client-approved design.
                </p>
              </Card>
            </div>

            {/* Step 4: O → Optimize */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">O</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Optimize</h3>
                  <p className="text-muted-foreground text-sm">Finalize & perfect</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-32 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We fine-tune the design with you and end-users, adjusting for functionality, aesthetics, and efficiency to ensure the design is perfected before production.
                </p>
              </Card>
            </div>

            {/* Step 5: D → Delivery */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">D</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Delivery</h3>
                  <p className="text-muted-foreground text-sm">Production & logistics</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-32 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  From factory to site, we manage production, quality checks, and logistics, ensuring every material, furniture, and fixture arrives ready for seamless installation.
                </p>
              </Card>
            </div>

            {/* Step 6: E → Execution */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-3xl font-light text-accent">E</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Execution</h3>
                  <p className="text-muted-foreground text-sm">Installation & handover</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We bring the project to life on-site — installing, adjusting, and perfecting every detail, with thorough walkthroughs to deliver a fully functional space ready for use.
                </p>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in-slow">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to begin your DECODE journey?
            </p>
            <Button variant="hero" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Complete design solutions from concept to completion
            </p>
            <p className="text-lg text-accent font-medium mt-4 italic">
              Elevate, Don't Excess.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 group animate-fade-in">
              <div className="w-16 h-16 mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Full Interiors</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From concept to installation — we design, manufacture, and deliver turnkey interior solutions.
              </p>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Space planning & layout design</li>
                <li>• Custom furniture & cabinetry</li>
                <li>• Material selection & procurement</li>
                <li>• On-site installation & finishing</li>
              </ul>
            </Card>
            
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 group animate-fade-in">
              <div className="w-16 h-16 mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Bespoke Furniture</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Modular and custom-built furniture tailored to your space and style.
              </p>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Custom wardrobes & storage</li>
                <li>• Modular kitchen systems</li>
                <li>• Bespoke seating & tables</li>
                <li>• Premium finishes & detailing</li>
              </ul>
            </Card>
            
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 group animate-fade-in">
              <div className="w-16 h-16 mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Hammer className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Consulting</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Expert guidance on layouts, materials, planning, and execution strategy.
              </p>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Space optimization consulting</li>
                <li>• Material & finish selection</li>
                <li>• Project planning & budgeting</li>
                <li>• Contractor coordination support</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Our Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              A curated selection of our transformative designs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative h-[400px] overflow-hidden rounded-lg shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <img 
                src={portfolio1} 
                alt="Interior design project 1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-medium text-foreground mb-2">Residential Project</h3>
                  <p className="text-muted-foreground">Modern minimalist design</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-lg shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <img 
                src={portfolio2} 
                alt="Interior design project 2" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-medium text-foreground mb-2">Commercial Space</h3>
                  <p className="text-muted-foreground">Elegant office interiors</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-lg shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <img 
                src={portfolio3} 
                alt="Interior design project 3" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-medium text-foreground mb-2">Luxury Villa</h3>
                  <p className="text-muted-foreground">Contemporary elegance</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-lg shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <img 
                src={portfolio4} 
                alt="Interior design project 4" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-medium text-foreground mb-2">Boutique Hotel</h3>
                  <p className="text-muted-foreground">Refined hospitality design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-card">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Get in Touch</h2>
            <p className="text-xl text-muted-foreground font-light">
              Tell us about your project
            </p>
            <p className="text-lg text-accent font-medium mt-4 italic">
              Let's elevate your space together.
            </p>
          </div>

          <Card className="p-10 md:p-16 shadow-[var(--shadow-elevated)] animate-fade-in border-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 tracking-wide uppercase text-xs">Name *</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-14 text-base bg-card transition-all focus:ring-2 focus:ring-accent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 tracking-wide uppercase text-xs">Email *</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-14 text-base bg-card transition-all focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-3 tracking-wide uppercase text-xs">Phone *</label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-14 text-base bg-card transition-all focus:ring-2 focus:ring-accent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold mb-3 tracking-wide uppercase text-xs">Location *</label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="h-14 text-base bg-card transition-all focus:ring-2 focus:ring-accent"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-3 tracking-wide uppercase text-xs">Message *</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="resize-none text-base bg-card transition-all focus:ring-2 focus:ring-accent"
                  placeholder="Tell us about your project, budget, timeline, and any specific requirements..."
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full h-16 text-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Tell us about your project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding border-t border-border/50 bg-muted/20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-base font-light text-muted-foreground">Allthing</span>
                <span className="text-3xl font-serif font-semibold">Decode</span>
              </div>
              <p className="text-muted-foreground leading-relaxed font-light">
                Elevating spaces beyond the ordinary
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 tracking-wide uppercase text-xs">Contact</h4>
              <div className="space-y-4">
                <a href="mailto:shinu.thej1039@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>shinu.thej1039@gmail.com</span>
                </a>
                <a href="tel:+919633860898" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>+91 9633860898</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 tracking-wide uppercase text-xs">Location</h4>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Kerala, India</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 text-center text-muted-foreground font-light">
            <p>&copy; {new Date().getFullYear()} Allthing Decode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
