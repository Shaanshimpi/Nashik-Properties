import { useCallback, useEffect } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { getProperties, getPropertyById } from '../services/api/wordpress';

export const useProperties = () => {
  const {
    properties,
    filters,
    loading,
    error,
    pagination,
    taxonomies,
    setLoading,
    setError,
    setProperties,
    appendProperties,
    setPagination,
    setTaxonomies,
    clearError
  } = usePropertyContext();

  const formatPropertyData = useCallback((property) => {
    if (!property) return null;
    
    const terms = property._embedded?.['wp:term'] || [];
    const allTerms = terms.flat();
    
    return {
      id: property.id,
      title: property.title?.rendered || property.title || 'Untitled Property',
      description: property.acf?.description || '',
      price: property.acf?.price || 0,
      address: property.acf?.address || '',
      area: property.acf?.area || 0,
      images: property.acf?.photo_gallery?.images?.flat() || [],
      amenities: allTerms.filter(term => term.taxonomy === 'amenity'),
      propertyTypes: allTerms.filter(term => term.taxonomy === 'property-type'),
      locations: allTerms.filter(term => term.taxonomy === 'location'),
      slug: property.slug,
      link: property.link,
      date: property.date,
      featured: property.acf?.featured || allTerms.some(term => term.slug === 'featured') || false,
      acf: property.acf || {}
    };
  }, []);

  const buildTaxonomyParams = useCallback((filters) => {
    const params = {};
    
    if (filters.location) {
      params['location'] = filters.location;
    }

    if (filters.amenity) {
      params['amenity'] = filters.amenity;
    }

    if (filters.propertyType) {
      params['propertytype'] = filters.propertyType;
    }

    return params;
  }, []);

  const fetchProperties = useCallback(async (params = {}, append = false) => {
    try {
      setLoading(true);
      clearError();

      const baseParams = {
        _embed: 'wp:term',
        per_page: params.per_page || pagination.itemsPerPage,
        page: params.page || 1
      };

      const taxonomyParams = buildTaxonomyParams(params);
      const { search, minPrice, maxPrice, ...restParams } = params;
      
      const finalParams = {
        ...baseParams,
        search,
        min_price: minPrice,
        max_price: maxPrice,
        ...restParams,
        ...taxonomyParams
      };

      // Clean up empty params
      Object.keys(finalParams).forEach(key => {
        if (finalParams[key] === undefined || finalParams[key] === null || finalParams[key] === '') {
          delete finalParams[key];
        }
      });

      // Get raw properties array from API
      const properties = await getProperties(finalParams);
      
      // Format the properties
      const formattedData = properties.map(formatPropertyData).filter(Boolean);
      
      // Update state
      append ? appendProperties(formattedData) : setProperties(formattedData);
      
      return formattedData;
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setError(err.message || 'Failed to load properties');
      return [];
    } finally {
      setLoading(false);
    }
  }, [pagination.itemsPerPage, setLoading, setError, setProperties, appendProperties, clearError, buildTaxonomyParams, formatPropertyData]);

  const fetchFeaturedProperties = useCallback(async (count = 6) => {
    try {
      setLoading(true);
      clearError();

      const properties = await getProperties({ 
        per_page: count,
        featured: true,
        _embed: 'wp:term',
        orderby: 'date',
        order: 'desc'
      });

      const formattedData = properties.map(formatPropertyData).filter(Boolean);
      setProperties(formattedData);
      return formattedData;
    } catch (err) {
      console.error('Failed to fetch featured properties:', err);
      setError(err.message || 'Failed to load featured properties');
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setProperties, clearError, formatPropertyData]);

  const fetchPropertyById = useCallback(async (id) => {
    try {
      setLoading(true);
      clearError();

      const property = await getPropertyById(id);
      if (!property) {
        throw new Error('Property not found');
      }

      const formattedProperty = formatPropertyData(property);
      return formattedProperty;
    } catch (err) {
      console.error(`Failed to fetch property ${id}:`, err);
      setError(err.message || 'Failed to load property');
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, clearError, formatPropertyData]);

  const searchProperties = useCallback(async (searchQuery) => {
    return fetchProperties({
      search: searchQuery,
      page: 1
    });
  }, [fetchProperties]);

  // Initial load
  useEffect(() => {
    fetchProperties(filters);
  }, [filters, fetchProperties]);

  return {
    properties,
    loading,
    error,
    pagination,
    taxonomies,
    fetchProperties,
    fetchFeaturedProperties,
    fetchPropertyById,
    searchProperties,
    hasMore: pagination.currentPage < pagination.totalPages,
    isEmpty: properties.length === 0 && !loading
  };
};