import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOContext = createContext();

export const SEOProvider = ({ children }) => {
  const location = useLocation();
  const [seoData, setSeoData] = useState({
    title: 'Nashik Properties',
    description: 'Premium real estate listings in Nashik',
    keywords: 'nashik properties, real estate',
    image: '/default-property.jpg',
    type: 'website'
  });

  const updateSEO = (newSeoData) => {
    setSeoData(prev => ({
      ...prev,
      ...newSeoData,
      url: window.location.href
    }));
  };

  const resetSEO = () => {
    setSeoData({
      title: 'Nashik Properties',
      description: 'Premium real estate listings in Nashik',
      keywords: 'nashik properties, real estate',
      image: '/default-property.jpg',
      type: 'website',
      url: window.location.href
    });
  };

  useEffect(() => {
    // Reset SEO data on route change
    resetSEO();
  }, [location.pathname]);

  return (
    <SEOContext.Provider value={{
      seoData,
      updateSEO,
      resetSEO
    }}>
      {children}
    </SEOContext.Provider>
  );
};

export const useSEOContext = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEOContext must be used within a SEOProvider');
  }
  return context;
};