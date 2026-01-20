import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const LOCATIONS = [
  { slug: "kochi", name: "Kochi" },
  { slug: "trivandrum", name: "Trivandrum" },
  { slug: "kottayam", name: "Kottayam" },
  { slug: "thrissur", name: "Thrissur" },
  { slug: "palakkad", name: "Palakkad" },
  { slug: "thiruvalla", name: "Thiruvalla" },
  { slug: "alappuzha", name: "Alappuzha" },
  { slug: "kozhikode", name: "Kozhikode" },
  { slug: "kannur", name: "Kannur" },
  { slug: "coimbatore", name: "Coimbatore" },
  { slug: "bangalore", name: "Bangalore" },
  { slug: "kerala", name: "All Kerala" }
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Locations"
        description="Explore DPL Homestar's presence across Kerala and South India. Luxury interior design and turnkey interiors in Kochi, Trivandrum, Kottayam, Thrissur, Palakkad, Thiruvalla, Alappuzha, Kozhikode, Kannur, Coimbatore and Bangalore."
        url="https://www.dplhomestar.com/locations"
      />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">DPL Homestar Locations</h1>
        <p className="mt-4 text-muted-foreground">
          Luxury Interior Design & Turnkey Interiors across Kerala and neighboring cities.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map(loc => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="border border-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="text-xl font-semibold">{loc.name}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Luxury interior design, bespoke furniture, and turnkey execution.
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;

