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
          <img src={logo} alt="Allthing Decode Logo" className="h-10 w-10" />
          <span className="text-xl font-light tracking-tight">Allthing Decode</span>
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
            Allthing Decode
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
              Allthing Decode was born from a simple belief — that every space has the potential to rise above the ordinary.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We design not just interiors, but transformations — environments that elevate the way people live, move, and feel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Inspired by the quiet discipline of craftsmanship and the timeless elegance of luxury design, Allthing Decode blends precision, purity of form, and intentional simplicity. Every line, material, and texture is chosen with purpose. Every project is a journey upward — toward refinement, clarity, and harmony.
            </p>
            <p className="text-lg font-medium mb-6">
              From bespoke interiors to signature spatial experiences, Allthing Decode creates environments that feel sculpted, luminous, and effortlessly sophisticated.
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
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">DECODE Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              D → Discovery → E → Engagement → C → Craft → O → Optimize → D → Delivery → E → Execution
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> Understand client needs, goals, and constraints.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Conduct in-depth discussions to uncover requirements, priorities, and vision. Assess site conditions, property specifications, or project feasibility. Gather insights on lifestyle, business objectives, or investment criteria. Identify potential challenges or regulatory considerations.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> A clear project brief that forms the foundation for design and execution.
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> Build alignment and formalize commitment.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Present initial ideas or concepts based on Discovery insights. Define timelines, budgets, scope, and deliverables. Set up communication channels and project protocols. Discuss advisory or transaction-related aspects (if applicable).
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> Signed agreement and mutual clarity on expectations.
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> Design and conceptualization phase.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Interior/space design: Layouts, renderings, materials, color schemes. Real estate planning: Project structuring, property plans, and investment strategy. Iterative refinement with client feedback.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> A complete, approved design ready for optimization.
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> Finalize and perfect the design in consultation with the client/end-user.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Review the crafted design with the client and end-users. Make adjustments for functionality, ergonomics, aesthetics, or compliance. Ensure cost efficiency, material selection, and technical feasibility. Finalize all design details for implementation.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> Optimized, client-approved design ready for production or construction.
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> Factory production, prefabrication, and site logistics.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Coordinate production of materials, furniture, or fixtures. Manage quality checks at the factory or supplier site. Organize delivery logistics to the project site. Ensure all components are prepared for smooth installation.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> All design elements and materials are delivered to site, ready for execution.
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
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Purpose:</strong> On-site installation, setup, and project handover.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Install all design elements, furniture, fixtures, and systems on-site. Conduct thorough walkthroughs, snagging, and fine-tuning of details. Ensure the project matches the client-approved design and quality standards. Final handover with documentation, instructions, or training as needed.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  <strong>Outcome:</strong> Fully functional, installed project that meets client expectations and is ready for occupancy or use.
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
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl transform -rotate-1"></div>
                <div className="absolute -inset-4 border border-primary/20 rounded-2xl transform rotate-1"></div>
                <div className="relative flex items-center gap-3 px-6 py-4 bg-background/5 backdrop-blur-sm rounded-xl border border-border/30">
                  <img src={logo} alt="Allthing Decode Logo" className="h-10 w-10 brightness-0 invert" />
                  <h3 className="text-2xl font-light">Allthing Decode</h3>
                </div>
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
                  <span>hello@allthingdecode.com</span>
                </div>
                <div className="flex items-center gap-3 text-warm-white/70">
                  <Phone className="w-5 h-5" />
                  <span>+91 96338 60898</span>
                </div>
                <div className="flex items-center gap-3 text-warm-white/70">
                  <MapPin className="w-5 h-5" />
                  <span>Kerala, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-warm-white/20 pt-8 text-center text-warm-white/60 text-sm">
            <p>© {new Date().getFullYear()} Allthing Decode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
