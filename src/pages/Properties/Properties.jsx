import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyList from '../../components/property/PropertyList/PropertyList';
import PropertySearch from '../../components/property/PropertySearch/PropertySearch';
import PropertyFilter from '../../components/property/PropertyFilter/PropertyFilter';
import MetaTags from '../../components/common/SEO/MetaTags';
import { OrganizationStructuredData, BreadcrumbStructuredData } from '../../components/common/SEO/StructuredData';
import { useProperties } from '../../hooks/useProperties';
import Spinner from '../../components/common/Loading/Spinner';
import './Properties.css';
import Layout from '../../components/common/Layout/Layout';
import { formatProperty } from '../../services/api/wordpress';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    amenities: [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: '',
    maxArea: ''
  });

  const { 
    properties, 
    propertyTypes, 
    locations, 
    amenities, 
    isLoading, 
    error 
  } = useProperties();

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (filters.propertyType) params.set('type', filters.propertyType);
    if (filters.location) params.set('location', filters.location);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    
    setSearchParams(params);
  }, [searchTerm, filters, setSearchParams]);

  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter(property => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = property.title?.rendered?.toLowerCase().includes(searchLower);
        const descriptionMatch = property.acf?.description?.toLowerCase().includes(searchLower);
        const addressMatch = property.acf?.address?.toLowerCase().includes(searchLower);
        
        if (!titleMatch && !descriptionMatch && !addressMatch) {
          return false;
        }
      }

      // Property type filter
      if (filters.propertyType) {
        const propertyTypeIds = property._embedded?.['wp:term']?.[1]?.map(t => t.id.toString()) || [];
        if (!propertyTypeIds.includes(filters.propertyType)) {
          return false;
        }
      }

      // Location filter
      if (filters.location) {
        const locationIds = property._embedded?.['wp:term']?.[2]?.map(t => t.id.toString()) || [];
        if (!locationIds.includes(filters.location)) {
          return false;
        }
      }

      // Price filters
      const price = property.acf?.price || 0;
      if (filters.minPrice && price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && price > parseInt(filters.maxPrice)) {
        return false;
      }

      // Area filters
      const area = property.acf?.area || 0;
      if (filters.minArea && area < parseInt(filters.minArea)) {
        return false;
      }
      if (filters.maxArea && area > parseInt(filters.maxArea)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const propertyAmenityIds = property._embedded?.['wp:term']?.[0]?.map(t => t.id) || [];
        const hasAllAmenities = filters.amenities.every(amenityId => 
          propertyAmenityIds.includes(parseInt(amenityId))
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [properties, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/properties' }
  ];

  const pageTitle = `Properties${searchTerm ? ` - ${searchTerm}` : ''} | ${import.meta.env.VITE_SITE_NAME}`;
  const pageDescription = `Browse ${filteredProperties.length} premium properties. Find your perfect home with our advanced search and filtering options.`;

  if (error) {
    return (
      <div className="properties-page">
        <div className="properties-page__error">
          <h1>Error Loading Properties</h1>
          <p>We're having trouble loading properties. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords="real estate, properties, homes for sale, property listings"
        url={`${import.meta.env.VITE_SITE_URL}/properties`}
      />
      <OrganizationStructuredData />
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

      <div className="properties-page">
        <div className="properties-page__header">
          <div className="properties-page__title-section">
            <h1 className="properties-page__title">Properties</h1>
            <p className="properties-page__subtitle">
              Discover your perfect home from our curated selection of premium properties
            </p>
          </div>

          <PropertySearch
            onSearch={handleSearch}
            isLoading={isLoading}
            className="properties-page__search"
          />
        </div>

        <div className="properties-page__content">
          <aside className="properties-page__sidebar">
            <PropertyFilter
              onFilterChange={handleFilterChange}
              propertyTypes={propertyTypes}
              locations={locations}
              amenities={amenities}
              initialFilters={filters}
            />
          </aside>

          <main className="properties-page__main">
            <div className="properties-page__results-header">
              <div className="properties-page__results-count">
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <span>
                    {filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'} found
                  </span>
                )}
              </div>
            </div>

            <PropertyList
              properties={filteredProperties.map(property => formatProperty(property))}
              isLoading={isLoading}
              emptyMessage={
                searchTerm || Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== '')
                  ? "No properties match your search criteria. Try adjusting your filters."
                  : "No properties available at the moment."
              }
            />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;