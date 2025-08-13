// src/services/seo/structuredData.js
import { SEO_DEFAULTS } from '../../utils/constants/seoConstants';

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": SEO_DEFAULTS.ORGANIZATION_TYPE,
    "name": SEO_DEFAULTS.ORGANIZATION_NAME,
    "description": SEO_DEFAULTS.SITE_DESCRIPTION,
    "url": SEO_DEFAULTS.SITE_URL,
    "logo": generateOpenGraphImage('/logo.png'),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.facebook.com/realtywebsite",
      "https://www.twitter.com/realtywebsite",
      "https://www.linkedin.com/company/realtywebsite"
    ]
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO_DEFAULTS.SITE_NAME,
    "url": SEO_DEFAULTS.SITE_URL,
    "description": SEO_DEFAULTS.SITE_DESCRIPTION,
    "publisher": {
      "@type": SEO_DEFAULTS.ORGANIZATION_TYPE,
      "name": SEO_DEFAULTS.ORGANIZATION_NAME
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SEO_DEFAULTS.SITE_URL}/properties?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export const generatePropertySchema = (property) => {
  if (!property) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title?.rendered || '',
    "description": property.acf?.description || property.excerpt?.rendered || '',
    "url": generateCanonicalUrl(`/property/${property.id}`),
    "image": property.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url || '',
    "offers": {
      "@type": "Offer",
      "price": property.acf?.price || 0,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.acf?.address || '',
      "addressCountry": "IN"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.acf?.area || 0,
      "unitText": "SQFT"
    },
    "datePosted": property.date || new Date().toISOString()
  };
};

export const generateBreadcrumbSchema = (breadcrumbs = []) => {
  if (!breadcrumbs.length) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": generateCanonicalUrl(crumb.url)
    }))
  };
};
