import { useCallback, useEffect, useState } from 'react';
import { 
  getProducts, 
  getProductById, 
  getProductWithVariations, 
  getFeaturedProducts,
  getProductVariations
} from '../services/api/woocommerce';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const productsData = await getProducts(params);
      setProducts(productsData);
      return productsData;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const product = await getProductById(id);
      setCurrentProduct(product);
      return product;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductWithVariations = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const product = await getProductById(id);
      
      // If it's a variable product, fetch variations
      if (product && product.type === 'variable') {
        const variations = await getProductVariations(id);
        const productWithVariations = {
          ...product,
          variations: variations,
          price_range: calculatePriceRange(variations),
          has_price_range: variations.length > 1
        };
        setCurrentProduct(productWithVariations);
        return productWithVariations;
      }
      
      setCurrentProduct(product);
      return product;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedProducts = useCallback(async (limit = 6) => {
    try {
      setLoading(true);
      setError(null);
      
      const featuredProducts = await getFeaturedProducts(limit);
      setProducts(featuredProducts);
      return featuredProducts;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to calculate price range
  const calculatePriceRange = useCallback((variations) => {
    if (!variations || variations.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = variations
      .map(variation => parseFloat(variation.price))
      .filter(price => !isNaN(price) && price > 0);

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    products,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductWithVariations,
    fetchFeaturedProducts,
    calculatePriceRange,
    clearError
  };
};