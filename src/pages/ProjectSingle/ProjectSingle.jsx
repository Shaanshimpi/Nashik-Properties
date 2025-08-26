import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { useProducts } from '../../hooks/useProducts';
import ProjectGallery from '../../components/project/ProjectGallery/ProjectGallery';
import './ProjectSingle.css';

const ProjectSingle = () => {
  const { id } = useParams();
  const { currentProduct, loading, error, fetchProductWithVariations } = useProducts();
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);
  const [selectedVariationDescription, setSelectedVariationDescription] = useState('');

  // SEO setup
  useSEO({
    title: currentProduct ? `${currentProduct.name} | Nashik Properties` : 'Project Details',
    description: currentProduct?.short_description || 'Premium residential project in Nashik',
    image: currentProduct?.images?.[0]?.src || '/default-project.jpg'
  });

  // Fetch product details
  useEffect(() => {
    if (id) {
      fetchProductWithVariations(id);
    }
  }, [id, fetchProductWithVariations]);

  // Set default configuration and description
  useEffect(() => {
    if (currentProduct && currentProduct.variations && currentProduct.variations.length > 0) {
      // Find the first variation with a valid price
      const firstVariation = currentProduct.variations.find(v => v.price && v.price > 0);
      if (firstVariation) {
        setSelectedConfiguration(firstVariation);
        setSelectedVariationDescription(firstVariation.description || '');
      }
    }
  }, [currentProduct]);

  const handleConfigurationSelect = (variation) => {
    setSelectedConfiguration(variation);
    setSelectedVariationDescription(variation.description || '');
  };

  // Get image for selected configuration or fallback to main product image
  const getSelectedConfigurationImage = () => {
    if (selectedConfiguration?.image?.src) {
      return selectedConfiguration.image.src;
    }
    return currentProduct?.images?.[0]?.src || '/default-project.jpg';
  };

  if (loading) {
    return (
      <div className="project-single">
        <div className="project-single__skeleton">
          <div className="project-single__skeleton-gallery"></div>
          <div className="project-single__skeleton-content">
            <div className="project-single__skeleton-title"></div>
            <div className="project-single__skeleton-description"></div>
            <div className="project-single__skeleton-price"></div>
            <div className="project-single__skeleton-configurations"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-single">
        <div className="project-single__error">
          <h2>Error Loading Project</h2>
          <p>{error}</p>
          <button onClick={() => fetchProductWithVariations(id)}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="project-single">
        <div className="project-single__not-found">
          <h2>Project Not Found</h2>
          <p>The project you're looking for doesn't exist or may have been removed.</p>
          <a href="/projects">Browse all projects</a>
        </div>
      </div>
    );
  }

  return (
    <div className="project-single">
      <div className="project-single__gallery">
        <ProjectGallery images={currentProduct.images} />
      </div>
      
      <div className="project-single__content">
        <header className="project-single__header">
          <h1 className="project-single__title">{currentProduct.name}</h1>
          {currentProduct.featured && (
            <span className="project-single__badge">Featured Project</span>
          )}
        </header>
        
        <div className="project-single__price-section">
          {currentProduct.has_price_range ? (
            <div className="project-single__price-range">
              <span className="project-single__price-label">Price Range:</span>
              <span className="project-single__price-amount">
                {currentProduct.display_price}
              </span>
              <span className="project-single__price-note">Starting from ₹{currentProduct.price_range.min.toLocaleString('en-IN')}</span>
            </div>
          ) : (
            <div className="project-single__single-price">
              <span className="project-single__price-label">Price:</span>
              <span className="project-single__price-amount">
                {currentProduct.display_price}
              </span>
            </div>
          )}
        </div>
        
        {currentProduct.description && (
          <div 
            className="project-single__description"
            dangerouslySetInnerHTML={{ __html: currentProduct.description }}
          />
        )}
        
        {/* Configuration Section with Image and Grid */}
        {currentProduct.variations && currentProduct.variations.length > 0 && (
          <div className="project-single__configurations">
            <h3>Available Configurations</h3>
            
            <div className="project-single__configurations-layout">
              {/* Selected Configuration Image and Description */}
              <div className="project-single__selected-config">
                <div className="project-single__selected-image">
                  <img 
                    src={getSelectedConfigurationImage()} 
                    alt={selectedConfiguration?.name || 'Selected Configuration'}
                    className="project-single__config-image"
                  />
                </div>
                {selectedVariationDescription && (
                  <div className="project-single__selected-description">
                    <h4>Configuration Details</h4>
                    <div 
                      className="project-single__variation-description-content"
                      dangerouslySetInnerHTML={{ __html: selectedVariationDescription }}
                    />
                  </div>
                )}
              </div>
              
              {/* Configuration Grid */}
              <div className="project-single__variations-grid">
                {currentProduct.variations.map((variation, index) => (
                  <div 
                    key={index} 
                    className={`variation-card ${selectedConfiguration?.id === variation.id ? 'variation-card--selected' : ''}`}
                    onClick={() => handleConfigurationSelect(variation)}
                  >
                    <div className="variation-card__header">
                      <h4 className="variation-card__title">
                        {variation.attributes.map(attr => attr.option).join(' • ')}
                      </h4>
                      {variation.on_sale && (
                        <span className="variation-card__sale-badge">Sale</span>
                      )}
                    </div>
                    <div className="variation-card__price">
                      {variation.on_sale ? (
                        <>
                          <span className="variation-card__sale-price">
                            ₹{Number(variation.price).toLocaleString('en-IN')}
                          </span>
                          <span className="variation-card__regular-price">
                            ₹{Number(variation.regular_price).toLocaleString('en-IN')}
                          </span>
                        </>
                      ) : (
                        <span className="variation-card__current-price">
                          ₹{Number(variation.price).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="variation-card__actions">
                      <button className="variation-card__cta">
                        Enquire Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="project-single__actions">
          <button className="project-single__cta-button">
            Schedule Site Visit
          </button>
          <button className="project-single__secondary-button">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSingle;