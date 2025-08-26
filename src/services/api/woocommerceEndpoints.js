export const WC_API_BASE_URL = import.meta.env.VITE_WP_SITE_URL || 'https://nashikproperties-server.firefist.co.in/wp-json/wc/v3';

export const WC_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_VARIATIONS: (id) => `/products/${id}/variations`,
  
  // Categories
  CATEGORIES: '/products/categories',
  BRANDS: '/products/brands',
  
  // Custom queries
  FEATURED_PRODUCTS: '/products?featured=true',
  PRODUCTS_BY_CATEGORY: (categoryId) => `/products?category=${categoryId}`,
  PRODUCTS_BY_BRAND: (brandId) => `/products?brand=${brandId}`,
};

export const WC_API_CONFIG = {
  consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY || "ck_20644a7e3744011b317c9f2ba6172feb3e5a923a",
  consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET || "cs_1cae1101acea3777a9928f464d3ffd1f16f8a1ed",
  timeout: 10000,
};