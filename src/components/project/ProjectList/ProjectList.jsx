import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

const ProjectList = ({ 
  projects, 
  onProjectClick,
  loading = false,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`project-list ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="project-list__skeleton">
            <div className="project-list__skeleton-image"></div>
            <div className="project-list__skeleton-content">
              <div className="project-list__skeleton-title"></div>
              <div className="project-list__skeleton-description"></div>
              <div className="project-list__skeleton-price"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className={`project-list ${className} project-list--empty`}>
        <div className="project-list__empty-state">
          <h3>No projects found</h3>
          <p>Try adjusting your search criteria or check back later for new listings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-list ${className}`}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onProjectClick}
          className="project-list__item"
        />
      ))}
    </div>
  );
};

export default ProjectList;