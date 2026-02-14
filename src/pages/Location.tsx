import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft, MapPin, CheckCircle2, Building2, Home as HomeIcon, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";

type CitySlug =
  | "kochi"
  | "trivandrum"
  | "kottayam"
  | "thrissur"
  | "palakkad"
  | "thiruvalla"
  | "alappuzha"
  | "kozhikode"
  | "kannur"
  | "coimbatore"
  | "bangalore"
  | "kerala";

const CITY_DATA: Record<CitySlug, {
  name: string;
  state: string;
  seoPhrase: string;
  description: string;
  keywords: string[];
  tagline: string;
  introTitle: string;
  expertTitle: string;
  advantageText: string;
  homeownerText: string;
  builderText: string;
  nearby?: CitySlug[]
}> = {
  kochi: {
    name: "Kochi",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "DPL Homestar delivers luxury interior design and turnkey interiors in Kochi. From bespoke furniture to modular kitchens, we craft signature spaces that balance aesthetics and function in the city's premium apartment corridors like Marine Drive and Kakkanad.",
    keywords: ["DPL Homestar", "dplhomestar", "dpl home star", "dpl homestar interiors", "interiors in kochi", "interiors in kerala"],
    tagline: "Kochi's Premium Handcrafted Interiors",
    introTitle: "Cochin's Elite Turnkey Partner",
    expertTitle: "Signature Spatial Experiences in Kochi",
    advantageText: "Our unique advantage in Kochi is our proximity to our integrated production hub, allowing for rapid 45-day deployment in high-rise apartments and luxury villas alike.",
    homeownerText: "Transform your city flat or suburban villa into a designer sanctuary with our turnkey expertise and local delivery network in Ernakulam.",
    builderText: "Elevate your real estate value in Kochi by offering 'DCODE Enabled' interior packages for your upcoming residential projects.",
    nearby: ["alappuzha", "thrissur", "kottayam"]
  },
  trivandrum: {
    name: "Trivandrum",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "We design and deliver refined interiors in Trivandrum with tailored concepts, premium finishes, and reliable turnkey execution. Our projects in Kowdiar and Kazhakkoottam redefine urban elegance.",
    keywords: ["DPL Homestar", "interiors in trivandrum", "kerala interiors"],
    tagline: "Refined Living in the Capital",
    introTitle: "The Capital's Designer Choice",
    expertTitle: "Curated Turnkey Solutions in Trivandrum",
    advantageText: "In the capital city, we specialize in high-end finishes and heritage-inspired modern designs, supported by our robust logistical network across South Kerala.",
    homeownerText: "Whether it's a home in the historic fort area or a modern villa in Technopark, we bring global design standards to your Trivandrum doorstep.",
    builderText: "Partner with Kerala's premium turnkey experts to deliver high-finishing interiors for premium gated communities in Trivandrum.",
    nearby: ["thiruvalla", "alappuzha", "kerala"]
  },
  kottayam: {
    name: "Kottayam",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "From modern apartments to grand heritage homes, our Kottayam projects showcase thoughtful planning, custom teak furniture, and efficient execution for the rubber-belt capital's elite residences.",
    keywords: ["DPL Homestar", "interiors in kottayam", "kerala interiors"],
    tagline: "Luxury Meets Heritage in Kottayam",
    introTitle: "Bespoke Interiors for Kottayam's Elite",
    expertTitle: "Mastercrafting Kottayam's Residential Landscapes",
    advantageText: "Our Kottayam advantage lies in our deep understanding of the region's penchant for wood-centric luxury and durable, climate-ready interior materials.",
    homeownerText: "Build a home that reflects Kottayam's rich heritage while embracing modern comforts with our end-to-end turnkey solutions.",
    builderText: "Deliver world-class interiors for luxury villa projects in Kottayam with DPL Homestar's accountable execution model.",
    nearby: ["thiruvalla", "kochi", "alappuzha"]
  },
  thrissur: {
    name: "Thrissur",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "We craft sophisticated spaces in Thrissur, the cultural capital, with a strong focus on gold-standard material quality, budget alignment, and timely delivery for villa owners.",
    keywords: ["DPL Homestar", "interiors in thrissur", "kerala interiors"],
    tagline: "Architecture with Heart in Thrissur",
    introTitle: "Cultural Soul, Modern Design in Thrissur",
    expertTitle: "Turnkey Excellence for the Cultural Capital",
    advantageText: "In Thrissur, we combine traditional motifs with modern modular efficiency, ensuring every project is delivered within the promised 45-day window.",
    homeownerText: "From expansive villas to compact luxury apartments, our Thrissur team delivers spaces that are both functional and emotionally resonant.",
    builderText: "Enhance your project's aesthetic appeal in Thrissur with our designer-curated turnkey interior packages for builders.",
    nearby: ["palakkad", "kochi", "kozhikode"]
  },
  palakkad: {
    name: "Palakkad",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "Our Palakkad interiors emphasize natural light, clean lines, and practical layouts, tailored to the unique climate and lifestyle of the gateway to Kerala.",
    keywords: ["DPL Homestar", "interiors in palakkad", "kerala interiors"],
    tagline: "Modern Minimalism in Palakkad",
    introTitle: "Gateway to Designer Living in Palakkad",
    expertTitle: "Practical Luxury for Palakkad Families",
    advantageText: "Our Palakkad design philosophy focuses on cross-ventilation and thermal comfort, using high-performance materials that withstand the local weather.",
    homeownerText: "Creating open, airy, and sustainable homes for Palakkad residents through our efficient and accountable turnkey processes.",
    builderText: "Collaborate with DPL Homestar to deliver high-quality, durable interiors for multi-family residential projects in Palakkad.",
    nearby: ["thrissur", "coimbatore", "kozhikode"]
  },
  thiruvalla: {
    name: "Thiruvalla",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "DPL Homestar brings curated designs and reliable turnkey services to Thiruvalla, specializing in premium NRI homes where detail and durability are paramount.",
    keywords: ["DPL Homestar", "interiors in thiruvalla", "kerala interiors"],
    tagline: "Global Standards for Thiruvalla Homes",
    introTitle: "The Trusted NRI Partner in Thiruvalla",
    expertTitle: "Global Design, Local Heart in Thiruvalla",
    advantageText: "For Thiruvalla, we offer specialized remote management for our NRI clientele, allowing them to track project progress from anywhere in the world.",
    homeownerText: "Experience stress-free home creation while abroad with our transparent reporting and world-class finish standards in Thiruvalla.",
    builderText: "Attract NRI buyers in Thiruvalla by offering premium interior design packages delivered by Kerala's most trusted turnkey firm.",
    nearby: ["kottayam", "alappuzha", "trivandrum"]
  },
  alappuzha: {
    name: "Alappuzha",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "We integrate serene palettes and high-performance materials for Alappuzha's coastal homes and backwater-facing luxury villas.",
    keywords: ["DPL Homestar", "interiors in alappuzha", "kerala interiors"],
    tagline: "Coastal Luxury in Alappuzha",
    introTitle: "Bespoke Coastal Interiors in Alappuzha",
    expertTitle: "Waterfront Living Reimagined in Alappuzha",
    advantageText: "Our Alappuzha projects utilize moisture-resistant BWP grade materials and high-durability finishes designed for the coastal humidity.",
    homeownerText: "Build your dream waterfront home or traditional villa with our specialized knowledge of materials and coastal design aesthetics.",
    builderText: "Increase the premium appeal of your lake-facing or coastal properties in Alappuzha with our high-end interior solutions.",
    nearby: ["kochi", "kottayam", "thiruvalla"]
  },
  kozhikode: {
    name: "Kozhikode",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "Kozhikode interiors by DPL Homestar balance minimal aesthetics with the warm textures of Malabar's architectural heritage and precise execution for premium flats.",
    keywords: ["DPL Homestar", "interiors in kozhikode", "kerala interiors"],
    tagline: "Elegance for the Malabar Coast",
    introTitle: "The Malabar Designer Destination",
    expertTitle: "Signature Malabar Spaces in Kozhikode",
    advantageText: "For Kozhikode, we blend the warmth of traditional Malabar hospitality with sleek modern lines and modular precision for city residences.",
    homeownerText: "Transform your Calicut home into a space of comfort and prestige with DPL Homestar's trusted turnkey execution model.",
    builderText: "Drive sales for your premium apartment projects in Kozhikode with our designer-led turnkey interior packages.",
    nearby: ["kannur", "palakkad", "thrissur"]
  },
  kannur: {
    name: "Kannur",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "From concept to handover, we manage Kannur projects with clarity, craftsmanship, and accountable timelines, reflecting the vibrant culture of North Kerala.",
    keywords: ["DPL Homestar", "interiors in kannur", "kerala interiors"],
    tagline: "Vibrant & Versatile Kannur Interiors",
    introTitle: "North Kerala's Premium Design Firm",
    expertTitle: "Accountable Luxury for Kannur Homeowners",
    advantageText: "In Kannur, our commitment is to transparency and timeliness, ensuring NRI and local families receive their homes on schedule, every time.",
    homeownerText: "Bring vibrant and functional interiors to your Kannur residence with DPL Homestar's expert spatial planning and production.",
    builderText: "Partner with an established Kerala brand to deliver value-added interiors for your upcoming projects in Kannur.",
    nearby: ["kozhikode", "kerala"]
  },
  coimbatore: {
    name: "Coimbatore",
    state: "Tamil Nadu",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "We serve Coimbatore with contemporary interiors, custom furniture, and smooth execution aligned with the industrial city's dynamic needs and premium developments.",
    keywords: ["DPL Homestar", "interiors in coimbatore"],
    tagline: "Urban Sophistication in Coimbatore",
    introTitle: "Cochin's Craft for Coimbatore's Elite",
    expertTitle: "Contemporary Turnkey Solutions in Coimbatore",
    advantageText: "Our Coimbatore advantage lies in bringing Kerala's specialized wood craftsmanship and modular efficiency to the Manchester of South India.",
    homeownerText: "Modernize your Coimbatore residence with sleek layouts and bespoke furniture designed for urban living.",
    builderText: "Offer designer-grade interiors to your premium clientele in Coimbatore with our scalable turnkey delivery system.",
    nearby: ["palakkad", "bangalore", "kerala"]
  },
  bangalore: {
    name: "Bangalore",
    state: "Karnataka",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "In Bangalore's tech-driven landscape, DPL Homestar offers elevated designs and comprehensive turnkey services for high-end HSR Layout and Indiranagar residences.",
    keywords: ["DPL Homestar", "interiors in bangalore"],
    tagline: "Tech-Forward Interior Luxury in Bangalore",
    introTitle: "Elevated Designs for Bangalore's Global Citizens",
    expertTitle: "Smart Luxury Turnkey Services in Bangalore",
    advantageText: "In Bangalore, we focus on tech-integrated home solutions and space-optimizing modular designs for the discerning urban professional.",
    homeownerText: "Experience a seamless move-in with our fully managed turnkey process for your premium Bangalore apartment or row house.",
    builderText: "Add a competitive edge to your Bangalore real estate developments with our superior interior finishing and delivery speed.",
    nearby: ["coimbatore", "kochi", "kerala"]
  },
  kerala: {
    name: "Kerala",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description: "All-Kerala presence with unified processes, quality checks, and dependable logistics. From Kasaragod to Thiruvananthapuram, we assure efficiency and aesthetic consistency.",
    keywords: ["DPL Homestar", "all kerala presence", "interiors in kerala"],
    tagline: "The Gold Standard for Kerala Interiors",
    introTitle: "Kerala's Signature Turnkey Interior Brand",
    expertTitle: "Defining Premium Living Across Kerala",
    advantageText: "Our primary strength is our state-wide delivery capability, fueled by centralized design excellence and localized site management teams.",
    homeownerText: "Wherever you are in Kerala, access premium interior design and turnkey execution with the region's most trusted brand.",
    builderText: "Standardize the quality of your interiors across multiple project locations in Kerala with DPL Homestar's unified delivery model.",
    nearby: ["kochi", "trivandrum", "kozhikode", "bangalore", "coimbatore"]
  }
};

const Location = () => {
  const params = useParams();
  const slug = (params.city || "kerala") as CitySlug;
  const data = CITY_DATA[slug] || CITY_DATA["kerala"];
  const canonical = `https://www.dplhomestar.com/locations/${slug}`;
  const title = `${data.seoPhrase} in ${data.name} | Best Interior Designer ${data.name}`;
  const description = `${data.description} Looking for the best interior designer in ${data.name}? DPL Homestar offers budget-friendly luxury turnkey solutions.`;

  const faq = useMemo(
    () => [
      { q: `Do you offer turnkey interiors in ${data.name}?`, a: `Yes. Our team handles the entire lifecycle of interior design in ${data.name} including design, production, logistics, installation, and strict quality checks.` },
      { q: `What is the cost of interior design in ${data.name}?`, a: `Interior costs in ${data.name} vary based on scope and materials. DPL Homestar specializes in "Budget-Friendly Luxury," ensuring premium results without the premium price tag. Contact us for a detailed quote.` },
      { q: `Who is the best interior designer in ${data.name} for turnkey projects?`, a: `DPL Homestar is widely recognized for delivering high-quality turnkey interiors in ${data.name}, known for our signature "DCODE" process and 45-day delivery commitment.` },
      { q: `How soon can execution start in ${data.name} after design approval?`, a: `Production and execution in ${data.name} commence immediately after the design is finalized. We typically complete standard turnkey projects within 45 days.` }
    ],
    [data.name]
  );

  // Generate Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://www.dplhomestar.com/locations/${slug}#localbusiness`,
        "name": `DPL Homestar - ${data.name}`,
        "description": data.description,
        "url": canonical,
        "telephone": "+919633860898",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "24/1701, Door No 14/22AB4, Suite No 883, 2nd floor, KC Arcade, Near TV center, Cochin Special Economin Zone",
          "addressLocality": data.name,
          "addressRegion": data.state,
          "addressCountry": "IN"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": data.name
          }
        ],
        "image": "https://www.dplhomestar.com/og-image.png",
        "priceRange": "$$"
      },
      {
        "@type": "Service",
        "name": `Turnkey Interior Design in ${data.name}`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "DPL Homestar"
        },
        "areaServed": {
          "@type": "City",
          "name": data.name
        },
        "description": `Comprehensive turnkey interior solutions in ${data.name} including space planning, modular furniture, and execution.`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "24"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <SEO title={title} description={description} url={canonical} schema={schema} />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <Breadcrumbs />

        <article>
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              {data.tagline} <span className="text-accent italic font-serif">in {data.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl leading-relaxed">
              Elevated, budget-friendly luxury turnkey interiors in {data.name}, {data.state}. We DCODE your vision into an architectural reality.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-12">
              <section className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold tracking-tight mb-6">{data.introTitle}</h2>
                <p>
                  {data.description} Our approach in <strong>{data.name}</strong> focuses on delivering luxury that is both functional and culturally resonant.
                </p>

                <h3 className="text-2xl font-bold mt-10 mb-6">{data.expertTitle}</h3>
                <p>
                  We specialize in transforming residential and commercial spaces in {data.name} into signature environments. Our 5-letter <Link to="/#process" className="text-accent underline decoration-accent/30 underline-offset-4">DCODE process</Link> ensures that your personal style is translated into every square foot of your property.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 my-10 not-prose">
                  {[
                    "Complete Space Planning",
                    "Modular Kitchens & Wardrobes",
                    "Bespoke Furniture Design",
                    "Electrical & Lighting Design",
                    "False Ceiling & Flooring",
                    "On-site Project Management"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10 transition-colors hover:bg-accent/10">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <p>
                  {data.advantageText} This ensures a <strong>45-day delivery</strong> timeline from design approval, a commitment we hold sacred for every project in {data.name}.
                </p>
              </section>

              {/* Homeowner vs Builder CTAs */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl bg-card border border-border shadow-sm group hover:border-accent/30 transition-all">
                  <HomeIcon className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">For Homeowners</h3>
                  <p className="text-muted-foreground mb-6 font-light">{data.homeownerText}</p>
                  <Button asChild className="rounded-full w-full bg-accent hover:bg-accent/90">
                    <Link to="/#contact">Get Your Quote</Link>
                  </Button>
                </div>
                <div className="p-8 rounded-2xl bg-card border border-border shadow-sm group hover:border-accent/30 transition-all">
                  <Building2 className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">For Builders</h3>
                  <p className="text-muted-foreground mb-6 font-light">{data.builderText}</p>
                  <Button variant="outline" asChild className="rounded-full w-full border-accent text-accent hover:bg-accent/5">
                    <Link to="/#contact">Strategic Partnership</Link>
                  </Button>
                </div>
              </section>

              <section id="faq" className="mt-16">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
                    <details key={i} className="group border border-border rounded-2xl overflow-hidden bg-card transition-all">
                      <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none group-open:bg-accent/5">
                        {item.q}
                        <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8 sticky top-24">
              <div className="p-8 rounded-2xl bg-accent text-accent-foreground shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-bold mb-4">Start Your Transformation</h3>
                <p className="mb-8 font-light opacity-90">Book a free design discovery session in {data.name} today.</p>
                <Button asChild size="lg" className="w-full rounded-full bg-white text-accent hover:bg-white/90 shadow-lg">
                  <Link to="/#contact">Contact Us Now</Link>
                </Button>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Nearby Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.nearby?.map(city => (
                    <Link
                      key={city}
                      to={`/locations/${city}`}
                      className="px-4 py-2 bg-muted rounded-full text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all capitalize"
                    >
                      {city}
                    </Link>
                  ))}
                  <Link
                    to="/locations"
                    className="px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-bold hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Location;

