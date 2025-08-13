export const API_BASE_URL = import.meta.env.VITE_WP_API_BASE_URL || 'https://nashikproperties-server.firefist.co.in/wp-json';

export const API_ENDPOINTS = {
  POSTS: '/wp/v2/posts',
  POST_BY_ID: (id) => `/wp/v2/posts/${id}`,
  AMENITIES: '/wp/v2/amenity',
  PROPERTY_TYPES: '/wp/v2/propertytype',
  LOCATIONS: '/wp/v2/location',
  POSTS_WITH_TAXONOMIES: '/wp/v2/posts?_embed=wp:term',
  POSTS_BY_TYPE: (type) => `/wp/v2/posts?propertytype=${type}`,
  POSTS_BY_LOCATION: (location) => `/wp/v2/posts?location=${location}`,
  POSTS_BY_AMENITY: (amenity) => `/wp/v2/posts?amenity=${amenity}`,
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 300000, // 5 minutes
};