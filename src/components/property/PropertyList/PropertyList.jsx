import React from 'react';
import PropTypes from 'prop-types';
import PropertyCard from '../PropertyCard/PropertyCard';
import Button from '../../ui/Button/Button';
import Spinner from '../../common/Loading/Spinner';
import './PropertyList.css';

const PropertyList = ({
  properties = [],
  loading = false,
  error = null,
  hasMore = false,
  onLoadMore = () => {},
  emptyMessage = 'No properties found',
  showLoadMore = true,
  className = ''
}) => {
  const normalizedEmptyMessage = typeof emptyMessage === 'string' 
    ? emptyMessage 
    : 'No properties found';

  if (error) {
    return (
      <div className={`property-list property-list--error ${className}`}>
        <div className="property-list__error">
          <h3>Error Loading Properties</h3>
          <div className="property-list__error-message">
            {typeof error === 'string' ? error : 'Failed to load properties'}
          </div>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  if (!loading && properties.length === 0) {
    return (
      <div className={`property-list property-list--empty ${className}`}>
        <div className="property-list__empty">
          <h3>No Properties Available</h3>
          <div className="property-list__empty-message">
            {normalizedEmptyMessage}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`property-list ${className}`}>
      <div className="property-list__grid">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={{
              ...property,
              images: Array.isArray(property.images) ? property.images : []
            }} 
          />
        ))}
        
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <PropertyCard key={`skeleton-${i}`} loading />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="property-list__load-more">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number,
      address: PropTypes.string,
      area: PropTypes.number,
      images: PropTypes.array,
      featured: PropTypes.bool
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  hasMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  showLoadMore: PropTypes.bool,
  className: PropTypes.string
};

export default PropertyList;