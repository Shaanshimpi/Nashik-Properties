import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ 
  project, 
  onClick,
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  const mainImage = project.images && project.images.length > 0 
    ? project.images[0].src 
    : '/default-project.jpg';

  // Extract configuration options from attributes
  const flatTypeAttribute = project.attributes.find(attr => 
    attr.name.toLowerCase().includes('flat') || 
    attr.name.toLowerCase().includes('type') ||
    attr.name.toLowerCase().includes('bhk')
  );

  const configurationOptions = flatTypeAttribute?.options || [];

  return (
    <div className={`project-card ${className}`} onClick={handleClick}>
      <div className="project-card__image-container">
        <img 
          src={mainImage} 
          alt={project.name}
          className="project-card__image"
        />
        {project.featured && (
          <span className="project-card__badge">Featured</span>
        )}
      </div>
      
      <div className="project-card__content">
        <h3 className="project-card__title">{project.name}</h3>
        
        {project.short_description && (
          <p 
            className="project-card__description"
            dangerouslySetInnerHTML={{ __html: project.short_description }}
          />
        )}
        
        <div className="project-card__price">
          {project.has_price_range ? (
            <div className="project-card__price-range">
              <span className="project-card__price-label">Price Range:</span>
              <span className="project-card__price-amount">
                ₹{project.display_price}
              </span>
            </div>
          ) : (
            <div className="project-card__single-price">
              <span className="project-card__price-label">Price:</span>
              <span className="project-card__price-amount">
                ₹{project.display_price}
              </span>
            </div>
          )}
        </div>
        
        {configurationOptions.length > 0 && (
          <div className="project-card__configurations">
            <span className="project-card__config-label">Available:</span>
            {configurationOptions.slice(0, 3).map((option, index) => (
              <span key={index} className="project-card__config-item">
                {option}
              </span>
            ))}
            {configurationOptions.length > 3 && (
              <span className="project-card__config-more">
                +{configurationOptions.length - 3} more
              </span>
            )}
          </div>
        )}

        {project.variations && project.variations.length > 0 && (
          <div className="project-card__variation-count">
            {project.variations.length} configuration{project.variations.length !== 1 ? 's' : ''} available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;