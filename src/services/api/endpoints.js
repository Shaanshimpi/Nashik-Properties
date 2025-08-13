export const API_BASE_URL = import.meta.env.VITE_WP_API_BASE_URL || 'https://nashikproperties-server.firefist.co.in/wp-json';

export const ENDPOINTS = {
  // Posts
  POSTS: '/wp/v2/posts',
  POST_BY_ID: (id) => `/wp/v2/posts/${id}`,
  
  // Taxonomies
  AMENITIES: '/wp/v2/amenity',
  PROPERTY_TYPES: '/wp/v2/propertytype',
  LOCATIONS: '/wp/v2/location',
  
  // Custom queries
  POSTS_WITH_TAXONOMIES: '/wp/v2/posts?_embed=wp:term',
  POSTS_BY_TYPE: (type) => `/wp/v2/posts?propertytype=${type}`,
  POSTS_BY_LOCATION: (location) => `/wp/v2/posts?location=${location}`,
  POSTS_BY_AMENITY: (amenity) => `/wp/v2/posts?amenity=${amenity}`,
  
  // Search and filter endpoints
  SEARCH_POSTS: '/wp/v2/posts?search=',
  POSTS_BY_MULTIPLE_FILTERS: '/wp/v2/posts',
};

export const WP_SITE_URL = import.meta.env.VITE_WP_SITE_URL || 'https://nashikproperties-server.firefist.co.in';

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  retries: 3,
  retryDelay: 1000,
};