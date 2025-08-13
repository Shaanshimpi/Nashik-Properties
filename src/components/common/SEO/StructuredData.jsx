// src/components/common/SEO/StructuredData.jsx
import React from 'react';

const PropertyStructuredData = ({ property }) => {
  if (!property) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title?.rendered || '',
    "description": property.acf?.description || property.excerpt?.rendered || '',
    "url": `${import.meta.env.VITE_SITE_URL || window.location.origin}/property/${property.id}`,
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
      "addressLocality": property.acf?.city || '',
      "addressRegion": property.acf?.state || '',
      "addressCountry": "IN"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.acf?.area || 0,
      "unitText": "SQFT"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const OrganizationStructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": import.meta.env.VITE_SITE_NAME || "Realty Website",
    "description": import.meta.env.VITE_SITE_DESCRIPTION || "Premium property listings and real estate services",
    "url": import.meta.env.VITE_SITE_URL || window.location.origin,
    "logo": `${import.meta.env.VITE_SITE_URL || window.location.origin}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/yourcompany",
      "https://www.twitter.com/yourcompany",
      "https://www.linkedin.com/company/yourcompany"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "Customer Service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
};

const BreadcrumbStructuredData = ({ breadcrumbs }) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};

export { PropertyStructuredData, OrganizationStructuredData, BreadcrumbStructuredData };