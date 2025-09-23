// src/pages/NotFound/NotFound.jsx
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../components/common/SEO/MetaTags';
import Button from '../../components/ui/Button/Button';
import './NotFound.css';

const NotFound = () => {
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <MetaTags
        title={`Page Not Found | ${import.meta.env.VITE_SITE_NAME}`}
        description="The page you're looking for doesn't exist."
        url={`${import.meta.env.VITE_SITE_URL}/404`}
      />

      <div className="not-found-page">
        <div className="not-found-page__content">
          <div className="not-found-page__icon">🏠</div>
          <h1 className="not-found-page__title">404</h1>
          <h2 className="not-found-page__subtitle">Page Not Found</h2>
          <p className="not-found-page__message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-page__actions">
            <Link to="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" size="lg">
                Browse Properties
              </Button>
            </Link>
          </div>
          
          <div className="not-found-page__suggestions">
            <h3>Popular Pages</h3>
            <ul className="not-found-page__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;