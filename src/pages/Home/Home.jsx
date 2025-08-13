import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import PropertyList from '../../components/property/PropertyList/PropertyList';
import Button from '../../components/ui/Button/Button';
import Spinner from '../../components/common/Loading/Spinner';
import './Home.css';

const Home = () => {
  const { properties: initialProperties } = useLoaderData();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize with loader data
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setFeaturedProperties(initialProperties);
    }
  }, [initialProperties]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Enhanced stats data with icons
  const stats = [
    { 
      label: 'Premium Properties', 
      value: '500+', 
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    { 
      label: 'Satisfied Clients', 
      value: '1000+',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.002 2.002 0 0 0 18.1 7h-.8c-.8 0-1.54.5-1.84 1.26l-1.92 5.01A2.004 2.004 0 0 0 15.49 16H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-2c-1.1 0-2 .9-2 2v7h6v-7c0-1.1-.9-2-2-2zM6.5 6C7.33 6 8 6.67 8 7.5S7.33 9 6.5 9 5 8.33 5 7.5 5.67 6 6.5 6zm3 4.5h-1c-.83 0-1.5.67-1.5 1.5v8h4v-8c0-.83-.67-1.5-1.5-1.5z"/>
        </svg>
      )
    },
    { 
      label: 'Years Excellence', 
      value: '15+',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    { 
      label: 'Cities Served', 
      value: '5+',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
        </svg>
      )
    }
  ];

  // Enhanced features with better icons
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Premium Selection',
      description: 'Curated collection of luxury properties from prime locations with exceptional value'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Verified & Trusted',
      description: 'Every property undergoes rigorous verification ensuring legal clarity and authenticity'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
      title: 'Market Insights',
      description: 'Data-driven market analysis and investment guidance from certified real estate experts'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: 'White-glove Service',
      description: 'Dedicated support team providing personalized assistance throughout your journey'
    }
  ];

  // Property types for quick access
  const propertyTypes = [
    { name: 'Luxury Villas', link: '/properties?type=villa', count: '150+' },
    { name: 'Premium Apartments', link: '/properties?type=apartment', count: '200+' },
    { name: 'Commercial Spaces', link: '/properties?type=commercial', count: '100+' },
    { name: 'Residential Plots', link: '/properties?type=plot', count: '50+' }
  ];

  // Trust indicators
  const trustIndicators = [
    { label: 'RERA Certified', value: '100%' },
    { label: 'Customer Satisfaction', value: '98%' },
    { label: 'On-time Delivery', value: '95%' },
    { label: 'Legal Compliance', value: '100%' }
  ];

  // Determine if we're showing featured or recent properties
  const isShowingFeatured = featuredProperties.some(prop => 
    prop._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'featured')
  );

  return (
    <Layout
      title="Premium Real Estate Properties | Luxury Homes & Commercial Spaces"
      description="Discover premium real estate with India's most trusted property platform. Luxury homes, commercial spaces, and investment opportunities with guaranteed authenticity."
      keywords="premium real estate, luxury properties, commercial real estate, residential properties, property investment, RERA certified"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__overlay"></div>
        </div>
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <div className="hero__badge">
                <span className="hero__badge-icon">⭐</span>
                India's Most Trusted Real Estate Platform
              </div>
              <h1 className="hero__title">
                Discover <span className="hero__title-highlight">Premium Properties</span>
                <br />That Define <span className="hero__title-accent">Luxury Living</span>
              </h1>
              <p className="hero__subtitle">
                Experience the pinnacle of real estate excellence with our curated collection 
                of luxury properties. From sophisticated urban apartments to palatial villas, 
                find your perfect sanctuary.
              </p>
              
              {/* Enhanced Search Form */}
              <div className="hero__search-container">
                <div className="hero__search-tabs">
                  <button className="search-tab active">Buy</button>
                </div>
                <form className="hero__search" onSubmit={handleSearchSubmit}>
                  <div className="search-field">
                    <svg className="search-field-icon" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L5.05 4.05zM4.343 4.343a7 7 0 1011.314 0L4.343 4.343z"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter location, landmark or project name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  {/* <div className="search-field search-field--select">
                    <select className="search-select">
                      <option>Property Type</option>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <div className="search-field search-field--select">
                    <select className="search-select">
                      <option>Budget Range</option>
                      <option>Under ₹50L</option>
                      <option>₹50L - ₹1Cr</option>
                      <option>Above ₹1Cr</option>
                    </select>
                  </div> */}
                  <Button type="submit" size="large" className="search-button">
                    <svg viewBox="0 0 10 20" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                    </svg>
                    Search Properties
                  </Button>
                </form>
              </div>
              
              {/* Property Type Quick Access */}
              <div className="hero__property-types">
                {propertyTypes.map((type, index) => (
                  <a key={index} href={type.link} className="property-type-card">
                    <span className="property-type-name">{type.name}</span>
                    <span className="property-type-count">{type.count}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <div className="container">
          <div className="trust-indicators__grid">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="trust-indicator">
                <div className="trust-indicator__value">{indicator.value}</div>
                <div className="trust-indicator__label">{indicator.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__content">
            <div className="stats__header">
              <h2>Excellence in Numbers</h2>
              <p>Our commitment to quality reflected in measurable achievements</p>
            </div>
            <div className="stats__grid">
              {stats.map((stat, index) => (
                <div key={`stat-${index}`} className="stats__item">
                  <div className="stats__icon">{stat.icon}</div>
                  <div className="stats__value">{stat.value}</div>
                  <div className="stats__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features__header">
            <div className="section-badge">Our Advantages</div>
            <h2 className="features__title">Why Industry Leaders Choose Us</h2>
            <p className="features__subtitle">
              Combining cutting-edge technology with personalized service to deliver 
              unparalleled real estate experiences that exceed expectations.
            </p>
          </div>
          
          <div className="features__grid">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="features__item">
                <div className="features__icon">{feature.icon}</div>
                <h3 className="features__item-title">{feature.title}</h3>
                <p className="features__item-description">{feature.description}</p>
                <div className="features__item-arrow">
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured/Recent Properties Section */}
      <section className="featured-properties">
        <div className="container">
          <div className="section-header">
            <div className="section-header__content">
              <div className="section-badge">
                {isShowingFeatured ? 'Handpicked Selection' : 'Latest Listings'}
              </div>
              <h2 className="section-title">
                {isShowingFeatured ? 'Featured Premium Properties' : 'Recently Added Properties'}
              </h2>
              <p className="section-description">
                {isShowingFeatured 
                  ? 'Exclusive collection of premium properties that define luxury and sophistication' 
                  : 'Discover the newest additions to our premium property portfolio'
                }
              </p>
            </div>
            <div className="section-header__actions">
              <Button href="/properties" variant="outline">
                View All Properties
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                </svg>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading-wrapper">
              <Spinner size="large" />
            </div>
          ) : error ? (
            <div className="error-message">
              <div className="error-icon">
                <svg viewBox="0 0 20 20" width="48" height="48" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                </svg>
              </div>
              <h3>Unable to load properties</h3>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <PropertyList
              properties={featuredProperties}
              emptyMessage={
                <div className="empty-properties">
                  <div className="empty-properties__icon">
                    <svg viewBox="0 0 20 20" width="64" height="64" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <h3>No Properties Available</h3>
                  <p>
                    {isShowingFeatured
                      ? "We're currently updating our featured properties collection."
                      : "New properties will be added soon. Check back later."
                    }
                  </p>
                  <Button href="/properties" variant="outline">
                    Explore All Listings
                  </Button>
                </div>
              }
              showLoadMore={false}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta__content">
            <div className="cta__text">
              <div className="section-badge section-badge--light">Ready to Begin?</div>
              <h2 className="cta__title">
                Your Dream Property Awaits Discovery
              </h2>
              <p className="cta__subtitle">
                Join thousands of satisfied customers who found their perfect property 
                through our premium platform. Let our experts guide you to your ideal investment.
              </p>
            </div>
            <div className="cta__actions">
              <Button href="/properties" size="large" className="cta__primary-button">
                Explore Premium Properties
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                </svg>
              </Button>
              <Button href="/contact" variant="outline" size="large" className="cta__secondary-button">
                Schedule Consultation
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;