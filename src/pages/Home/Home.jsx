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

  // Stats data
  const stats = [
    { label: 'Properties Listed', value: '500+' },
    { label: 'Happy Customers', value: '1000+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Cities Covered', value: '5+' }
  ];

  // Features data
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Premium Properties',
      description: 'Handpicked selection of premium residential and commercial properties'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Verified Listings',
      description: 'All properties are verified and authenticated for your peace of mind'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: 'Expert Guidance',
      description: 'Professional real estate experts to guide you through every step'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your real estate needs'
    }
  ];

  // Determine if we're showing featured or recent properties
  const isShowingFeatured = featuredProperties.some(prop => 
    prop._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'featured')
  );

  return (
    <Layout
      title="Premium Real Estate Properties"
      description="Find your dream property with our premium real estate listings. Verified properties, expert guidance, and exceptional service."
      keywords="real estate, property, buy, sell, rent, homes, apartments, villas, commercial, residential"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">
                Find Your <span className="hero__title-highlight">Dream Property</span>
              </h1>
              <p className="hero__subtitle">
                Discover premium residential and commercial properties with verified listings, 
                expert guidance, and exceptional service.
              </p>
              
              {/* Search Form */}
              <form className="hero__search" onSubmit={handleSearchSubmit}>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by location, property type, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </form>
              
              {/* Quick Links */}
              <div className="hero__quick-links">
                <span>Popular Searches:</span>
                <a href="/properties?type=apartment" className="hero__quick-link">Apartments</a>
                <a href="/properties?type=villa" className="hero__quick-link">Villas</a>
                <a href="/properties?location=nashik" className="hero__quick-link">Nashik</a>
                <a href="/properties?type=commercial" className="hero__quick-link">Commercial</a>
              </div>
            </div>
            
            <div className="hero__image">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern luxury home exterior"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, index) => (
              <div key={`stat-${index}`} className="stats__item">
                <div className="stats__value">{stat.value}</div>
                <div className="stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features__header">
            <h2 className="features__title">Why Choose Us?</h2>
            <p className="features__subtitle">
              We provide comprehensive real estate services with a focus on quality, 
              transparency, and customer satisfaction.
            </p>
          </div>
          
          <div className="features__grid">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="features__item">
                <div className="features__icon">{feature.icon}</div>
                <h3 className="features__item-title">{feature.title}</h3>
                <p className="features__item-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured/Recent Properties Section */}
      <section className="featured-properties">
        <div className="container">
          <div className="section-header">
            <h2>{isShowingFeatured ? 'Featured Properties' : 'Recent Properties'}</h2>
            <p>
              {isShowingFeatured 
                ? 'Discover our handpicked selection of premium properties' 
                : 'Check out our newest property listings'
              }
            </p>
          </div>
          
          {isLoading ? (
            <div className="loading-wrapper">
              <Spinner size="large" />
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <PropertyList
                properties={featuredProperties}
                emptyMessage={
                  isShowingFeatured
                    ? "No featured properties available at the moment."
                    : "No recent properties available at the moment."
                }
                showLoadMore={false}
              />
              
              {featuredProperties.length > 0 && (
                <div className="view-all">
                  <Button href="/properties" variant="outline">
                    View All Properties
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta__content">
            <h2>Ready to Find Your Dream Property?</h2>
            <p>
              Let our experts help you find the perfect property that matches your needs and budget.
            </p>
            <div className="cta__buttons">
              <Button href="/properties" size="large">
                Browse Properties
              </Button>
              <Button href="/contact" variant="outline" size="large">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;