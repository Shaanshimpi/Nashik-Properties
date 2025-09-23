import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import ProjectList from '../../components/project/ProjectList/ProjectList';
import ProjectFilter from '../../components/project/ProjectFilter/ProjectFilter';
import { useProducts } from '../../hooks/useProducts';
import { getCategories } from '../../services/api/woocommerce';
import './Projects.css';

const Projects = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const { products, loading, error, fetchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filters with URL parameters
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    featured: searchParams.get('featured') === 'true'
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

  // Update filters when URL parameters change
  useEffect(() => {
    const newFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
      featured: searchParams.get('featured') === 'true'
    };
    setFilters(newFilters);
  }, [searchParams]);

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
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams();
    
    if (updatedFilters.search) {
      newSearchParams.set('search', updatedFilters.search);
    }
    if (updatedFilters.category) {
      newSearchParams.set('category', updatedFilters.category);
    }
    if (updatedFilters.location) {
      newSearchParams.set('location', updatedFilters.location);
    }
    if (updatedFilters.featured) {
      newSearchParams.set('featured', 'true');
    }
    
    setSearchParams(newSearchParams);
  };

  const handleProjectClick = (project) => {
    // Navigate to project detail page
    window.location.href = `/projects/${project.id}`;
  };

  // Show search query in header if coming from search
  const searchQuery = filters.search;
  const headerTitle = searchQuery ? `Projects matching "${searchQuery}"` : 'Developer Projects';
  const headerDescription = searchQuery 
    ? `Showing results for "${searchQuery}" in our premium project portfolio`
    : 'Discover premium residential projects by top developers in Nashik';

  return (
    <div className="projects-page">
      <div className="projects-page__header">
        <h1>{headerTitle}</h1>
        <p className='projects-page__header__subtitle'>{headerDescription}</p>
        {searchQuery && (
          <div className="projects-page__search-info">
            <span className="projects-page__search-badge">Search Results</span>
          </div>
        )}
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
              {searchQuery && filteredProducts.length === 0 && !loading && (
                <div className="projects-page__no-results">
                  <p>No projects found for "{searchQuery}". Try different keywords or browse all projects.</p>
                  <button 
                    onClick={() => handleFilterChange({ search: '' })}
                    className="projects-page__clear-search"
                  >
                    Clear Search
                  </button>
                </div>
              )}
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