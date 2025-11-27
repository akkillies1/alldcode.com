import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Phone, MapPin, Layers, Ruler, PenTool } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", location: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Studio Ascend Logo" className="h-10 w-10" />
            <span className="text-xl font-light tracking-tight">Studio Ascend</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Philosophy</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <Button variant="hero" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        </div>
        
        <div className="relative z-10 container-custom section-padding text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-balance">
            Studio Ascend
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed text-balance">
            Elevating spaces beyond the ordinary — where luxury meets purposeful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="min-w-[200px]" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="min-w-[200px]" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-card">
        <div className="container-custom max-w-4xl">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Our Story</h2>
            <p className="text-lg font-medium mb-6">
              Studio Ascend was born from a simple belief — that every space has the potential to rise above the ordinary.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We design not just interiors, but transformations — environments that elevate the way people live, move, and feel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Inspired by the quiet discipline of craftsmanship and the timeless elegance of luxury design, Studio Ascend blends precision, purity of form, and intentional simplicity. Every line, material, and texture is chosen with purpose. Every project is a journey upward — toward refinement, clarity, and harmony.
            </p>
            <p className="text-lg font-medium mb-6">
              From bespoke interiors to signature spatial experiences, Studio Ascend creates environments that feel sculpted, luminous, and effortlessly sophisticated.
            </p>
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              We don't just design spaces.<br />
              We elevate them.<br />
              We ascend.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Philosophy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A seamless journey from concept to completion, guided by precision and care
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-2xl font-light text-accent">01</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Consultation</h3>
                  <p className="text-muted-foreground">Initial Meeting</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-24 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We begin with a comprehensive discussion to understand your vision, lifestyle, and spatial requirements. 
                  We assess the space, discuss your aesthetic preferences, and establish project goals and timelines.
                </p>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-2xl font-light text-accent">02</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Design</h3>
                  <p className="text-muted-foreground">Concept Development</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-24 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  Our design team creates detailed layouts, 3D visualizations, and material palettes. We present multiple 
                  concepts, refine based on your feedback, and finalize every detail — from spatial planning to finishing touches.
                </p>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 mb-12 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-2xl font-light text-accent">03</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Execution</h3>
                  <p className="text-muted-foreground">Manufacturing & Build</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div className="w-0.5 h-24 bg-accent/30"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  We bring designs to life through precision manufacturing. Our skilled craftsmen work with premium materials, 
                  ensuring every piece meets our exacting standards. Regular quality checks guarantee flawless execution.
                </p>
              </Card>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-[1fr,auto,2fr] gap-8 items-center animate-fade-in">
              <div className="md:text-right">
                <div className="inline-block md:block">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:ml-auto">
                    <span className="text-2xl font-light text-accent">04</span>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Delivery</h3>
                  <p className="text-muted-foreground">Installation & Handover</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
              </div>
              
              <Card className="p-6 bg-background shadow-[var(--shadow-soft)]">
                <p className="text-muted-foreground leading-relaxed">
                  Professional installation ensures perfect placement and finish. We conduct a thorough walkthrough, 
                  address any final details, and provide care instructions. Your space is ready to be lived in and loved.
                </p>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in-slow">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to begin your design journey?
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Our Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Tell Us About Your Project</h2>
            <p className="text-lg text-muted-foreground">
              Let's create something beautiful together
            </p>
          </div>
          
          <Card className="p-8 md:p-12 bg-background shadow-[var(--shadow-medium)] animate-fade-in-slow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="border-border"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 xxxxx xxxxx"
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Kerala, India"
                    required
                    className="border-border"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={6}
                  required
                  className="border-border resize-none"
                />
              </div>
              
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding bg-charcoal text-warm-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Studio Ascend Logo" className="h-10 w-10 brightness-0 invert" />
                <h3 className="text-2xl font-light">Studio Ascend</h3>
              </div>
              <p className="text-warm-white/70 leading-relaxed">
                Elevating spaces beyond the ordinary. Creating transformative environments that inspire progress, refinement, and effortless sophistication.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-warm-white/70">
                  <Mail className="w-5 h-5" />
                  <span>hello@studioascend.com</span>
                </div>
                <div className="flex items-center gap-3 text-warm-white/70">
                  <Phone className="w-5 h-5" />
                  <span>+91 xxxxx xxxxx</span>
                </div>
                <div className="flex items-center gap-3 text-warm-white/70">
                  <MapPin className="w-5 h-5" />
                  <span>Kerala, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-warm-white/20 pt-8 text-center text-warm-white/60 text-sm">
            <p>© {new Date().getFullYear()} Studio Ascend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
