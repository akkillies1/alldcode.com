import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, CheckCircle2, Factory, Truck, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LOCATIONS = [
  { slug: "kochi", name: "Kochi", desc: "Marine Drive, Kakkanad, and premium flat corridor expertise.", region: "Central Kerala" },
  { slug: "trivandrum", name: "Trivandrum", desc: "Heritage luxury and modern urban living in the capital.", region: "South Kerala" },
  { slug: "kottayam", name: "Kottayam", desc: "Teak-centric luxury for the rubber-belt capital's estates.", region: "South Kerala" },
  { slug: "thrissur", name: "Thrissur", desc: "Cultural elegance meeting modern modular efficiency.", region: "Central Kerala" },
  { slug: "palakkad", name: "Palakkad", desc: "Climatic-responsive minimalist designs for the gateway.", region: "Central Kerala" },
  { slug: "thiruvalla", name: "Thiruvalla", desc: "The trusted choice for NRI families and high-end retreats.", region: "South Kerala" },
  { slug: "alappuzha", name: "Alappuzha", desc: "Moisture-resistant coastal luxury for waterfront living.", region: "South Kerala" },
  { slug: "kozhikode", name: "Kozhikode", desc: "Warm Malabar textures blended with sleek modernism.", region: "North Kerala" },
  { slug: "kannur", name: "Kannur", desc: "Vibrant spatial design for high-end residential projects.", region: "North Kerala" },
  { slug: "coimbatore", name: "Coimbatore", desc: "Urban sophistication for the Manchester of South India.", region: "Tamil Nadu" },
  { slug: "bangalore", name: "Bangalore", desc: "Tech-forward smart home luxury in HSR & Indiranagar.", region: "Karnataka" },
  { slug: "kerala", name: "All Kerala", desc: "Universal turnkey excellence from Kasaragod to Fort Kochi.", region: "State-wide" }
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Locations | Luxury Interior Design Presence in Kerala & South India"
        description="DPL Homestar's extensive reach covers Kochi, Trivandrum, Bangalore, and across Kerala. Explore our localized turnkey interior services designed for regional nuances."
        url="https://www.dplhomestar.com/locations"
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs />

          <div className="mt-12 mb-20 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 tracking-widest uppercase">
              <MapPin className="w-4 h-4" /> Regional Presence
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-foreground">
              Expertise Across <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8 italic">South India</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              DPL Homestar is not just an interior firm; we are a regional infrastructure for luxury living. With an integrated production factory in Kerala and dedicated site teams in 15+ cities, we define what's possible in turnkey execution.
            </p>
          </div>

          <section className="grid lg:grid-cols-2 gap-12 mb-32 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">The DPL Advantage: Local Soul, <span className="text-accent">Global Standard</span></h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Building a luxury home in Kerala requires more than just a designer. It requires a partner who understands the high humidity of Alappuzha, the heritage aesthetics of Kottayam, and the rapid pace of Bangalore's real estate.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Factory />, title: "Centralized Production", desc: "Precision modular manufacturing." },
                  { icon: <Truck />, title: "Regional Logistics", desc: "Unified supply chain across cities." },
                  { icon: <Award />, title: "Trusted Brand", desc: "200+ projects delivered successfully." },
                  { icon: <Sparkles />, title: "45-Day Commitment", desc: "Industry-leading delivery speed." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-accent shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/#contact">Project Inquiry</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-3xl bg-accent/20 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-2xl font-bold text-white">200+</span>
                    <span className="text-sm text-white/70">Projects</span>
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-muted overflow-hidden relative">
                  <div className="absolute inset-0 p-6 flex flex-col justify-center text-center">
                    <span className="text-4xl font-bold text-accent">15+</span>
                    <span className="text-xs font-bold uppercase tracking-widest mt-2 text-foreground">Cities Covered</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl bg-muted overflow-hidden relative">
                  <div className="absolute inset-0 p-6 flex flex-col justify-center text-center">
                    <span className="text-4xl font-bold text-accent">45</span>
                    <span className="text-xs font-bold uppercase tracking-widest mt-2 text-foreground">Day Turnaround</span>
                  </div>
                </div>
                <div className="aspect-[4/5] rounded-3xl bg-accent/10 overflow-hidden relative">
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
                    <span className="text-lg font-bold text-foreground">100% Quality Assurance</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <h2 className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3 text-foreground border-b border-border pb-6">
            <MapPin className="w-8 h-8 text-accent" /> Explore City-Specific Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {LOCATIONS.map(loc => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}`}
                className="group relative"
              >
                <Card className="h-full border-border bg-card p-8 hover:border-accent/40 shadow-sm transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all">
                    <MapPin className="w-16 h-16" />
                  </div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">{loc.region}</div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{loc.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors italic">
                    {loc.desc}
                  </p>
                  <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                    View Local Projects <Sparkles className="w-3 h-3 ml-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Locations;

