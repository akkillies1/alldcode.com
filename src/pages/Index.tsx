import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Phone, MapPin, Layers, Ruler, PenTool } from "lucide-react";
import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "✓ Message Sent Successfully",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        className: "bg-success text-success-foreground",
      });
      
      setFormData({ name: "", email: "", phone: "", location: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "✗ Failed to Send Message",
        description: error?.message || "Something went wrong. Please try calling us directly.",
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-[var(--shadow-soft)]">
        <div className="container-custom py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Allthing Decode Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm md:text-base font-light text-muted-foreground tracking-wide">Allthing</span>
              <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight">Decode</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#philosophy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Philosophy</a>
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <Button variant="hero" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact
            </Button>
          </div>
          
          <MobileMenu />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/96 via-background/90 to-background/96" />
        </div>
        
        <div className="relative z-10 container-custom section-padding text-center animate-fade-in">
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <h1 className="text-4xl md:text-5xl font-light text-muted-foreground tracking-wide">
              Allthing
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-semibold tracking-tight">
              Decode
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed text-balance">
            Elevating spaces beyond the ordinary — where luxury meets purposeful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="hero" size="lg" className="min-w-[220px] h-14" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="min-w-[220px] h-14" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
            </Button>
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
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              From concept to completion, we handle every aspect of your interior journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <h3 className="text-2xl font-medium mb-4">Full Interiors</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Complete interior solutions from concept development through manufacturing to final installation.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Space planning & layout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Material selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Custom manufacturing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Professional installation</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <h3 className="text-2xl font-medium mb-4">Bespoke Furniture</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Custom-designed furniture pieces and modular solutions tailored to your space and lifestyle.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Custom furniture design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Modular wardrobes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Kitchen cabinetry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Storage solutions</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <h3 className="text-2xl font-medium mb-4">Design Consulting</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Expert guidance on layout optimization, material choices, and design planning for your project.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Layout consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Material advisory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Design planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Project roadmap</span>
                </li>
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
              Spaces designed with discipline, crafted with care
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-xl aspect-square group animate-fade-in">
              <img 
                src={portfolio1} 
                alt="Minimalist bedroom interior with natural wood" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-warm-white font-light">Contemporary Bedroom</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl aspect-square group animate-fade-in">
              <img 
                src={portfolio2} 
                alt="Modern minimalist kitchen design" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-warm-white font-light">Zen Kitchen</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl aspect-square group animate-fade-in">
              <img 
                src={portfolio3} 
                alt="Minimalist dining room with Japanese aesthetic" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-warm-white font-light">Dining Space</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl aspect-square group animate-fade-in">
              <img 
                src={portfolio4} 
                alt="Elegant minimalist home office" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-warm-white font-light">Work Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-card">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight">Tell Us About Your Project</h2>
            <p className="text-xl text-muted-foreground font-light">
              Start your DECODE journey with us
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
                    className="h-14 text-base"
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
                    className="h-14 text-base"
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
                    className="h-14 text-base"
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
                    className="h-14 text-base"
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
                  className="resize-none text-base"
                  placeholder="Tell us about your project, budget, timeline, and any specific requirements..."
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full h-16 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Tell us about your project"}
                {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
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
                  <span>theintercontinentalrealtor@gmail.com</span>
                </a>
                <a href="tel:+919633860898" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>+91 96338 60898</span>
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
