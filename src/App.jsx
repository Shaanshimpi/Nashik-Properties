import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { PropertyProvider } from './context/PropertyContext.jsx';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary.jsx';

// CSS imports (unchanged)
import './styles/variables.css';
import './styles/reset.css';
import './styles/typography.css';
import './styles/globals.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/utilities.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PropertyProvider>
          <RouterProvider router={router} /> {/* ← Only router */}
        </PropertyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;