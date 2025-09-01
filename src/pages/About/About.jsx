import React from 'react';
import MetaTags from '../../components/common/SEO/MetaTags';
import { generateSEOTitle, generateCanonicalUrl } from '../../services/seo/seoHelpers';
import './About.css';

const About = () => {
  const seoData = {
    title: generateSEOTitle('About Us'),
    description: 'Learn about Nashik Properties - Your trusted partner in real estate. We help you find your dream property with expert guidance and personalized service.',
    keywords: 'about nashik properties, real estate company, property experts nashik',
    url: generateCanonicalUrl('/about')
  };

  return (
    <>
      <MetaTags {...seoData} />
      
      <div className="about-page">
        <div className="container">
          <div className="about-hero">
            <h1>About Us</h1>
            <p className="about-hero__subtitle">
              Your trusted partner in finding the perfect property
            </p>
          </div>

          <div className="about-content">
            <div className="about-section">
              <h2>Our Story</h2>
              <p>
                Founded with a vision to transform the real estate experience in Nashik, 
                we have been helping families and investors find their perfect properties 
                for over a decade. Our deep understanding of the local market, combined 
                with modern technology, ensures you get the best deals and service.
              </p>
            </div>

            <div className="about-section">
              <h2>Our Vision</h2>
              <p>
                To build a strong team that empowers the community lifestyle by sharing knowledge and fulfilling the basic need of homes for people contributing to the nation.
              </p>
            </div>

            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                To empower the lifestyle of over 10,000 people every year by helping them participate in a wealth-building journey through sole selling of property, education, and community collaboration.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Properties Sold</p>
              </div>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Areas Covered</p>
              </div>
            </div>

            <div className="about-section">
              <h2>Why Choose Us?</h2>
              <div className="features-grid">
                <div className="feature-item">
                  <h4>Local Expertise</h4>
                  <p>Deep knowledge of Nashik's property market and neighborhoods</p>
                </div>
                <div className="feature-item">
                  <h4>Personalized Service</h4>
                  <p>Tailored solutions to meet your specific property requirements</p>
                </div>
                <div className="feature-item">
                  <h4>Transparent Process</h4>
                  <p>Clear communication and honest pricing throughout your journey</p>
                </div>
                <div className="feature-item">
                  <h4>End-to-End Support</h4>
                  <p>Complete assistance from property search to final documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;