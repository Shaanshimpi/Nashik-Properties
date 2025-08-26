import axios from 'axios';
import { WC_API_BASE_URL, WC_ENDPOINTS, WC_API_CONFIG } from './woocommerceEndpoints';

const wcApiClient = axios.create({
  baseURL: WC_API_BASE_URL,
  timeout: WC_API_CONFIG.timeout,
  params: {
    consumer_key: WC_API_CONFIG.consumer_key,
    consumer_secret: WC_API_CONFIG.consumer_secret,
  },
});

// Request interceptor
wcApiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('WC API Request:', config);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
wcApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('WC API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetches variations for a product
 * @param {number} productId - Product ID
 * @returns {Promise<Array>} Array of variations
 */
export const getProductVariations = async (productId) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCT_VARIATIONS(productId));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch variations for product ${productId}:`, error);
    return [];
  }
};

/**
 * Calculates price range from variations
 * @param {Array} variations - Array of variation objects
 * @returns {Object} Price range with min and max prices
 */
export const calculatePriceRange = (variations) => {
  if (!variations || variations.length === 0) {
    return { min: 0, max: 0, formatted: 'Price on request' };
  }

  const prices = variations
    .map(variation => parseFloat(variation.price))
    .filter(price => !isNaN(price) && price > 0);

  if (prices.length === 0) {
    return { min: 0, max: 0, formatted: 'Price on request' };
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  
  return {
    min,
    max,
    formatted: min === max 
      ? `₹${min.toLocaleString('en-IN')}` 
      : `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`
  };
};

/**
 * Extracts configuration options from product attributes
 * @param {Object} product - Product object
 * @returns {Array} Array of configuration options
 */
export const extractConfigurationOptions = (product) => {
  if (!product.attributes || product.attributes.length === 0) {
    return [];
  }

  const flatTypeAttribute = product.attributes.find(attr => 
    attr.name.toLowerCase().includes('flat') || 
    attr.name.toLowerCase().includes('type') ||
    attr.name.toLowerCase().includes('bhk')
  );

  return flatTypeAttribute?.options || [];
};

/**
 * Formats variation data
 * @param {Object} variation - Raw variation object
 * @returns {Object} Formatted variation
 */
export const formatVariation = (variation) => {
  if (!variation) return null;

  return {
    id: variation.id,
    name: variation.name || '',
    description: variation.description || '',
    sku: variation.sku || '',
    price: parseFloat(variation.price) || 0,
    regular_price: parseFloat(variation.regular_price) || 0,
    sale_price: parseFloat(variation.sale_price) || 0,
    on_sale: variation.on_sale || false,
    image: variation.image || null, // Make sure this is included
    attributes: variation.attributes || [],
    meta_data: variation.meta_data || [],
    stock_status: variation.stock_status || 'instock',
    purchasable: variation.purchasable !== false,
    date_created: variation.date_created,
    date_modified: variation.date_modified,
    formatted_price: variation.price ? `₹${parseFloat(variation.price).toLocaleString('en-IN')}` : 'Price on request'
  };
};

/**
 * Formats WooCommerce product data into a consistent structure
 * @param {Object} product - Raw WooCommerce product object
 * @param {Array} [variations] - Array of variations for the product (optional)
 * @returns {Object} Formatted product object
 */
export const formatProduct = (product, variations = []) => {
  if (!product) return null;

  // Ensure variations is always an array
  const variationsArray = Array.isArray(variations) ? variations : [];
  
  const priceRange = calculatePriceRange(variationsArray);
  const configurationOptions = extractConfigurationOptions(product);
  const formattedVariations = variationsArray.map(formatVariation).filter(v => v !== null);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    permalink: product.permalink,
    type: product.type,
    status: product.status,
    featured: product.featured || false,
    description: product.description || '',
    short_description: product.short_description || '',
    price: parseFloat(product.price) || 0,
    regular_price: parseFloat(product.regular_price) || 0,
    sale_price: parseFloat(product.sale_price) || 0,
    on_sale: product.on_sale || false,
    images: product.images || [],
    attributes: product.attributes || [],
    variations: formattedVariations,
    categories: product.categories || [],
    brands: product.brands || [],
    tags: product.tags || [],
    meta_data: product.meta_data || [],
    date_created: product.date_created,
    date_modified: product.date_modified,
    stock_status: product.stock_status || 'instock',
    purchasable: product.purchasable !== false,
    
    // Calculated fields
    price_range: priceRange,
    has_price_range: priceRange.min !== priceRange.max && priceRange.min > 0 && priceRange.max > 0,
    display_price: priceRange.formatted,
    configuration_options: configurationOptions,
    variation_count: formattedVariations.length,
    has_variations: formattedVariations.length > 0
  };
};
/**
 * Fetches a product with its variations (getProductWithVariations)
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object with variations
 */
export const getProductWithVariations = async (id) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCT_BY_ID(id));
    const product = response.data;
    
    let variations = [];
    if (product.type === 'variable') {
      variations = await getProductVariations(id);
    }

    return formatProduct(product, variations);
  } catch (error) {
    console.error(`Failed to fetch product with variations ${id}:`, error);
    throw new Error(`Failed to fetch product with variations ${id}: ${error.message}`);
  }
};

/**
 * Fetches all products (projects) with their variations
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of products with variations
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCTS, { params });
    const products = response.data;

    // Fetch variations for each product in parallel with rate limiting
    const productsWithVariations = await Promise.all(
      products.map(async (product, index) => {
        // Add small delay to avoid rate limiting
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (product.type === 'variable') {
          try {
            const variations = await getProductVariations(product.id);
            return formatProduct(product, variations);
          } catch (error) {
            console.error(`Failed to get variations for product ${product.id}:`, error);
            return formatProduct(product, []);
          }
        }
        return formatProduct(product);
      })
    );

    return productsWithVariations.filter(product => product !== null);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

/**
 * Fetches a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCT_BY_ID(id));
    const product = response.data;
    return formatProduct(product);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}: ${error.message}`);
  }
};

/**
 * Fetches featured products with variations
 * @param {number} [limit=6] - Number of products to fetch
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedProducts = async (limit = 6) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.FEATURED_PRODUCTS, {
      params: { per_page: limit }
    });
    const products = response.data;

    // Fetch variations for variable products with rate limiting
    const productsWithVariations = await Promise.all(
      products.map(async (product, index) => {
        // Add small delay to avoid rate limiting
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (product.type === 'variable') {
          try {
            const variations = await getProductVariations(product.id);
            return formatProduct(product, variations);
          } catch (error) {
            console.error(`Failed to get variations for featured product ${product.id}:`, error);
            return formatProduct(product, []);
          }
        }
        return formatProduct(product);
      })
    );

    return productsWithVariations.filter(product => product !== null);
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    throw new Error(`Failed to fetch featured products: ${error.message}`);
  }
};

/**
 * Fetches products by category
 * @param {number} categoryId - Category ID
 * @param {Object} [params] - Additional parameters
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (categoryId, params = {}) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId), {
      params: { ...params, per_page: params.per_page || 12 }
    });
    const products = response.data;

    // Fetch variations for variable products
    const productsWithVariations = await Promise.all(
      products.map(async (product, index) => {
        // Add small delay to avoid rate limiting
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (product.type === 'variable') {
          try {
            const variations = await getProductVariations(product.id);
            return formatProduct(product, variations);
          } catch (error) {
            console.error(`Failed to get variations for category product ${product.id}:`, error);
            return formatProduct(product, []);
          }
        }
        return formatProduct(product);
      })
    );

    return productsWithVariations.filter(product => product !== null);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw new Error(`Failed to fetch products by category: ${error.message}`);
  }
};

/**
 * Fetches products by search term
 * @param {string} searchTerm - Search term
 * @param {Object} [params] - Additional parameters
 * @returns {Promise<Array>} Array of products
 */
export const searchProducts = async (searchTerm, params = {}) => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.PRODUCTS, {
      params: { ...params, search: searchTerm, per_page: params.per_page || 12 }
    });
    const products = response.data;

    // Fetch variations for variable products
    const productsWithVariations = await Promise.all(
      products.map(async (product, index) => {
        // Add small delay to avoid rate limiting
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (product.type === 'variable') {
          try {
            const variations = await getProductVariations(product.id);
            return formatProduct(product, variations);
          } catch (error) {
            console.error(`Failed to get variations for search product ${product.id}:`, error);
            return formatProduct(product, []);
          }
        }
        return formatProduct(product);
      })
    );

    return productsWithVariations.filter(product => product !== null);
  } catch (error) {
    console.error('Failed to search products:', error);
    throw new Error(`Failed to search products: ${error.message}`);
  }
};

/**
 * Fetches all categories
 * @returns {Promise<Array>} Array of categories
 */
export const getCategories = async () => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

/**
 * Fetches all brands
 * @returns {Promise<Array>} Array of brands
 */
export const getBrands = async () => {
  try {
    const response = await wcApiClient.get(WC_ENDPOINTS.BRANDS);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    throw new Error(`Failed to fetch brands: ${error.message}`);
  }
};

/**
 * Helper function to build query parameters for product filtering
 * @param {Object} filters - Filter parameters
 * @returns {Object} Query parameters
 */
export const buildProductQueryParams = (filters = {}) => {
  const params = {
    per_page: filters.per_page || 12,
    page: filters.page || 1,
    ...filters
  };

  // Remove undefined or empty values
  Object.keys(params).forEach(key => {
    if (params[key] === undefined || params[key] === null || params[key] === '') {
      delete params[key];
    }
  });

  return params;
};

/**
 * Gets the lowest price from variations
 * @param {Array} variations - Array of variations
 * @returns {number} Lowest price
 */
export const getLowestPrice = (variations) => {
  if (!variations || variations.length === 0) return 0;
  
  const prices = variations
    .map(v => parseFloat(v.price))
    .filter(price => !isNaN(price) && price > 0);
  
  return prices.length > 0 ? Math.min(...prices) : 0;
};

/**
 * Gets the highest price from variations
 * @param {Array} variations - Array of variations
 * @returns {number} Highest price
 */
export const getHighestPrice = (variations) => {
  if (!variations || variations.length === 0) return 0;
  
  const prices = variations
    .map(v => parseFloat(v.price))
    .filter(price => !isNaN(price) && price > 0);
  
  return prices.length > 0 ? Math.max(...prices) : 0;
};

/**
 * Gets formatted price range for display
 * @param {Array} variations - Array of variations
 * @returns {string} Formatted price range
 */
export const getFormattedPriceRange = (variations) => {
  const min = getLowestPrice(variations);
  const max = getHighestPrice(variations);
  
  if (min === 0 && max === 0) return 'Price on request';
  if (min === max) return `₹${min.toLocaleString('en-IN')}`;
  
  return `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
};

export default {
  getProducts,
  getProductById,
  getProductWithVariations, // Added this export
  getProductVariations,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getBrands,
  formatProduct,
  formatVariation,
  calculatePriceRange,
  extractConfigurationOptions,
  buildProductQueryParams,
  getLowestPrice,
  getHighestPrice,
  getFormattedPriceRange
};