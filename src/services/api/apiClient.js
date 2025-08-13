import axios from 'axios';
// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_WP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or additional headers here
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('API Request:', config);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log('API Response:', response);
    }
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized access');
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 500:
          // Handle server error
          console.error('Internal server error');
          break;
        default:
          console.error(`API Error ${status}:`, data?.message || 'Unknown error');
      }
      
      return Promise.reject({
        status,
        message: data?.message || `HTTP Error ${status}`,
        data: data
      });
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.request);
      return Promise.reject({
        status: 0,
        message: 'Network error - please check your connection',
        data: null
      });
    } else {
      // Other error
      console.error('Request setup error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'Request failed',
        data: null
      });
    }
  }
);

// Generic API methods
export const apiMethods = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return {
        success: true,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'GET request failed',
        status: error.status || 500
      };
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return {
        success: true,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'POST request failed',
        status: error.status || 500
      };
    }
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return {
        success: true,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'PUT request failed',
        status: error.status || 500
      };
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await apiClient.delete(endpoint);
      return {
        success: true,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'DELETE request failed',
        status: error.status || 500
      };
    }
  }
};

// Helper function to build query parameters
export const buildQueryParams = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  return searchParams.toString();
};

// Helper function to handle pagination
export const extractPaginationFromHeaders = (headers) => {
  return {
    totalItems: parseInt(headers['x-wp-total'] || '0'),
    totalPages: parseInt(headers['x-wp-totalpages'] || '1'),
    currentPage: 1 // This should be calculated based on the request
  };
};

export default apiClient;