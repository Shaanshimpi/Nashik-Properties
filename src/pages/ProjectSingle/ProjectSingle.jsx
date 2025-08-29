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
  const [parsedDescription, setParsedDescription] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced description parsing function
  const parseDescription = (description) => {
    if (!description) return null;

    // Convert HTML to text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    const sections = {
      overview: '',
      keyFeatures: [],
      amenities: [],
      locationHighlights: [],
      rentInfo: '',
      address: ''
    };

    const lines = textContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && line.length > 1);

    let currentSection = 'overview';
    let collectingItems = false;
    let overviewLineCount = 0;

    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      
      // Section detection
      if (lowerLine.includes('key features:') || lowerLine.includes('features:')) {
        currentSection = 'keyFeatures';
        collectingItems = true;
        return;
      } else if (lowerLine.includes('amenities:') || lowerLine.includes('world-class amenities:')) {
        currentSection = 'amenities';
        collectingItems = true;
        return;
      } else if (lowerLine.includes('location highlights:') || lowerLine.includes('location:')) {
        currentSection = 'locationHighlights';
        collectingItems = true;
        return;
      } else if (lowerLine.includes('address:') || line.includes('📍')) {
        currentSection = 'address';
        collectingItems = false;
        return;
      } else if (lowerLine.includes('rent:') || lowerLine.includes('price:')) {
        currentSection = 'rentInfo';
        collectingItems = false;
        return;
      }

      // Content allocation
      if (currentSection === 'overview' && overviewLineCount < 3) {
        sections.overview += line + ' ';
        overviewLineCount++;
      } else if (currentSection === 'keyFeatures' && collectingItems) {
        if (line && !lowerLine.includes('key features:') && !lowerLine.includes('features:')) {
          sections.keyFeatures.push(line);
        }
      } else if (currentSection === 'amenities' && collectingItems) {
        if (line && !lowerLine.includes('amenities:')) {
          sections.amenities.push(line);
        }
      } else if (currentSection === 'locationHighlights' && collectingItems) {
        if (line && !lowerLine.includes('location')) {
          sections.locationHighlights.push(line);
        }
      } else if (currentSection === 'address' && !collectingItems) {
        if (line && !lowerLine.includes('address:') && !line.includes('📍')) {
          sections.address += line + ' ';
        }
      } else if (currentSection === 'rentInfo' && !collectingItems) {
        if (line && !lowerLine.includes('rent:') && !lowerLine.includes('price:')) {
          sections.rentInfo += line + ' ';
        }
      }
    });

    // Clean up sections
    sections.overview = sections.overview.trim();
    sections.address = sections.address.trim();
    sections.rentInfo = sections.rentInfo.trim();

    return sections;
  };

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

  // Parse description when product loads
  useEffect(() => {
    if (currentProduct?.description) {
      const parsed = parseDescription(currentProduct.description);
      setParsedDescription(parsed);
    }
  }, [currentProduct]);

  // Set default configuration and description
  useEffect(() => {
    if (currentProduct && currentProduct.variations && currentProduct.variations.length > 0) {
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

  const getSelectedConfigurationImage = () => {
    if (selectedConfiguration?.image?.src) {
      return selectedConfiguration.image.src;
    }
    return currentProduct?.images?.[0]?.src || '/default-project.jpg';
  };

  // Get available tabs based on content
  const getAvailableTabs = () => {
    if (!parsedDescription) return [];
    
    const tabs = [];
    if (parsedDescription.overview) tabs.push({ key: 'overview', label: 'Overview', icon: '🏠' });
    if (parsedDescription.keyFeatures.length > 0) tabs.push({ key: 'features', label: 'Key Features', icon: '✨' });
    if (parsedDescription.amenities.length > 0) tabs.push({ key: 'amenities', label: 'Amenities', icon: '🏢' });
    if (parsedDescription.locationHighlights.length > 0) tabs.push({ key: 'location', label: 'Location', icon: '📍' });
    if (parsedDescription.address) tabs.push({ key: 'address', label: 'Address', icon: '📧' });
    if (parsedDescription.rentInfo) tabs.push({ key: 'pricing', label: 'Pricing', icon: '💰' });
    
    return tabs;
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

  const availableTabs = getAvailableTabs();

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
        
        {/* Enhanced Tabbed Description Section */}
        {parsedDescription && availableTabs.length > 0 && (
          <div className="project-single__description-tabs">
            <div className="tab-navigation">
              {availableTabs.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-button ${activeTab === tab.key ? 'tab-button--active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && parsedDescription.overview && (
                <div className="tab-content-panel">
                  <div className="project-overview">
                    <h3 className="section-title">Project Overview</h3>
                    <p className="overview-text">{parsedDescription.overview}</p>
                  </div>
                </div>
              )}

              {activeTab === 'features' && parsedDescription.keyFeatures.length > 0 && (
                <div className="tab-content-panel">
                  <h3 className="section-title">Key Features</h3>
                  <div className="features-grid">
                    {parsedDescription.keyFeatures.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && parsedDescription.amenities.length > 0 && (
                <div className="tab-content-panel">
                  <h3 className="section-title">World-Class Amenities</h3>
                  <div className="amenities-grid">
                    {parsedDescription.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <span className="amenity-icon">🏢</span>
                        <span className="amenity-text">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && parsedDescription.locationHighlights.length > 0 && (
                <div className="tab-content-panel">
                  <h3 className="section-title">Location Highlights</h3>
                  <div className="location-grid">
                    {parsedDescription.locationHighlights.map((highlight, index) => (
                      <div key={index} className="location-item">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'address' && parsedDescription.address && (
                <div className="tab-content-panel">
                  <h3 className="section-title">Property Address</h3>
                  <div className="address-info">
                    <div className="address-card">
                      <span className="address-icon">🏠</span>
                      <p className="address-text">{parsedDescription.address}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && parsedDescription.rentInfo && (
                <div className="tab-content-panel">
                  <h3 className="section-title">Pricing Information</h3>
                  <div className="pricing-info">
                    <div className="pricing-card">
                      <span className="pricing-icon">💰</span>
                      <p className="pricing-text">{parsedDescription.rentInfo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fallback: Show original description if parsing fails */}
        {!parsedDescription && currentProduct.description && (
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