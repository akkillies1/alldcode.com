import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO = ({
    title,
    description = "DPL Homestar elevates spaces beyond the ordinary. Transformative luxury interior design, bespoke furniture, and signature spatial experiences in Kerala.",
    image = "https://dplhomestar.com/og-image.png",
    url,
    type = "website"
}: SEOProps) => {
    const siteTitle = "DPL Homestar";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    
    // Ensure canonical URL always points to the primary domain
    const getCanonicalUrl = () => {
        if (url) return url;
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            const search = window.location.search;
            return `https://www.dplhomestar.com${path}${search}`;
        }
        return "https://www.dplhomestar.com";
    };

    const canonicalUrl = getCanonicalUrl();

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image.startsWith('http') ? image : `https://dplhomestar.com${image}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image.startsWith('http') ? image : `https://dplhomestar.com${image}`} />
        </Helmet>
    );
};
