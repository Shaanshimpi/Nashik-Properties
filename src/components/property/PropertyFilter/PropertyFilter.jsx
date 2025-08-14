import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import './PropertyFilter.css';
import { usePropertyContext } from '../../../context/PropertyContext';

const PropertyFilter = ({ 
  onFilterChange,
  initialFilters = {}
}) => {
  const { taxonomies } = usePropertyContext();
  const [filters, setFilters] = useState({
    propertyType: '',
    location: '',
    amenities: [],
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenityId) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleReset = () => {
    setFilters({
      propertyType: '',
      location: '',
      amenities: [],
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <div className="property-filter">
      <div className="property-filter__header">
        <h3 className="property-filter__title">Filter Properties</h3>
        <div className="property-filter__actions">
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="property-filter__toggle"
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
        </div>
      </div>

      <div className="property-filter__basic">
        <div className="property-filter__row">
          <div className="property-filter__field">
            <label className="property-filter__label">Property Type</label>
            <select
              className="property-filter__select"
              value={filters.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
            >
              <option value="">All Types</option>
              {taxonomies.propertyTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="property-filter__field">
            <label className="property-filter__label">Location</label>
            <select
              className="property-filter__select"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {taxonomies.locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="property-filter__row">
          <div className="property-filter__field">
            <label className="property-filter__label">Price Range</label>
            <div className="property-filter__range">
              <Input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
              />
              <span className="property-filter__separator">to</span>
              <Input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="property-filter__advanced">
          <div className="property-filter__row">
            <div className="property-filter__field">
              <label className="property-filter__label">Area (sq ft)</label>
              <div className="property-filter__range">
                <Input
                  type="number"
                  placeholder="Min Area"
                  value={filters.minArea}
                  onChange={(e) => handleInputChange('minArea', e.target.value)}
                />
                <span className="property-filter__separator">to</span>
                <Input
                  type="number"
                  placeholder="Max Area"
                  value={filters.maxArea}
                  onChange={(e) => handleInputChange('maxArea', e.target.value)}
                />
              </div>
            </div>
          </div>

          {taxonomies.amenities.length > 0 && (
            <div className="property-filter__field">
              <label className="property-filter__label">Amenities</label>
              <div className="property-filter__amenities">
                {taxonomies.amenities.map(amenity => (
                  <label 
                    key={amenity.id} 
                    className="property-filter__checkbox-label"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      className="property-filter__checkbox"
                    />
                    <span className="property-filter__checkbox-text">
                      {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyFilter;