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
    featured: false
  }, 
  loading = false 
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
        </div>
      </article>
    );
  }

  const { id, title, price, address, area, images, featured } = property;
  const firstImage = images?.[0] || '';

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
                e.target.src = '/placeholder-property.jpg';
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
          <h3>{title}</h3>
          <p className="property-card__address">{address}</p>
          <div className="property-card__meta">
            <span>₹{price?.toLocaleString('en-IN') || 'Price on request'}</span>
            {area && <span>{area} sq ft</span>}
          </div>
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
    images: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool
  }),
  loading: PropTypes.bool
};

export default PropertyCard;