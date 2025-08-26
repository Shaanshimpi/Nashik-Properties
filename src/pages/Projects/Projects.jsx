import React, { useState, useEffect } from 'react';
import { useSEO } from '../../hooks/useSEO';
import ProjectList from '../../components/project/ProjectList/ProjectList';
import ProjectFilter from '../../components/project/ProjectFilter/ProjectFilter';
import { useProducts } from '../../hooks/useProducts';
import { getCategories } from '../../services/api/woocommerce';
import './Projects.css';

const Projects = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    featured: false
  });

  // SEO setup
  useSEO({
    title: 'Developer Projects | Nashik Properties',
    description: 'Browse premium residential projects by top developers in Nashik. Find your dream home with various configurations and amenities.',
    keywords: 'nashik projects, developer projects, residential projects, new constructions'
  });

  // Fetch all products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Filter products based on filters
  useEffect(() => {
    let result = products;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.short_description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      result = result.filter(product => 
        product.categories.some(cat => cat.id.toString() === filters.category)
      );
    }
    
    if (filters.location) {
      result = result.filter(product => 
        product.categories.some(cat => cat.id.toString() === filters.location)
      );
    }
    
    if (filters.featured) {
      result = result.filter(product => product.featured);
    }
    
    setFilteredProducts(result);
  }, [products, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleProjectClick = (project) => {
    // Navigate to project detail page
    window.location.href = `/projects/${project.id}`;
  };

  return (
    <div className="projects-page">
      <div className="projects-page__header">
        <h1>Developer Projects</h1>
        <p>Discover premium residential projects by top developers in Nashik</p>
      </div>
      
      <div className="projects-page__content">
        <aside className="projects-page__sidebar">
          <ProjectFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
          />
        </aside>
        
        <main className="projects-page__main">
          <div className="projects-page__results">
            <div className="projects-page__results-header">
              <h2>
                {filteredProducts.length} Project{filteredProducts.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            
            {error && (
              <div className="projects-page__error">
                <p>Error loading projects: {error}</p>
                <button onClick={() => fetchProducts()}>Try Again</button>
              </div>
            )}
            
            <ProjectList 
              projects={filteredProducts}
              onProjectClick={handleProjectClick}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;