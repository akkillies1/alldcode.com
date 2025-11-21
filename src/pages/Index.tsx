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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        </div>
        
        <div className="relative z-10 container-custom section-padding text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-balance">
            Hagakure Studio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed text-balance">
            Design & interiors inspired by the Hagakure philosophy — clarity, discipline, and refined simplicity.
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
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">About the Studio</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hagakure Studio brings the timeless principles of Japanese minimalism to Kerala's vibrant landscape. 
                We believe in creating spaces that breathe — where every element serves a purpose, and beauty emerges 
                from restraint.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our approach combines meticulous planning, premium materials, and end-to-end execution to deliver 
                interiors that stand the test of time.
              </p>
            </div>
            
            <div className="space-y-8 animate-fade-in-slow">
              <Card className="p-6 border-l-4 border-l-accent bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)]">
                <h3 className="text-xl font-medium mb-2">Akhil</h3>
                <p className="text-sm text-muted-foreground mb-1">Execution & Delivery</p>
                <p className="text-muted-foreground">
                  Masters the art of bringing designs to life with precision manufacturing and flawless installation.
                </p>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-accent bg-background shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)]">
                <h3 className="text-xl font-medium mb-2">Shinu</h3>
                <p className="text-sm text-muted-foreground mb-1">Design Direction</p>
                <p className="text-muted-foreground">
                  Crafts spatial experiences that balance aesthetics with functionality, inspired by timeless principles.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">The Hagakure Way</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three pillars that guide every design decision we make
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Layers className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Discipline</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every element is carefully chosen. No excess, no distraction — only what serves the space and its inhabitants.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                Design with intention. Every space tells a story, reflects its purpose, and enhances daily living.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-card shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)] animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Ruler className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Simplicity</h3>
              <p className="text-muted-foreground leading-relaxed">
                True elegance lies in restraint. Clean lines, natural materials, and harmonious proportions create timeless beauty.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-card">
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
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-light mb-4">Hagakure Studio</h3>
              <p className="text-warm-white/70 leading-relaxed">
                Designing interiors inspired by the philosophy of clarity, discipline, and refined simplicity.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Promoters</h4>
              <div className="space-y-2 text-warm-white/70">
                <p>Akhil — Execution & Delivery</p>
                <p>Shinu — Design Direction</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-warm-white/70">
                  <Mail className="w-5 h-5" />
                  <span>hello@hagakurestudio.com</span>
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
            <p>© {new Date().getFullYear()} Hagakure Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
