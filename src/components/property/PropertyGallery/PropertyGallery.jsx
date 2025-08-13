// src/components/property/PropertyGallery/PropertyGallery.jsx
import React, { useState } from 'react';
import Modal from '../../ui/Modal/Modal';
import { optimizeImageUrl } from '../../../utils/helpers/imageOptimizer';
import './PropertyGallery.css';

const PropertyGallery = ({ images = [], title = '' }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="property-gallery__empty">
        <div className="property-gallery__empty-content">
          <span className="property-gallery__empty-icon">🏠</span>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const mainImage = images[selectedImage];
  const thumbnails = images.slice(0, 5); // Show max 5 thumbnails

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = () => {
    setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  const handleNextImage = () => {
    setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  return (
    <div className="property-gallery">
      {/* Main Image */}
      <div className="property-gallery__main">
        <img
          src={optimizeImageUrl(mainImage?.full_image_url, 1200)}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="property-gallery__main-image"
          onClick={() => handleImageClick(selectedImage)}
        />
        
        {images.length > 1 && (
          <>
            <button
              className="property-gallery__nav property-gallery__nav--prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="property-gallery__nav property-gallery__nav--next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        
        <div className="property-gallery__counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="property-gallery__thumbnails">
          {thumbnails.map((image, index) => (
            <div
              key={index}
              className={`property-gallery__thumbnail ${
                index === selectedImage ? 'property-gallery__thumbnail--active' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={optimizeImageUrl(image?.thumbnail_image_url || image?.full_image_url, 150)}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="property-gallery__thumbnail-image"
              />
            </div>
          ))}
          
          {images.length > 5 && (
            <div 
              className="property-gallery__thumbnail property-gallery__thumbnail--more"
              onClick={() => handleImageClick(5)}
            >
              <span className="property-gallery__more-text">
                +{images.length - 5} more
              </span>
            </div>
          )}
        </div>
      )}

      {/* Modal Gallery */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="xl"
        className="property-gallery__modal"
      >
        <div 
          className="property-gallery__modal-content"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          <img
            src={optimizeImageUrl(images[selectedImage]?.full_image_url, 1600)}
            alt={`${title} - Image ${selectedImage + 1}`}
            className="property-gallery__modal-image"
          />
          
          {images.length > 1 && (
            <>
              <button
                className="property-gallery__modal-nav property-gallery__modal-nav--prev"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="property-gallery__modal-nav property-gallery__modal-nav--next"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
          
          <div className="property-gallery__modal-counter">
            {selectedImage + 1} / {images.length}
          </div>
          
          {/* Modal Thumbnails */}
          <div className="property-gallery__modal-thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`property-gallery__modal-thumbnail ${
                  index === selectedImage ? 'property-gallery__modal-thumbnail--active' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={optimizeImageUrl(image?.thumbnail_image_url || image?.full_image_url, 100)}
                  alt={`${title} - Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyGallery;
