import React, { useState } from 'react';
import './ProjectGallery.css';

const ProjectGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="project-gallery">
        <div className="project-gallery__main-image">
          <img 
            src="/default-project.jpg" 
            alt="Default project image" 
            className="project-gallery__image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="project-gallery">
      <div className="project-gallery__main">
        <img 
          src={images[selectedImage]?.src} 
          alt={images[selectedImage]?.alt || `Project image ${selectedImage + 1}`}
          className="project-gallery__main-image"
        />
      </div>
      
      {images.length > 1 && (
        <div className="project-gallery__thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`project-gallery__thumbnail ${index === selectedImage ? 'project-gallery__thumbnail--active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="project-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;