// src/utils/constants/seoConstants.js
export const SEO_DEFAULTS = {
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Realty Website',
  SITE_DESCRIPTION: import.meta.env.VITE_SITE_DESCRIPTION || 'Premium property listings and real estate services',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://localhost:3000',
  DEFAULT_IMAGE: import.meta.env.VITE_DEFAULT_IMAGE || '/default-property.jpg',
  TWITTER_HANDLE: '@realtywebsite',
  FACEBOOK_APP_ID: '',
  ORGANIZATION_NAME: 'Realty Website',
  ORGANIZATION_TYPE: 'RealEstateAgent'
};

export const META_KEYWORDS = {
  HOME: 'real estate, properties, homes for sale, property listings, real estate agent',
  PROPERTIES: 'property listings, homes for sale, real estate search, buy property',
  PROPERTY_SINGLE: 'property details, home for sale, real estate listing',
  ABOUT: 'about us, real estate company, property experts, our story',
  CONTACT: 'contact, real estate agent, property consultation, get in touch'
};