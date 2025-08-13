export const generateSEOTitle = (title, siteName = 'Nashik Properties') => {
  return title ? `${title} | ${siteName}` : siteName;
};

export const generateSEODescription = (description, fallback = 'Premium real estate listings in Nashik') => {
  return description || fallback;
};

export const generateSEOKeywords = (property, baseKeywords = 'nashik properties, real estate') => {
  if (!property) return baseKeywords;
  
  const keywords = [baseKeywords];
  
  if (property._embedded && property._embedded['wp:term']) {
    const terms = property._embedded['wp:term'];
    terms.forEach(termGroup => {
      termGroup.forEach(term => {
        keywords.push(term.name.toLowerCase());
      });
    });
  }
  
  return keywords.join(', ');
};

export const generateCanonicalUrl = (path = '') => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://localhost:3000';
  return `${baseUrl}${path}`;
};

export const generatePropertyImageUrl = (property) => {
  if (!property?.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url) {
    return import.meta.env.VITE_DEFAULT_IMAGE || '/default-property.jpg';
  }
  return property.acf.photo_gallery.images[0][0].full_image_url;
};