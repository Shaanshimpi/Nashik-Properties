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

  const stats = [
    { label: 'Properties Listed', value: '500+' },
    { label: 'Happy Customers', value: '1000+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Cities Covered', value: '5+' }
  ];

  const features = [
    {
      icon: '🏡',
      title: 'Premium Properties',
      description: 'Exclusive selection of high-end residential and commercial properties'
    },
    {
      icon: '✅',
      title: 'Verified Listings',
      description: 'Every property is thoroughly vetted for authenticity and quality'
    },
    {
      icon: '👔',
      title: 'Expert Agents',
      description: 'Professional guidance from our experienced real estate specialists'
    },
    {
      icon: '📱',
      title: 'Digital Convenience',
      description: 'Seamless online experience with virtual tours and digital paperwork'
    }
  ];

  const isShowingFeatured = featuredProperties.some(prop => 
    prop._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'featured')
  );

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__content container">
          <div className="home-hero__text">
            <h1 className="home-hero__title">
              <span className="home-hero__title-line">Discover Your</span>
              <span className="home-hero__title-highlight">Perfect Property</span>
            </h1>
            <p className="home-hero__description">
              Premium real estate services with personalized attention and exclusive listings
            </p>
            
            <form className="home-hero__search" onSubmit={handleSearchSubmit}>
              <div className="home-hero__search-container">
                <input
                  type="text"
                  placeholder="Search by location, type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="home-hero__search-input"
                />
                <button type="submit" className="home-hero__search-button">
                  <span>Search</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="home-hero__quick-links">
              <a href="/properties?type=apartment" className="home-hero__quick-link">Luxury Apartments</a>
              <a href="/properties?type=villa" className="home-hero__quick-link">Modern Villas</a>
              <a href="/properties?location=central" className="home-hero__quick-link">Central Locations</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats__grid">
            {stats.map((stat, index) => (
              <div key={`stat-${index}`} className="home-stats__item">
                <div className="home-stats__value">{stat.value}</div>
                <div className="home-stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-header__title">Why Choose Our Services</h2>
            <p className="home-section-header__subtitle">
              We combine market expertise with personalized service to deliver exceptional results
            </p>
          </div>
          
          <div className="home-features__grid">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="home-features__card">
                <div className="home-features__icon">{feature.icon}</div>
                <h3 className="home-features__title">{feature.title}</h3>
                <p className="home-features__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="home-properties">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-header__title">
              {isShowingFeatured ? 'Featured Properties' : 'Recent Listings'}
            </h2>
            <p className="home-section-header__subtitle">
              {isShowingFeatured 
                ? 'Our curated selection of exceptional properties' 
                : 'Explore our newest property additions'
              }
            </p>
          </div>
          
          {isLoading ? (
            <div className="home-loading">
              <Spinner size="large" />
            </div>
          ) : error ? (
            <div className="home-error">
              <p className="home-error__message">{error}</p>
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
                    ? "Currently no featured properties available"
                    : "No recent listings at this time"
                }
                showLoadMore={false}
              />
              
              {featuredProperties.length > 0 && (
                <div className="home-properties__view-all">
                  <Button href="/properties" variant="outline" size="large">
                    Browse All Properties
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta__content">
            <h2 className="home-cta__title">Ready to Begin Your Property Journey?</h2>
            <p className="home-cta__text">
              Our team is ready to provide expert guidance tailored to your needs
            </p>
            <div className="home-cta__buttons">
              <Button href="/properties" size="large" className="home-cta__button">
                Explore Properties
              </Button>
              <Button href="/contact" variant="outline" size="large" className="home-cta__button">
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;