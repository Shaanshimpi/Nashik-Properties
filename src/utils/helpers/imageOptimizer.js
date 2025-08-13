/**
 * Image optimization utilities for WordPress and general use
 */

/**
 * Optimize image URL with width and quality parameters
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized image URL
 */
export const optimizeImageUrl = (url, width = 800, quality = 80) => {
  if (!url) return '';
  
  // Check if it's a WordPress image URL
  if (url.includes('wp-content/uploads')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&quality=${quality}`;
  }
  
  // For external images, return as-is
  return url;
};

/**
 * Generate multiple image sizes for responsive images
 * @param {string} baseUrl - Base image URL
 * @returns {Object} Object with different image sizes
 */
export const generateImageSizes = (baseUrl) => {
  if (!baseUrl) {
    return {
      thumbnail: '',
      small: '',
      medium: '',
      large: '',
      xlarge: '',
      original: ''
    };
  }

  return {
    thumbnail: optimizeImageUrl(baseUrl, 150, 85),
    small: optimizeImageUrl(baseUrl, 300, 85),
    medium: optimizeImageUrl(baseUrl, 600, 80),
    large: optimizeImageUrl(baseUrl, 1024, 80),
    xlarge: optimizeImageUrl(baseUrl, 1440, 75),
    original: baseUrl
  };
};

/**
 * Generate srcSet for responsive images
 * @param {string} baseUrl - Base image URL
 * @param {Array} breakpoints - Array of width breakpoints
 * @returns {string} srcSet string for img element
 */
export const generateSrcSet = (baseUrl, breakpoints = [300, 600, 900, 1200]) => {
  if (!baseUrl) return '';
  
  return breakpoints
    .map(width => `${optimizeImageUrl(baseUrl, width)} ${width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param {Array} sizes - Array of size configurations
 * @returns {string} sizes string for img element
 */
export const generateSizes = (sizes = [
  { breakpoint: '(max-width: 640px)', size: '100vw' },
  { breakpoint: '(max-width: 1024px)', size: '50vw' },
  { breakpoint: '', size: '33vw' }
]) => {
  return sizes
    .map(({ breakpoint, size }) => breakpoint ? `${breakpoint} ${size}` : size)
    .join(', ');
};

/**
 * Create placeholder image URL or data URI
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @param {string} color - Background color
 * @param {string} textColor - Text color
 * @param {string} text - Placeholder text
 * @returns {string} Data URI for placeholder image
 */
export const createPlaceholder = (
  width = 400, 
  height = 300, 
  color = '#f0f0f0', 
  textColor = '#999999',
  text = `${width}×${height}`
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = textColor;
  ctx.font = `${Math.min(width, height) / 10}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toDataURL();
};

/**
 * Lazy load image with intersection observer
 * @param {HTMLImageElement} img - Image element
 * @param {Object} options - Intersection observer options
 */
export const lazyLoadImage = (img, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.src;
        const srcset = image.dataset.srcset;
        
        if (src) {
          image.src = src;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        
        image.classList.remove('lazy-loading');
        image.classList.add('lazy-loaded');
        
        observer.unobserve(image);
      }
    });
  }, observerOptions);
  
  observer.observe(img);
};

/**
 * Preload critical images
 * @param {Array} urls - Array of image URLs to preload
 * @param {Function} onLoad - Callback when all images are loaded
 * @param {Function} onError - Callback when an image fails to load
 */
export const preloadImages = (urls, onLoad, onError) => {
  const promises = urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  Promise.allSettled(promises)
    .then(results => {
      const successful = results.filter(result => result.status === 'fulfilled');
      const failed = results.filter(result => result.status === 'rejected');
      
      if (onLoad) onLoad(successful.map(result => result.value));
      if (onError && failed.length > 0) onError(failed.map(result => result.reason));
    });
};

/**
 * Check if image URL is valid and accessible
 * @param {string} url - Image URL to validate
 * @returns {Promise<boolean>} Promise resolving to true if image is valid
 */
export const validateImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Extract image dimensions from URL or load image to get dimensions
 * @param {string} url - Image URL
 * @returns {Promise<Object>} Promise resolving to {width, height}
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

export default {
  optimizeImageUrl,
  generateImageSizes,
  generateSrcSet,
  generateSizes,
  createPlaceholder,
  lazyLoadImage,
  preloadImages,
  validateImageUrl,
  getImageDimensions
};