import React, { useState } from 'react';
import { formatCurrency } from '../../../utils/formatters/currency';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import PropertyGallery from '../PropertyGallery/PropertyGallery';
import Modal from '../../ui/Modal/Modal';
import './PropertyDetail.css';

const PropertyDetail = ({ property, onContactClick, onShareClick }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  if (!property) {
    return (
      <div className="property-detail property-detail--loading">
        <div className="property-detail__skeleton">
          <div className="skeleton skeleton--title"></div>
          <div className="skeleton skeleton--image"></div>
          <div className="skeleton skeleton--content"></div>
        </div>
      </div>
    );
  }

  const {
    title,
    acf = {},
    _embedded = {}
  } = property;

  const {
    description = '',
    price = 0,
    address = '',
    area = 0,
    photo_gallery = {}
  } = acf;

  // Extract embedded taxonomy terms
  const taxonomies = _embedded['wp:term'] || [];
  const amenities = taxonomies[0] || [];
  const propertyTypes = taxonomies[1] || [];
  const locations = taxonomies[2] || [];

  const images = photo_gallery?.images?.[0] || [];
  const mainImage = images[0]?.full_image_url || '/placeholder-property.jpg';

  const handleContactClick = () => {
    setShowContactModal(true);
    if (onContactClick) {
      onContactClick(property);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: title?.rendered || 'Property',
        text: description,
        url: window.location.href
      });
    } else if (onShareClick) {
      onShareClick(property);
    }
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210'; // Replace with actual phone number
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in this property: ${title?.rendered}`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="property-detail">
      {/* Header Section */}
      <div className="property-detail__header">
        <div className="property-detail__title-section">
          <h1 className="property-detail__title">
            {title?.rendered || 'Property Details'}
          </h1>
          <div className="property-detail__meta">
            {locations.length > 0 && (
              <span className="property-detail__location">
                📍 {locations[0].name}
              </span>
            )}
            {area > 0 && (
              <span className="property-detail__area">
                📐 {area} sq ft
              </span>
            )}
          </div>
        </div>
        <div className="property-detail__price-section">
          <div className="property-detail__price">
            {formatCurrency(price)}
          </div>
          {propertyTypes.length > 0 && (
            <Badge variant="primary" className="property-detail__type-badge">
              {propertyTypes[0].name}
            </Badge>
          )}
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="property-detail__gallery-section">
        <div 
          className="property-detail__main-image"
          onClick={() => setShowGalleryModal(true)}
        >
          <img
            src={mainImage}
            alt={title?.rendered || 'Property'}
            className="property-detail__image"
          />
          {images.length > 1 && (
            <div className="property-detail__image-count">
              📸 {images.length} Photos
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="property-detail__thumbnail-grid">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="property-detail__thumbnail"
                onClick={() => setShowGalleryModal(true)}
              >
                <img
                  src={image.thumbnail_image_url || image.full_image_url}
                  alt={`Property view ${index + 2}`}
                />
                {index === 3 && images.length > 5 && (
                  <div className="property-detail__more-images">
                    +{images.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="property-detail__content">
        <div className="property-detail__main-content">
          {/* Description */}
          <div className="property-detail__description">
            <h2 className="property-detail__section-title">Description</h2>
            <div 
              className="property-detail__description-text"
              dangerouslySetInnerHTML={{ 
                __html: description || 'No description available.' 
              }}
            />
          </div>

          {/* Property Details */}
          <div className="property-detail__details">
            <h2 className="property-detail__section-title">Property Details</h2>
            <div className="property-detail__details-grid">
              {price > 0 && (
                <div className="property-detail__detail-item">
                  <span className="property-detail__detail-label">Price:</span>
                  <span className="property-detail__detail-value">
                    {formatCurrency(price)}
                  </span>
                </div>
              )}
              {area > 0 && (
                <div className="property-detail__detail-item">
                  <span className="property-detail__detail-label">Area:</span>
                  <span className="property-detail__detail-value">
                    {area} sq ft
                  </span>
                </div>
              )}
              {address && (
                <div className="property-detail__detail-item">
                  <span className="property-detail__detail-label">Address:</span>
                  <span className="property-detail__detail-value">
                    {address}
                  </span>
                </div>
              )}
              {propertyTypes.length > 0 && (
                <div className="property-detail__detail-item">
                  <span className="property-detail__detail-label">Type:</span>
                  <span className="property-detail__detail-value">
                    {propertyTypes.map(type => type.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="property-detail__amenities">
              <h2 className="property-detail__section-title">Amenities</h2>
              <div className="property-detail__amenities-grid">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="property-detail__amenity">
                    <span className="property-detail__amenity-icon">✓</span>
                    <span className="property-detail__amenity-name">
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="property-detail__sidebar">
          <div className="property-detail__contact-card">
            <h3 className="property-detail__contact-title">
              Interested in this property?
            </h3>
            <p className="property-detail__contact-subtitle">
              Get in touch with us for more details
            </p>
            
            <div className="property-detail__contact-buttons">
              <Button
                variant="primary"
                size="large"
                onClick={handleContactClick}
                className="property-detail__contact-button"
              >
                📧 Contact Agent
              </Button>
              
              <Button
                variant="success"
                size="large"
                onClick={handleWhatsAppClick}
                className="property-detail__contact-button"
              >
                💬 WhatsApp
              </Button>
              
              <Button
                variant="secondary"
                size="large"
                onClick={handleCallClick}
                className="property-detail__contact-button"
              >
                📞 Call Now
              </Button>
              
              <Button
                variant="outline"
                size="large"
                onClick={handleShareClick}
                className="property-detail__contact-button"
              >
                📤 Share
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="property-detail__quick-info">
            <h3 className="property-detail__quick-info-title">Quick Info</h3>
            <div className="property-detail__quick-info-grid">
              <div className="property-detail__quick-info-item">
                <div className="property-detail__quick-info-label">Property ID</div>
                <div className="property-detail__quick-info-value">#{property.id}</div>
              </div>
              <div className="property-detail__quick-info-item">
                <div className="property-detail__quick-info-label">Status</div>
                <div className="property-detail__quick-info-value">
                  <Badge variant="success">Available</Badge>
                </div>
              </div>
              {locations.length > 0 && (
                <div className="property-detail__quick-info-item">
                  <div className="property-detail__quick-info-label">Location</div>
                  <div className="property-detail__quick-info-value">
                    {locations[0].name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title="Contact Agent"
        >
          <div className="property-detail__contact-form">
            <p>Send us a message about this property:</p>
            <form className="property-detail__form">
              <div className="property-detail__form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="property-detail__form-input"
                />
              </div>
              <div className="property-detail__form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="property-detail__form-input"
                />
              </div>
              <div className="property-detail__form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="property-detail__form-input"
                />
              </div>
              <div className="property-detail__form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="property-detail__form-textarea"
                  defaultValue={`Hi, I'm interested in the property: ${title?.rendered}`}
                />
              </div>
              <div className="property-detail__form-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <Modal
          isOpen={showGalleryModal}
          onClose={() => setShowGalleryModal(false)}
          title="Property Gallery"
          size="large"
        >
          <PropertyGallery
            images={images}
            propertyTitle={title?.rendered}
          />
        </Modal>
      )}
    </div>
  );
};

export default PropertyDetail;