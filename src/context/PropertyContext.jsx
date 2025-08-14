import React, { createContext, useContext, useReducer, useCallback } from 'react';

const initialState = {
  properties: [],
  currentProperty: null,
  filters: {
    propertyType: '',
    location: '',
    amenity: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  },
  taxonomies: {
    propertyTypes: [],
    locations: [],
    amenities: []
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  }
};

const actions = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_PROPERTIES: 'SET_PROPERTIES',
  APPEND_PROPERTIES: 'APPEND_PROPERTIES',
  SET_CURRENT_PROPERTY: 'SET_CURRENT_PROPERTY',
  SET_FILTERS: 'SET_FILTERS',
  SET_TAXONOMIES: 'SET_TAXONOMIES',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actions.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actions.SET_PROPERTIES:
      // Extract all unique taxonomies from the properties
      const allAmenities = new Map();
      const allLocations = new Map();
      const allPropertyTypes = new Map();

      action.payload.forEach(property => {
        // Use embedded terms if available, otherwise use direct properties
        const terms = property._embedded?.['wp:term'] || [];
        const allTerms = terms.flat();

        const amenities = allTerms.filter(term => term?.taxonomy === 'amenity') || property.amenities || [];
        const locations = allTerms.filter(term => term?.taxonomy === 'location') || property.locations || [];
        const propertyTypes = allTerms.filter(term => term?.taxonomy === 'propertytype') || property.propertyTypes || [];

        amenities.forEach(a => allAmenities.set(a.id, a));
        locations.forEach(l => allLocations.set(l.id, l));
        propertyTypes.forEach(p => allPropertyTypes.set(p.id, p));
      });

      return { 
        ...state, 
        properties: action.payload,
        taxonomies: {
          amenities: Array.from(allAmenities.values()),
          locations: Array.from(allLocations.values()),
          propertyTypes: Array.from(allPropertyTypes.values())
        },
        loading: false,
        error: null
      };
    
    case actions.APPEND_PROPERTIES:
      // Update taxonomies when appending new properties
      const newAmenities = new Map(state.taxonomies.amenities.map(a => [a.id, a]));
      const newLocations = new Map(state.taxonomies.locations.map(l => [l.id, l]));
      const newPropertyTypes = new Map(state.taxonomies.propertyTypes.map(p => [p.id, p]));

      action.payload.forEach(property => {
        property.amenities?.forEach(a => newAmenities.set(a.id, a));
        property.locations?.forEach(l => newLocations.set(l.id, l));
        property.propertyTypes?.forEach(p => newPropertyTypes.set(p.id, p));
      });

      return { 
        ...state, 
        properties: [...state.properties, ...action.payload],
        taxonomies: {
          amenities: Array.from(newAmenities.values()),
          locations: Array.from(newLocations.values()),
          propertyTypes: Array.from(newPropertyTypes.values())
        },
        loading: false 
      };
    
    case actions.SET_CURRENT_PROPERTY:
      return { ...state, currentProperty: action.payload };
    
    case actions.SET_FILTERS:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, currentPage: 1 }
      };
    
    case actions.SET_TAXONOMIES:
      return { 
        ...state, 
        taxonomies: { 
          ...state.taxonomies, 
          ...action.payload 
        } 
      };
    
    case actions.SET_PAGINATION:
      return { 
        ...state, 
        pagination: { 
          ...state.pagination, 
          ...action.payload 
        } 
      };
    
    default:
      return state;
  }
};

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback(
    (loading) => dispatch({ type: actions.SET_LOADING, payload: loading }),
    []
  );

  const setError = useCallback(
    (error) => dispatch({ type: actions.SET_ERROR, payload: error }),
    []
  );

  const setProperties = useCallback(
    (properties) => dispatch({ type: actions.SET_PROPERTIES, payload: properties }),
    []
  );

  const appendProperties = useCallback(
    (properties) => dispatch({ type: actions.APPEND_PROPERTIES, payload: properties }),
    []
  );

  const setCurrentProperty = useCallback(
    (property) => dispatch({ type: actions.SET_CURRENT_PROPERTY, payload: property }),
    []
  );

  const setFilters = useCallback(
    (filters) => dispatch({ type: actions.SET_FILTERS, payload: filters }),
    []
  );

  const setTaxonomies = useCallback(
    (taxonomies) => dispatch({ type: actions.SET_TAXONOMIES, payload: taxonomies }),
    []
  );

  const setPagination = useCallback(
    (pagination) => dispatch({ type: actions.SET_PAGINATION, payload: pagination }),
    []
  );

  const clearError = useCallback(
    () => dispatch({ type: actions.CLEAR_ERROR }),
    []
  );

  const value = {
    ...state,
    setLoading,
    setError,
    setProperties,
    appendProperties,
    setCurrentProperty,
    setFilters,
    setTaxonomies,
    setPagination,
    clearError
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};