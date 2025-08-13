// src/components/property/PropertySearch/PropertySearch.jsx
import React, { useState } from 'react';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import './PropertySearch.css';

const PropertySearch = ({ onSearch, isLoading = false, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`property-search ${className}`}>
      <form onSubmit={handleSubmit} className="property-search__form">
        <div className="property-search__input-group">
          <Input
            type="text"
            placeholder="Search properties by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="property-search__input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="property-search__clear"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="property-search__button"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  );
};

export default PropertySearch;