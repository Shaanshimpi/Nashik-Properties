import { useState, useEffect } from 'react';
import { apiClient } from '../services/api/apiClient';
import { ENDPOINTS } from '../services/api/endpoints';

export const useTaxonomies = () => {
  const [taxonomies, setTaxonomies] = useState({
    amenities: [],
    propertyTypes: [],
    locations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        setLoading(true);
        
        const [amenitiesData, propertyTypesData, locationsData] = await Promise.all([
          apiClient.get(ENDPOINTS.AMENITIES),
          apiClient.get(ENDPOINTS.PROPERTY_TYPES),
          apiClient.get(ENDPOINTS.LOCATIONS)
        ]);

        setTaxonomies({
          amenities: amenitiesData,
          propertyTypes: propertyTypesData,
          locations: locationsData
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxonomies();
  }, []);

  return { taxonomies, loading, error };
};