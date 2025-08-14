import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ 
  property = {
    id: 0,
    title: '',
    price: 0,
    address: '',
    area: 0,
    images: [],
    featured: false,
    amenities: [],
    locations: [],
    propertyTypes: []
  }, 
  loading = false,
  showBadges = true
}) => {
  if (loading) {
    return (
      <article className="property-card property-card--loading">
        <div className="property-card__image skeleton"></div>
        <div className="property-card__content">
          <h3 className="skeleton"></h3>
          <p className="skeleton"></p>
          <div className="property-card__meta">
            <span className="skeleton"></span>
            <span className="skeleton"></span>
          </div>
          {showBadges && (
            <div className="property-card__badges">
              <span className="skeleton skeleton-badge"></span>
              <span className="skeleton skeleton-badge"></span>
            </div>
          )}
        </div>
      </article>
    );
  }

  const { 
    id, 
    title, 
    price, 
    address, 
    area, 
    images = [], 
    featured,
    amenities = [],
    locations = [],
    propertyTypes = []
  } = property;

  const getFirstImage = () => {
    if (!images || images.length === 0) return '';
    const firstImg = images[0];
    return typeof firstImg === 'string' 
      ? firstImg 
      : firstImg.url || firstImg.full_image_url || firstImg.src || '';
  };

  const firstImage = getFirstImage();
  const primaryLocation = locations[0]?.name || '';
  const primaryType = propertyTypes[0]?.name || '';

  return (
    <article className="property-card">
      <Link to={`/property/${id}`} className="property-card__link">
        <div className="property-card__image">
          {firstImage ? (
            <img 
              src={firstImage} 
              alt={title} 
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; 
                //e.target.src = '/placeholder-property.jpg';
              }}
            />
          ) : (
            <div className="property-card__image-placeholder">
              <span>No Image Available</span>
            </div>
          )}
          {featured && (
            <span className="property-card__featured-badge">Featured</span>
          )}
        </div>
        <div className="property-card__content">
          <h3 className="property-card__title">{title}</h3>
          <div className="property-card__address">{address}</div>
          <div className="property-card__meta">
            <span className="property-card__price">
              ₹{price?.toLocaleString('en-IN') || 'Price on request'}
            </span>
            {area && <span className="property-card__area">{area} sq ft</span>}
          </div>
          
          {showBadges && (primaryLocation || primaryType) && (
            <div className="property-card__badges">
              {primaryLocation && (
                <span className="property-card__location-badge">
                  {primaryLocation}
                </span>
              )}
              {primaryType && (
                <span className="property-card__type-badge">
                  {primaryType}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    address: PropTypes.string,
    area: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          url: PropTypes.string,
          full_image_url: PropTypes.string,
          src: PropTypes.string
        })
      ])
    ),
    featured: PropTypes.bool,
    amenities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      taxonomy: PropTypes.string
    })),
    locations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      taxonomy: PropTypes.string
    })),
    propertyTypes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      taxonomy: PropTypes.string
    }))
  }),
  loading: PropTypes.bool,
  showBadges: PropTypes.bool
};

export default PropertyCard;