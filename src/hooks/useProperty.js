import { useCallback, useEffect, useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { getPropertyById, getRelatedProperties } from '../services/api/wordpress';

export const useProperty = (propertyId) => {
  const {
    currentProperty,
    loading,
    error,
    setLoading,
    setError,
    setCurrentProperty,
    clearError
  } = usePropertyContext();

  const [relatedProperties, setRelatedProperties] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // Fetch single property by ID
  const fetchProperty = useCallback(async (id) => {
    if (!id) return null;

    try {
      setLoading(true);
      clearError();

      const response = await getPropertyById(id);

      if (response.success && response.data) {
        setCurrentProperty(response.data);
        return response.data;
      } else {
        throw new Error(response.error || 'Property not found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load property');
      setCurrentProperty(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setCurrentProperty, clearError]);

  // Fetch related properties
  const fetchRelatedProperties = useCallback(async (property, limit = 4) => {
    if (!property) return;

    try {
      setRelatedLoading(true);

      const propertyTypes = property._embedded?.['wp:term']?.[1] || [];
      const locations = property._embedded?.['wp:term']?.[2] || [];

      let params = {
        per_page: limit + 1,
        exclude: property.id,
        _embed: 'wp:term'
      };

      if (propertyTypes.length > 0) {
        params.propertytype = propertyTypes[0].id;
      } else if (locations.length > 0) {
        params.location = locations[0].id;
      }

      const response = await getRelatedProperties(params);

      if (response.success) {
        setRelatedProperties(response.data.filter(prop => prop.id !== property.id).slice(0, limit));
      }
    } catch (err) {
      console.error('Error fetching related properties:', err);
    } finally {
      setRelatedLoading(false);
    }
  }, []);

  // Auto-fetch property when ID changes
  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
    }

    return () => {
      setCurrentProperty(null);
    };
  }, [propertyId, fetchProperty, setCurrentProperty]);

  // Auto-fetch related properties when current property changes
  useEffect(() => {
    if (currentProperty) {
      fetchRelatedProperties(currentProperty);
    }
  }, [currentProperty, fetchRelatedProperties]);

  // Helper functions
  const getPropertyImages = useCallback((property) => {
    if (!property?.acf?.photo_gallery?.images) return [];
    return property.acf.photo_gallery.images.map(imageArray => ({
      full: imageArray[0]?.full_image_url || '',
      thumbnail: imageArray[0]?.thumbnail_image_url || '',
      alt: property.title?.rendered || 'Property image'
    }));
  }, []);

  const getPropertyTaxonomies = useCallback((property) => {
    if (!property?._embedded?.['wp:term']) {
      return { amenities: [], propertyTypes: [], locations: [] };
    }
    const terms = property._embedded['wp:term'];
    return {
      amenities: terms[0] || [],
      propertyTypes: terms[1] || [],
      locations: terms[2] || []
    };
  }, []);

  return {
    // Data
    property: currentProperty,
    relatedProperties,
    loading,
    relatedLoading,
    error,
    
    // Actions
    fetchProperty,
    fetchRelatedProperties,
    
    // Helper functions
    getPropertyImages,
    getPropertyTaxonomies,
    getPropertyPrice: (property) => property?.acf?.price || 0,
    getPropertyArea: (property) => property?.acf?.area || 0,
    getPropertyAddress: (property) => property?.acf?.address || '',
    getPropertyDescription: (property) => property?.acf?.description || property?.excerpt?.rendered || '',
    
    // State checks
    isLoaded: !!currentProperty && !loading,
    hasImages: currentProperty ? getPropertyImages(currentProperty).length > 0 : false,
    hasRelated: relatedProperties.length > 0
  };
};