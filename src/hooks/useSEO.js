import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSEO = (seoData = {}) => {
  const location = useLocation();
  
  const {
    title = 'Nashik Properties',
    description = 'Premium real estate listings in Nashik',
    keywords = 'nashik properties, real estate',
    image = '/default-property.jpg',
    url = window.location.href,
    type = 'website'
  } = seoData;

  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords, location]);

  return {
    title,
    description,
    keywords,
    image,
    url,
    type
  };
};