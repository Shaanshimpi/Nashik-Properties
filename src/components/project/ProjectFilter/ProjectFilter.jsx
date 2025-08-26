import React, { useState, useEffect } from 'react';
import './ProjectFilter.css';

const ProjectFilter = ({ filters, onFilterChange, categories = [] }) => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  // Extract categories and locations from the categories array
  useEffect(() => {
    if (categories && categories.length > 0) {
      // Assuming categories have parent-child structure where locations might be sub-categories
      const mainCategories = categories.filter(cat => 
        !cat.slug.includes('location') && cat.parent === 0
      );
      
      const locationCategories = categories.filter(cat => 
        cat.slug.includes('location') || cat.name.toLowerCase().includes('nashik') || 
        cat.name.toLowerCase().includes('panchavati') // Add other location indicators
      );
      
      setAvailableCategories(mainCategories);
      setAvailableLocations(locationCategories);
    }
  }, [categories]);

  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    onFilterChange({ [field]: checked });
  };

  const handleSelectChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  return (
    <div className="project-filter">
      <h3 className="project-filter__title">Filter Projects</h3>
      
      <div className="project-filter__section">
        <label className="project-filter__label">Search</label>
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          className="project-filter__input"
        />
      </div>
      
      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div className="project-filter__section">
          <label className="project-filter__label">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleSelectChange('category', e.target.value)}
            className="project-filter__select"
          >
            <option value="">All Categories</option>
            {availableCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Location Filter */}
      {availableLocations.length > 0 && (
        <div className="project-filter__section">
          <label className="project-filter__label">Location</label>
          <select
            value={filters.location || ''}
            onChange={(e) => handleSelectChange('location', e.target.value)}
            className="project-filter__select"
          >
            <option value="">All Locations</option>
            {availableLocations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="project-filter__section">
        <label className="project-filter__checkbox">
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => handleCheckboxChange('featured', e.target.checked)}
          />
          <span className="project-filter__checkbox-label">Featured Only</span>
        </label>
      </div>
      
      <div className="project-filter__section">
        <button 
          className="project-filter__reset"
          onClick={() => onFilterChange({
            search: '',
            category: '',
            location: '',
            featured: false
          })}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProjectFilter;