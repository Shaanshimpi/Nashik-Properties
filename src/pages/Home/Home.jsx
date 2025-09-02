import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import PropertyList from '../../components/property/PropertyList/PropertyList';
import ProjectList from '../../components/project/ProjectList/ProjectList';
import PropertyCard from '../../components/property/PropertyCard/PropertyCard';
import Button from '../../components/ui/Button/Button';
import Spinner from '../../components/common/Loading/Spinner';
import logo from '../../assets/logo/npc-logo.png';
import './Home.css';

const handleProjectClick = (project) => {
  navigate(`/projects/${project.id || project.slug}`);
};

const Home = () => {
  const { properties: initialProperties, projects: initialProjects } = useLoaderData();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Changed from Navigate to navigate

  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setFeaturedProperties(initialProperties);
    }
    if (initialProjects && initialProjects.length > 0) {
      setFeaturedProjects(initialProjects);
    }
  }, [initialProperties, initialProjects]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to projects page with search query
      navigate(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
      label: 'Developer Projects', 
      value: '50+',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
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
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Premium Selection',
      description: 'Curated collection of luxury properties and developer projects from prime locations'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Verified & Trusted',
      description: 'Every property and project undergoes rigorous verification ensuring legal clarity'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
      title: 'Market Insights',
      description: 'Data-driven market analysis and investment guidance from certified experts'
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

  // Property types for quick access - Updated to redirect to projects
  const propertyTypes = [
    { name: 'Luxury Villas', link: '/projects?search=villa', count: '150+' },
    { name: 'Premium Apartments', link: '/projects?search=apartment', count: '200+' },
    { name: 'Commercial Spaces', link: '/projects?search=commercial', count: '100+' },
    { name: 'Developer Projects', link: '/projects', count: '50+' }
  ];

  // Trust indicators
  const trustIndicators = [
    { label: 'RERA Certified', value: '100%' },
    { label: 'Customer Satisfaction', value: '98%' },
    { label: 'On-time Delivery', value: '95%' },
    { label: 'Legal Compliance', value: '100%' }
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
                placeholder="Search projects by location, type, or features..."
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
        </div>

        {/* Premium Logo Section */}
        <div className="home-hero__logo">
          <div className="hero-logo">
            <div className="hero-logo__floating-elements">
              <div className="floating-element"></div>
              <div className="floating-element"></div>
              <div className="floating-element"></div>
            </div>
            
            <div className="hero-logo__content">
              <div className="hero-logo__icon">
                <img 
                src={logo} 
                alt="Nashik Property Club" 
                className="hero__logo-image"
              />
              </div>
              
              <div className="hero-logo__text">
                <h3 className="hero-logo__title">Nashik Property Club</h3>
                <p className="hero-logo__tagline">Premium Real Estate</p>
              </div>
            </div>
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

      {/* Developer Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="featured-projects">
          <div className="container">
            <div className="section-header">
              <div className="section-header__content">
                <div className="section-badge">Exclusive Developments</div>
                <h2 className="section-title">Featured Developer Projects</h2>
                <p className="section-description">
                  Discover premium residential projects by renowned developers with various configurations
                </p>
              </div>
              <div className="section-header__actions">
                <Button href="/projects" onClick={() => navigate('/projects')} variant="outline">
                  View All Projects
                </Button>
              </div>
            </div>
            
            <ProjectList
            projects={featuredProjects}
            onProjectClick={handleProjectClick} // Add this line
            emptyMessage={
              <div className="empty-projects">
                <div className="empty-projects__icon">
                  <svg viewBox="0 0 20 20" width="64" height="64" fill="currentColor">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                  </svg>
                </div>
                <h3>No Projects Available</h3>
                <p>New developer projects will be added soon. Check back later.</p>
                <Button href="/projects" variant="outline">
                  Explore All Projects
                </Button>
              </div>
            }
            showLoadMore={false}
          />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta__content">
            <h2 className="home-cta__title">Ready to Begin Your Property Journey?</h2>
            <p className="home-cta__text">
              Our team is ready to provide expert guidance tailored to your needs
            </p>
            <div className="home-cta__buttons">
              {/* <button 
                onClick={() => navigate('/properties')} 
                className="home-cta__button"
              >
                Explore Properties
              </button> */}
              <button 
                onClick={() => navigate('/projects')} 
                className="home-cta__button cta__secondary-button"
              >
                View Developer Projects
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                </svg>
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="home-cta__button cta__tertiary-button"
              >
                Schedule Consultation
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;