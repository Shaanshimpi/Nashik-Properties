// src/utils/helpers/urlGenerator.js
import { slugify } from '../formatters/text';
import { optimizeImageUrl } from './imageOptimizer';

export const generatePropertyUrl = (property) => {
  if (!property || !property.id) return '/properties';
  
  const slug = property.title?.rendered 
    ? slugify(property.title.rendered)
    : 'property';
    
  return `/property/${property.id}/${slug}`;
};

export const generateSearchUrl = (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '' && (!Array.isArray(value) || value.length > 0)) {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    }
  });
  
  const queryString = params.toString();
  return `/properties${queryString ? `?${queryString}` : ''}`;
};

export const generateImageUrl = (baseUrl, size = 'medium') => {
  if (!baseUrl) return '';
  
  const sizeMap = {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1600
  };
  
  const width = sizeMap[size] || 600;
  return optimizeImageUrl(baseUrl, width);
};

