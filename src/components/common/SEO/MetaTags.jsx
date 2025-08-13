import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'RealtyHome',
  siteName = 'RealtyHome'
}) => {
  // Construct full title with site name
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  
  // Default values
  const defaultDescription = description || 'Premium property listings and real estate services';
  const defaultImage = image || `${window.location.origin}/default-property-image.jpg`;
  const defaultUrl = url || window.location.href;
  const defaultKeywords = keywords || 'real estate, property, buy, sell, rent, homes, apartments, villas';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={defaultUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:site" content="@realtyhome" />
      <meta name="twitter:creator" content="@realtyhome" />
      
      {/* Additional Meta Tags for Real Estate */}
      <meta property="business:contact_data:locality" content="Nashik" />
      <meta property="business:contact_data:region" content="Maharashtra" />
      <meta property="business:contact_data:country_name" content="India" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={defaultUrl} />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-IN" />
      
      {/* Cache Control */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* Structured Data for Real Estate */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Real Estate" />
          <meta property="article:tag" content="property, real estate, homes" />
        </>
      )}
    </Helmet>
  );
};

export default MetaTags;