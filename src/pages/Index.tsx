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
import { GlitchLogo } from "@/components/GlitchLogo";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import heroImage from "@/assets/hero-interior.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

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
    const sections = ['hero', 'about', 'philosophy', 'process', 'services', 'portfolio', 'testimonials', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-80px 0px -40% 0px' }
    );

    // Small delay to ensure all sections are rendered (especially dynamic ones like gallery)
    const observeSections = () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    };

    // Initial observation
    observeSections();

    // Re-observe after a short delay to catch dynamic content
    const timeout = setTimeout(observeSections, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
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
      // STEP 1: Save to database first (MOST IMPORTANT - prevents lead loss)
      // STEP 1: Save to database first (MOST IMPORTANT - prevents lead loss)
      // We use an RPC function to bypass RLS policies safely
      const { data: lead, error: dbError } = await supabase
        .rpc('submit_lead', {
          p_name: formData.name,
          p_email: formData.email,
          p_phone: formData.phone,
          p_location: formData.location,
          p_message: formData.message,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save your enquiry. Please try again.");
      }

      // STEP 2: Send email notification (SECONDARY - optional)
      // If email fails, lead is still saved in database
      try {
        await supabase.functions.invoke('send-brevo-email', {
          body: { ...formData, leadId: lead.id },
        });
      } catch (emailError) {
        // Email failed but lead is saved - log but don't show error to user
        console.error("Email notification failed (lead saved):", emailError);
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHeaderScrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50 py-3' : 'bg-gradient-to-b from-black/60 to-transparent border-b border-transparent py-5'}`}>
        <div className="container-custom flex items-center justify-between">
          <GlitchLogo isScrolled={isHeaderScrolled} />

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Philosophy', 'Process', 'Services', 'Work', 'Testimonials'].map((item) => {
              const id = item.toLowerCase() === 'home' ? 'hero' : (item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase());
              const isActive = activeSection === id;
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive
                    ? (isHeaderScrolled ? 'text-foreground after:w-full' : 'text-white after:w-full')
                    : (isHeaderScrolled ? 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full' : 'text-white/80 hover:text-white after:w-0 hover:after:w-full')
                    }`}
                >
                  {item}
                </a>
              );
            })}
            <a
              href="/blog"
              className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isHeaderScrolled ? 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full' : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'}`}
            >
              Blog
            </a>
            <Button
              variant="default"
              size="sm"
              className="bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact
            </Button>
          </div>

          <MobileMenu isScrolled={isHeaderScrolled} />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 container-custom section-padding text-center">
          <div className="flex items-baseline justify-center gap-3 mb-6 animate-fade-in">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-semibold tracking-tight text-white">
              The <span className="text-red-600">AllDcode</span>
            </h1>
          </div>
          <p className="text-3xl md:text-4xl font-medium mb-4 leading-tight text-balance animate-fade-in text-white/90" style={{ animationDelay: '0.2s' }}>
            Decode Ordinary. Elevate Everything.
          </p>
          <p className="text-xl md:text-2xl text-white/80 mb-16 leading-relaxed text-balance animate-fade-in" style={{ animationDelay: '0.4s' }}>
            We Decode. You Live Beautifully.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="default"
              size="lg"
              className="min-w-[220px] h-14 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white text-black hover:bg-white/90 border-none"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[220px] h-14 hover:scale-105 transition-all duration-300 text-white border-white/30 hover:bg-white/10 hover:text-white bg-transparent"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </Button>
          </div>

          {/* Scroll Cue */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </section >

      {/* About Section */}
      < section id="about" className="py-[60px] md:py-[80px] bg-card" >
        <div className="container-custom max-w-6xl">
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-8 tracking-tight">Our Story</h2>
            <p className="text-xl font-medium mb-8 leading-relaxed">
              <span className="text-red-600 font-semibold">The AllDcode</span> was born from a simple belief — that every space has the potential to rise above the ordinary.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
              We design not just interiors, but transformations — environments that elevate the way people live, move, and feel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
              Inspired by the quiet discipline of craftsmanship and the timeless elegance of luxury design, <span className="text-red-600 font-semibold">The AllDcode</span> blends precision, purity of form, and intentional simplicity. Every line, material, and texture is chosen with purpose. Every project is a journey upward — toward refinement, clarity, and harmony.
            </p>
            <p className="text-xl font-medium mb-8 leading-relaxed">
              From bespoke interiors to signature spatial experiences, <span className="text-red-600 font-semibold">The AllDcode</span> creates environments that feel sculpted, luminous, and effortlessly sophisticated.
            </p>
            <p className="text-xl text-muted-foreground italic leading-relaxed font-light">
              We don't just design spaces.<br />
              We elevate them.<br />
              We ascend.
            </p>
          </div>
        </div>
      </section >

      {/* Philosophy Section */}
      < section id="philosophy" className="py-[60px] md:py-[80px]" >
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Philosophy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic font-light">
              Our philosophy is rooted in growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] animate-fade-in premium-card-hover">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Layers className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Inspire Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spaces should inspire progress — environments that elevate the way you live and feel.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] animate-fade-in premium-card-hover">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Move Upward</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design should move upward, not outward — reaching for refinement and clarity.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] animate-fade-in premium-card-hover">
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
      </section >

      {/* Process Flow Section */}
      < section id="process" className="py-[60px] md:py-[80px] bg-card" >
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">DECODE Workflow</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Our systematic approach to transforming your vision into reality
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Step 1: D → Discovery */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
                <p className="text-muted-foreground leading-relaxed">
                  We dive deep into your vision — understanding your needs, goals, and site potential, capturing every detail from lifestyle to logistics, and creating a clear project brief that sets the foundation.
                </p>
              </Card>
            </div>

            {/* Step 2: E → Engagement */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
                <p className="text-muted-foreground leading-relaxed">
                  We bring ideas to life through discussion, aligning expectations, defining scope, timelines, and budget, and formalizing commitment with a signed agreement.
                </p>
              </Card>
            </div>

            {/* Step 3: C → Craft */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
                <p className="text-muted-foreground leading-relaxed">
                  We create thoughtful, tailored designs — layouts, materials, color schemes, and project plans — refined with your feedback to form a complete, client-approved design.
                </p>
              </Card>
            </div>

            {/* Step 4: O → Optimize */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
                <p className="text-muted-foreground leading-relaxed">
                  We fine-tune the design with you and end-users, adjusting for functionality, aesthetics, and efficiency to ensure the design is perfected before production.
                </p>
              </Card>
            </div>

            {/* Step 5: D → Delivery */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
                <p className="text-muted-foreground leading-relaxed">
                  From factory to site, we manage production, quality checks, and logistics, ensuring every material, furniture, and fixture arrives ready for seamless installation.
                </p>
              </Card>
            </div>

            {/* Step 6: E → Execution */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 items-center animate-fade-in">
              <div className="md:text-right pl-4 md:pl-0">
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

              <Card className="p-6 bg-background shadow-[var(--shadow-soft)] premium-card-hover">
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
            <Button variant="default" size="lg" className="bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section >

      {/* Decor Duty Section */}
      < section className="py-[60px] md:py-[80px] bg-background relative overflow-hidden" >
        <div className="container-custom">
          <div className="text-center animate-fade-in mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">Decor Duty</h2>
            <p className="text-xl text-muted-foreground font-light">Post-Installation Luxury, Refined</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Philosophy Card */}
            <Card className="p-8 bg-card shadow-[var(--shadow-soft)] border-none relative z-10 h-full flex flex-col premium-card-hover">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-light text-accent">1</span>
                </div>
                <h3 className="text-2xl font-medium mb-2">The Philosophy</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed flex-grow">
                <p>
                  In a world full of excess, true luxury chooses restraint. It rises not through abundance, but through intention.
                </p>
                <p>
                  At AllDcode, every space is shaped with this philosophy:
                  <span className="block text-foreground font-medium mt-2">Don’t excess, elevate.</span>
                </p>
              </div>
            </Card>

            {/* The Evolution Card */}
            <Card className="p-8 bg-card shadow-[var(--shadow-soft)] border-none relative z-10 h-full flex flex-col premium-card-hover">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-light text-accent">2</span>
                </div>
                <h3 className="text-2xl font-medium mb-2">The Evolution</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed flex-grow">
                <p>
                  When your interior reaches completion, the experience doesn’t conclude; it evolves.
                </p>
                <p>
                  Luxury is not the final reveal—it is the refinement that continues afterwards.
                </p>
                <p className="text-foreground font-serif italic text-lg pt-2">
                  And that is where Decor Duty begins.
                </p>
              </div>
            </Card>

            {/* The Service Card */}
            <Card className="p-8 bg-card shadow-[var(--shadow-soft)] border-none relative z-10 h-full flex flex-col premium-card-hover">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-light text-accent">3</span>
                </div>
                <h3 className="text-2xl font-medium mb-2">The Service</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed flex-grow">
                <p>
                  Our signature after-care service, crafted to preserve elegance. From alignment checks to material care.
                </p>
                <ul className="space-y-2 text-sm pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Every detail remains precise
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Every finish remains elevated
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Intentional composition
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-xl font-medium text-accent italic">
              DECODE doesn’t end at delivery — you remain DECODED through Decor Duty.
            </p>
          </div>
        </div>
      </section >

      {/* Services Section */}
      < section id="services" className="py-[60px] md:py-[80px] bg-card" >
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Complete design solutions from concept to completion
            </p>
            <p className="text-lg text-accent font-medium mt-4 italic">
              Elevate, Don't Excess.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] group animate-fade-in premium-card-hover">
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

            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] group animate-fade-in premium-card-hover">
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

            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] group animate-fade-in premium-card-hover">
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
      </section >

      {/* Gallery Section - Replaces Portfolio */}
      < Gallery />

      {/* Testimonials Section */}
      < Testimonials />

      {/* Contact Section */}
      < section id="contact" className="py-[60px] md:py-[80px] bg-card" >
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
                variant="default"
                size="lg"
                className="w-full h-16 text-lg font-semibold bg-black text-white hover:bg-black/90 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
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
      </section >

      {/* Footer */}
      < footer className="section-padding border-t border-border/50 bg-muted/20" >
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-serif font-semibold">The <span className="text-red-600">AllDcode</span></span>
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
                <span>AllDcode Pvt Ltd<br />Kakkanadu, Kerala</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center text-muted-foreground font-light">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; {new Date().getFullYear()} The AllDcode. All rights reserved.</p>
              <a
                href="/admin/login"
                className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-all duration-300 md:self-end self-start"
                aria-label="Admin Login"
              >
                admin
              </a>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default Index;
