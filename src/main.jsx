import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './styles/reset.css';
import './styles/variables.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App /> {/* ← No BrowserRouter here! */}
    </HelmetProvider>
  </React.StrictMode>,
);