// src/pages/PropertySingle/PropertySingle.jsx
import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyDetail from '../../components/property/PropertyDetail/ProperttDetail';
import MetaTags from '../../components/common/SEO/MetaTags';
import { PropertyStructuredData, BreadcrumbStructuredData } from '../../components/common/SEO/StructuredData';
import { useProperty } from '../../hooks/useProperty';
import { formatCurrency } from '../../utils/formatters/currency';
import Spinner from '../../components/common/Loading/Spinner';
import './PropertySingle.css';

const PropertySingle = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const { id } = useParams();
  const { property, isLoading, error } = useProperty(id);

  if (isLoading) {
    return (
      <div className="property-single">
        <div className="property-single__loading">
          <Spinner size="lg" />
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-single">
        <div className="property-single__error">
          <h1>Property Not Found</h1>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties" className="property-single__back-link">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-single">
        <div className="property-single__error">
          <h1>Property Not Found</h1>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties" className="property-single__back-link">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/properties' },
    { name: property.title?.rendered || 'Property', url: `/property/${id}` }
  ];

  const propertyTitle = property.title?.rendered || 'Property Details';
  const propertyDescription = property.acf?.description || property.excerpt?.rendered || '';
  const propertyImage = property.acf?.photo_gallery?.images?.[0]?.[0]?.full_image_url || '';
  const propertyPrice = property.acf?.price ? formatCurrency(property.acf.price) : '';

  const pageTitle = `${propertyTitle}${propertyPrice ? ` - ${propertyPrice}` : ''} | ${import.meta.env.VITE_SITE_NAME}`;
  const pageDescription = propertyDescription.length > 160 
    ? `${propertyDescription.substring(0, 157)}...` 
    : propertyDescription;

  return (
    <>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords="real estate, property, home for sale, property details"
        image={propertyImage}
        url={`${import.meta.env.VITE_SITE_URL}/property/${id}`}
        type="article"
      />
      <PropertyStructuredData property={property} />
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

      <div className="property-single">
        {/* Breadcrumb Navigation */}
        <nav className="property-single__breadcrumb">
          <div className="property-single__breadcrumb-container">
            <Link to="/" className="property-single__breadcrumb-link">
              Home
            </Link>
            <span className="property-single__breadcrumb-separator">›</span>
            <Link to="/properties" className="property-single__breadcrumb-link">
              Properties
            </Link>
            <span className="property-single__breadcrumb-separator">›</span>
            <span className="property-single__breadcrumb-current">
              {propertyTitle}
            </span>
          </div>
        </nav>

        {/* Property Details */}
        <PropertyDetail property={property} />

        {/* Related Properties */}
        <RelatedProperties currentProperty={property} />
      </div>
    </>
  );
};

// Related Properties Component
const RelatedProperties = ({ currentProperty }) => {
  // This would typically fetch related properties based on location or property type
  // For now, we'll show a placeholder
  return (
    <section className="property-single__related">
      <div className="property-single__related-container">
        <h2 className="property-single__related-title">
          You might also like
        </h2>
        <div className="property-single__related-content">
          <p className="property-single__related-placeholder">
            Related properties will be displayed here based on location and property type.
          </p>
          <Link 
            to="/properties" 
            className="property-single__related-link"
          >
            Browse All Properties →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertySingle;

