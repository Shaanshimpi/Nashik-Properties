export const generatePageTitle = (pageTitle, siteName = 'Nashik Properties') => {
  return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
};

export const generateMetaDescription = (description, maxLength = 160) => {
  if (!description) return 'Premium real estate listings in Nashik';
  
  if (description.length <= maxLength) return description;
  
  return description.substring(0, maxLength - 3) + '...';
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nashik Properties",
    "url": import.meta.env.VITE_SITE_URL,
    "logo": `${import.meta.env.VITE_SITE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    }
  };
};