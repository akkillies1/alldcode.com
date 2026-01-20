import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

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

const CITY_DATA: Record<CitySlug, { name: string; state: string; seoPhrase: string; description: string; keywords: string[] }> = {
  kochi: {
    name: "Kochi",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "DPL Homestar delivers luxury interior design and turnkey interiors in Kochi. From bespoke furniture to modular kitchens, we craft signature spaces that balance aesthetics and function. Our end-to-end execution ensures a seamless experience from design to installation.",
    keywords: ["DPL Homestar", "dplhomestar", "dpl home star", "dpl homestar interiors", "interiors in kochi", "interiors in kerala"]
  },
  trivandrum: {
    name: "Trivandrum",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "We design and deliver refined interiors in Trivandrum with tailored concepts, premium finishes, and reliable turnkey execution. Experience DPL Homestar’s unique blend of elegance and practicality.",
    keywords: ["DPL Homestar", "interiors in trivandrum", "kerala interiors"]
  },
  kottayam: {
    name: "Kottayam",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "From modern apartments to heritage homes, our Kottayam projects showcase thoughtful planning, custom furniture, and efficient on-site execution.",
    keywords: ["DPL Homestar", "interiors in kottayam", "kerala interiors"]
  },
  thrissur: {
    name: "Thrissur",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "We craft sophisticated spaces in Thrissur with a strong focus on material quality, budget alignment, and timely delivery.",
    keywords: ["DPL Homestar", "interiors in thrissur", "kerala interiors"]
  },
  palakkad: {
    name: "Palakkad",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "Our Palakkad interiors emphasize natural light, clean lines, and practical layouts, tailored to your lifestyle.",
    keywords: ["DPL Homestar", "interiors in palakkad", "kerala interiors"]
  },
  thiruvalla: {
    name: "Thiruvalla",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "DPL Homestar brings curated designs and reliable turnkey services to Thiruvalla—optimizing space and detail for lasting comfort.",
    keywords: ["DPL Homestar", "interiors in thiruvalla", "kerala interiors"]
  },
  alappuzha: {
    name: "Alappuzha",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "We integrate serene palettes and high-performance materials for Alappuzha homes and commercial spaces.",
    keywords: ["DPL Homestar", "interiors in alappuzha", "kerala interiors"]
  },
  kozhikode: {
    name: "Kozhikode",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "Kozhikode interiors by DPL Homestar balance minimal aesthetics with warm textures and precise execution.",
    keywords: ["DPL Homestar", "interiors in kozhikode", "kerala interiors"]
  },
  kannur: {
    name: "Kannur",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "From concept to handover, we manage Kannur projects with clarity, craftsmanship, and accountable timelines.",
    keywords: ["DPL Homestar", "interiors in kannur", "kerala interiors"]
  },
  coimbatore: {
    name: "Coimbatore",
    state: "Tamil Nadu",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "We serve Coimbatore with contemporary interiors, custom furniture, and smooth execution aligned with local needs.",
    keywords: ["DPL Homestar", "interiors in coimbatore"]
  },
  bangalore: {
    name: "Bangalore",
    state: "Karnataka",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "In Bangalore, DPL Homestar offers elevated designs and comprehensive turnkey services for premium residences and commercial spaces.",
    keywords: ["DPL Homestar", "interiors in bangalore"]
  },
  kerala: {
    name: "Kerala",
    state: "Kerala",
    seoPhrase: "Luxury Interior Design & Turnkey Interiors",
    description:
      "All-Kerala presence with unified processes, quality checks, and dependable logistics. From design finalization to execution, we assure efficiency and consistency.",
    keywords: ["DPL Homestar", "all kerala presence", "interiors in kerala"]
  }
};

const Location = () => {
  const params = useParams();
  const slug = (params.city || "kerala") as CitySlug;
  const data = CITY_DATA[slug] || CITY_DATA["kerala"];
  const canonical = `https://www.dplhomestar.com/locations/${slug}`;
  const title = `${data.seoPhrase} in ${data.name} | DPL Homestar Interiors`;
  const description = `${data.description} DPL Homestar — ${data.keywords.join(", ")}.`;

  const faq = useMemo(
    () => [
      { q: `Do you offer turnkey interiors in ${data.name}?`, a: "Yes. Our team handles design, production, logistics, installation, and quality checks end-to-end." },
      { q: `What is DPL Homestar’s design approach in ${data.name}?`, a: "Function-led aesthetics, tailored layouts, and material choices aligned with local context and lifestyle." },
      { q: `How soon can execution start after design approval?`, a: "Production and execution commence immediately after approval, with a clear timeline and tracked milestones." }
    ],
    [data.name]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={title} description={description} url={canonical} />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{data.name}, {data.state}</h1>
            <p className="mt-4 text-muted-foreground">
              {data.seoPhrase} by DPL Homestar in {data.name}. We design, produce, and execute with precision.
            </p>
          </div>
          <Link to="/locations" className="text-sm text-accent underline">All Locations</Link>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Services</h2>
            <p>
              Luxury interior design, bespoke furniture, modular kitchens, and turnkey execution. We prioritize clear budgets, practical timelines, and consistent quality control.
            </p>
            <p>
              Our process ensures every detail is approved before production. Delivery is organized, and installation is supervised for a seamless handover.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Why DPL Homestar</h2>
            <p>
              Distinctive aesthetics, reliable execution, and client-first communication. We combine design vision with engineering discipline for lasting results.
            </p>
            <p>
              Trusted across {data.state}. Keywords: {data.keywords.join(", ")}.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold">FAQs</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="font-medium">{item.q}</div>
                <div className="mt-2 text-muted-foreground">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link to="/#contact" className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-md">
            Start your project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Location;

