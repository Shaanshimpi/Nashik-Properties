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
  if (error) {
    return (
      <div className={`property-list property-list--error ${className}`}>
        <div className="property-list__error">
          <h3>Error Loading Properties</h3>
          <p>{error}</p>
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
          <p>{emptyMessage}</p>
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
            property={property} 
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
      images: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  hasMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  emptyMessage: PropTypes.string,
  showLoadMore: PropTypes.bool,
  className: PropTypes.string
};

export default PropertyList;