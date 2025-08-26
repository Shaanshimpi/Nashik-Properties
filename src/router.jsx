import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertySingle from './pages/PropertySingle/PropertySingle';
import Projects from './pages/Projects/Projects';
import ProjectSingle from './pages/ProjectSingle/ProjectSingle';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import NotFound from './pages/NotFound/NotFound';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { getProperties, getPropertyById, formatProperty } from './services/api/wordpress';
import { getProducts, getProductWithVariations, formatProduct } from './services/api/woocommerce';

const cleanSearchParams = (searchParams) => {
  const params = {
    search: searchParams.get('search') || undefined,
    type: searchParams.get('type') || undefined,
    location: searchParams.get('location') || undefined,
    minPrice: searchParams.get('minPrice') || undefined,
    maxPrice: searchParams.get('maxPrice') || undefined,
    page: searchParams.get('page') || 1,
    per_page: 12,
    _embed: 'wp:term'
  };

  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  );
};

const cleanProjectSearchParams = (searchParams) => {
  const params = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    featured: searchParams.get('featured') === 'true',
    per_page: 12,
    page: searchParams.get('page') || 1
  };

  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
  );
};

// Property Loaders
const propertiesLoader = async ({ request }) => {
  const url = new URL(request.url);
  const cleanParams = cleanSearchParams(url.searchParams);

  try {
    const response = await getProperties(cleanParams);
    const formattedProperties = response.map(property => 
      formatProperty(property)
    );
    return { properties: formattedProperties };
  } catch (error) {
    console.error('Loader Error:', error);
    throw new Error('Failed to load properties');
  }
};

const featuredPropertiesLoader = async () => {
  try {
    let properties = await getProperties({ 
      per_page: 6,
      featured: true,
      _embed: 'wp:term'
    });

    if (!properties || properties.length === 0) {
      properties = await getProperties({ 
        per_page: 6,
        orderby: 'date',
        order: 'desc',
        _embed: 'wp:term'
      });
    }

    const formattedProperties = properties.map(formatProperty);
    return { properties: formattedProperties };
  } catch (error) {
    throw new Error('Failed to load featured properties');
  }
};

const propertyLoader = async ({ params }) => {
  try {
    const property = await getPropertyById(params.id);
    if (!property) {
      throw new Response("Not Found", { status: 404 });
    }
    return { property: formatProperty(property) };
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
};

// Project Loaders
const projectsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const cleanParams = cleanProjectSearchParams(url.searchParams);

  try {
    const response = await getProducts(cleanParams);
    const formattedProjects = response.map(project => 
      formatProduct(project)
    );
    return { projects: formattedProjects };
  } catch (error) {
    console.error('Projects Loader Error:', error);
    throw new Error('Failed to load projects');
  }
};

const featuredProjectsLoader = async () => {
  try {
    let projects = await getProducts({ 
      per_page: 3,
      featured: true
    });

    if (!projects || projects.length === 0) {
      projects = await getProducts({ 
        per_page: 3,
        orderby: 'date',
        order: 'desc'
      });
    }

    // Format projects without variations for featured display
    const formattedProjects = projects.map(project => {
      try {
        // For featured projects, we don't need variations, so we pass an empty array
        return formatProduct(project, []);
      } catch (error) {
        console.error(`Failed to format project ${project.id}:`, error);
        // Return a basic formatted product without variations
        return {
          id: project.id,
          name: project.name,
          slug: project.slug,
          description: project.description || '',
          short_description: project.short_description || '',
          price: parseFloat(project.price) || 0,
          images: project.images || [],
          featured: project.featured || false,
          display_price: project.price ? `₹${parseFloat(project.price).toLocaleString('en-IN')}` : 'Price on request'
        };
      }
    });
    
    return { projects: formattedProjects.filter(project => project !== null) };
  } catch (error) {
    console.error('Failed to load featured projects:', error);
    return { projects: [] }; // Return empty array instead of throwing to prevent page break
  }
};

const projectLoader = async ({ params }) => {
  try {
    const project = await getProductWithVariations(params.id);
    if (!project) {
      throw new Response("Not Found", { status: 404 });
    }
    return { project: formatProduct(project) };
  } catch (error) {
    console.error('Project Loader Error:', error);
    throw new Response("Not Found", { status: 404 });
  }
};

// Error Components
const PropertyErrorPage = () => (
  <div className="error-page">
    <h2>Property Not Found</h2>
    <p>The property you're looking for doesn't exist or may have been removed.</p>
    <a href="/properties">Browse all properties</a>
  </div>
);

const ProjectErrorPage = () => (
  <div className="error-page">
    <h2>Project Not Found</h2>
    <p>The project you're looking for doesn't exist or may have been removed.</p>
    <a href="/projects">Browse all projects</a>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          // Load both properties and projects for the home page
          try {
            const [propertiesData, projectsData] = await Promise.allSettled([
              featuredPropertiesLoader(),
              featuredProjectsLoader()
            ]);
            
            return {
              properties: propertiesData.status === 'fulfilled' ? propertiesData.value.properties : [],
              projects: projectsData.status === 'fulfilled' ? projectsData.value.projects : []
            };
          } catch (error) {
            console.error('Home loader error:', error);
            return { properties: [], projects: [] };
          }
        }
      },
      {
        path: "properties",
        element: <Properties />,
        loader: propertiesLoader
      },
      {
        path: "property/:id",
        element: <PropertySingle />,
        loader: propertyLoader,
        errorElement: <PropertyErrorPage />
      },
      {
        path: "projects",
        element: <Projects />,
        loader: projectsLoader
      },
      {
        path: "projects/:id",
        element: <ProjectSingle />,
        loader: projectLoader,
        errorElement: <ProjectErrorPage />
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default router;