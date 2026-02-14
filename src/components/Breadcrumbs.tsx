import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    path: string;
}

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) return null;

    const breadcrumbs: BreadcrumbItem[] = pathnames.map((name, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        // Beautify the label
        const label = name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return { label, path };
    });

    // Generate Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.dplhomestar.com"
            },
            ...breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": crumb.label,
                "item": `https://www.dplhomestar.com${crumb.path}`
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6 flex animate-fade-in">
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            <ol className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground font-medium">
                <li>
                    <Link to="/" className="flex items-center hover:text-accent transition-colors">
                        <Home className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="sr-only sm:not-sr-only">Home</span>
                    </Link>
                </li>
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <li key={crumb.path} className="flex items-center">
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 text-muted-foreground/40" />
                            {isLast ? (
                                <span className="text-foreground font-bold truncate max-w-[150px] md:max-w-none" aria-current="page">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link to={crumb.path} className="hover:text-accent transition-colors truncate max-w-[150px] md:max-w-none">
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
