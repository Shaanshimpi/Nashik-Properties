import axios from 'axios';
import { ENDPOINTS, API_BASE_URL } from './endpoints.js';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('API Request:', config);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Extracts taxonomy terms from a WordPress post
 * @param {Object} post - WordPress post object
 * @returns {Object} Organized taxonomy terms
 */
export const extractTaxonomies = (post) => {
  if (!post._embedded || !post._embedded['wp:term']) {
    return { amenities: [], propertyTypes: [], locations: [] };
  }

  const terms = post._embedded['wp:term'];
  
  // The API response shows:
  // Index 0: categories
  // Index 1: tags
  // Index 2: amenities
  // Index 3: locations
  // Index 4: property types
  return {
    amenities: terms[2] || [],
    locations: terms[3] || [],
    propertyTypes: terms[4] || []
  };
};

/**
 * Normalizes the image data from the API response
 * @param {Array|Object} images - Raw image data from API
 * @returns {string[]} Array of image URLs
 */
const normalizeImages = (images) => {
  if (!images) return [];
  
  // If images is an array of arrays (from photo_gallery.images)
  if (Array.isArray(images) && images.length > 0 && Array.isArray(images[0])) {
    return images[0].map(img => {
      if (typeof img === 'object') {
        return img.full_image_url || img.url || img.src || '';
      }
      return img;
    }).filter(url => url !== '');
  }
  
  // If images is a single featured media ID
  if (typeof images === 'number' && images > 0) {
    return [`${API_BASE_URL}/wp-json/wp/v2/media/${images}`];
  }
  
  return [];
};

/**
 * Formats raw WordPress property data into a consistent structure
 * @param {Object} property - Raw WordPress property object
 * @returns {Object} Formatted property object
 */
export const formatProperty = (property) => {
  if (!property) return null;
  
  const taxonomies = extractTaxonomies(property);
  if (!property) return null;
  
  // Safely access title with multiple fallbacks
  const title = property.title?.rendered || property.title || 'Untitled Property';
  
  // Debug logs
  console.log('Processing property:', property.id, title);
  
  return {
    id: property.id,
    title: title,
    description: property.acf?.description || property.excerpt?.rendered || '',
    price: property.acf?.price || 0,
    address: property.acf?.address || '',
    area: property.acf?.area || 0,
    images: normalizeImages(property.acf?.photo_gallery?.images || property.featured_media),
    content: property.content?.rendered || '',
    excerpt: property.excerpt?.rendered || '',
    date: property.date,
    modified: property.modified,
    slug: property.slug,
    link: property.link,
    featured: property.acf?.featured || false,
    ...taxonomies,
    acf: property.acf || {}
  };
};

/**
 * Fetches all properties with embedded taxonomies
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of properties
 */
export const getProperties = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => 
        value !== '' && value !== null && value !== undefined
      )
    );

    // Convert taxonomy IDs to numbers
    if (cleanParams.location) cleanParams.location = Number(cleanParams.location);
    if (cleanParams.propertytype) cleanParams.propertytype = Number(cleanParams.propertytype);
    if (cleanParams.amenity) cleanParams.amenity = Number(cleanParams.amenity);

    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      per_page: cleanParams.per_page || 10,
      page: cleanParams.page || 1,
      ...cleanParams
    });

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return response.data.map(formatProperty).filter(property => property !== null);
  } catch (error) {
    console.error('API Error Details:', error.response?.data);
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }
};

/**
 * Fetches a single property by ID with embedded taxonomies
 * @param {number} id - Property ID
 * @returns {Promise<Object>} Property object
 */
export const getPropertyById = async (id) => {
  try {
    const response = await apiClient.get(`${ENDPOINTS.POST_BY_ID(id)}?_embed=wp:term`);
    const formattedProperty = formatProperty(response.data);
    
    // Return a consistent response structure
    return {
      success: true,
      data: formattedProperty,
      status: response.status
    };
  } catch (error) {
    console.error(`Failed to fetch property ${id}:`, error);
    
    // Return a consistent error structure
    return {
      success: false,
      error: error.message || `Failed to fetch property ${id}`,
      status: error.response?.status || 500
    };
  }
};

/**
 * Fetches all amenities
 * @returns {Promise<Object[]>} Array of amenities
 */
export const getAmenities = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.AMENITIES);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch amenities: ${error.message}`);
  }
};

/**
 * Fetches all property types
 * @returns {Promise<Object[]>} Array of property types
 */
export const getPropertyTypes = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROPERTY_TYPES);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch property types: ${error.message}`);
  }
};

/**
 * Fetches all locations
 * @returns {Promise<Object[]>} Array of locations
 */
export const getLocations = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.LOCATIONS);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch locations: ${error.message}`);
  }
};

/**
 * Fetches properties filtered by type
 * @param {number} typeId - Property type ID
 * @param {Object} [params] - Additional parameters
 * @returns {Promise<Property[]>} Filtered properties
 */
export const getPropertiesByType = async (typeId, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      propertytype: typeId,
      per_page: params.per_page || 10,
      page: params.page || 1,
      ...params
    });

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch properties by type: ${error.message}`);
  }
};

/**
 * Fetches properties filtered by location
 * @param {number} locationId - Location ID
 * @param {Object} [params] - Additional parameters
 * @returns {Promise<Property[]>} Filtered properties
 */
export const getPropertiesByLocation = async (locationId, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      location: locationId,
      per_page: params.per_page || 10,
      page: params.page || 1,
      ...params
    });

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch properties by location: ${error.message}`);
  }
};

/**
 * Fetches properties filtered by amenity
 * @param {number} amenityId - Amenity ID
 * @param {Object} [params] - Additional parameters
 * @returns {Promise<Property[]>} Filtered properties
 */
export const getPropertiesByAmenity = async (amenityId, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      amenity: amenityId,
      per_page: params.per_page || 10,
      page: params.page || 1,
      ...params
    });

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch properties by amenity: ${error.message}`);
  }
};

/**
 * Fetches properties with multiple filters
 * @param {Object} filters - Filter parameters
 * @param {string} [filters.search] - Search term
 * @param {number} [filters.propertytype] - Property type ID
 * @param {number} [filters.location] - Location ID
 * @param {number} [filters.amenity] - Amenity ID
 * @param {number} [filters.min_price] - Minimum price
 * @param {number} [filters.max_price] - Maximum price
 * @param {number} [filters.per_page=10] - Items per page
 * @param {number} [filters.page=1] - Page number
 * @returns {Promise<Property[]>} Filtered properties
 */
export const getPropertiesByFilters = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      per_page: filters.per_page || 10,
      page: filters.page || 1,
    });

    // Add taxonomy filters
    ['propertytype', 'location', 'amenity'].forEach(key => {
      if (filters[key]) queryParams.append(key, filters[key]);
    });

    // Add search term
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    // Add custom fields filters
    if (filters.min_price) queryParams.append('min_price', filters.min_price);
    if (filters.max_price) queryParams.append('max_price', filters.max_price);

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search properties: ${error.message}`);
  }
};

/**
 * Fetches related properties
 * @param {Object} [params] - Query parameters
 * @param {number[]} [params.exclude] - IDs to exclude
 * @param {number} [params.per_page=4] - Items per page
//  * @returns {Promise<{success: boolean, data?: Property[], error?: string, status?: number}>} Result object
 */
export const getRelatedProperties = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      _embed: 'wp:term',
      per_page: params.per_page || 4,
      ...(params.exclude && { exclude: params.exclude.join(',') }),
      ...params
    });

    const response = await apiClient.get(`${ENDPOINTS.POSTS}?${queryParams}`);
    return {
      success: true,
      data: response.data,
      headers: response.headers
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status || 500
    };
  }
};

/**
 * Fetches featured properties with fallback to recent properties
 * @param {number} [count=6] - Number of properties to fetch
 * @returns {Promise<Property[]>} Array of properties
 */
export const getFeaturedProperties = async (count = 6) => {
  try {
    // Try to get featured properties first
    const featuredResponse = await getProperties({ 
      per_page: count,
      featured: true,
      _embed: 'wp:term'
    });

    if (featuredResponse?.length > 0) {
      return featuredResponse;
    }

    // Fallback to recent properties
    console.log('No featured properties found, falling back to recent properties');
    const recentResponse = await getProperties({ 
      per_page: count,
      orderby: 'date',
      order: 'desc',
      _embed: 'wp:term'
    });

    return recentResponse || [];
  } catch (error) {
     console.error('Error fetching featured properties:', error);
     return [];
   }
 };

// [Keep all your other API functions unchanged...]

export default {
  getProperties,
  getPropertyById,
  getAmenities,
  getPropertyTypes,
  getLocations,
  getPropertiesByType,
  getPropertiesByLocation,
  getPropertiesByAmenity,
  getPropertiesByFilters,
  getRelatedProperties,
  getFeaturedProperties,
  formatProperty,
  extractTaxonomies
};