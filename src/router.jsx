import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertySingle from './pages/PropertySingle/PropertySingle';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import NotFound from './pages/NotFound/NotFound';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { getProperties, getPropertyById, formatProperty } from './services/api/wordpress';

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

const PropertyErrorPage = () => (
  <div className="error-page">
    <h2>Property Not Found</h2>
    <p>The property you're looking for doesn't exist or may have been removed.</p>
    <a href="/properties">Browse all properties</a>
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
        loader: featuredPropertiesLoader
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