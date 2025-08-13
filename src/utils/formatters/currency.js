/**
 * Format currency in Indian Rupees
 * @param {number} amount - Amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const {
    showSymbol = true,
    showDecimals = false,
    locale = 'en-IN',
    currency = 'INR'
  } = options;

  if (!amount || isNaN(amount)) return '0';

  const formatOptions = {
    style: showSymbol ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  };

  try {
    const formatted = new Intl.NumberFormat(locale, formatOptions).format(amount);
    return showSymbol ? formatted : formatted.replace('₹', '').trim();
  } catch (error) {
    console.warn('Currency formatting error:', error);
    return showSymbol ? `₹${amount.toLocaleString()}` : amount.toLocaleString();
  }
};

/**
 * Format currency in short form (e.g., 1.5L, 2.5Cr)
 * @param {number} amount - Amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Short formatted currency string
 */
export const formatCurrencyShort = (amount, options = {}) => {
  const { showSymbol = true } = options;
  
  if (!amount || isNaN(amount)) return '0';
  
  const symbol = showSymbol ? '₹' : '';
  
  if (amount >= 10000000) { // 1 Crore
    const crores = amount / 10000000;
    return `${symbol}${crores.toFixed(crores % 1 === 0 ? 0 : 1)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh
    const lakhs = amount / 100000;
    return `${symbol}${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 1)}L`;
  } else if (amount >= 1000) { // 1 Thousand
    const thousands = amount / 1000;
    return `${symbol}${thousands.toFixed(thousands % 1 === 0 ? 0 : 1)}K`;
  } else {
    return `${symbol}${amount}`;
  }
};

/**
 * Format price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @param {Object} options - Formatting options
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (minPrice, maxPrice, options = {}) => {
  const { short = false } = options;
  const formatter = short ? formatCurrencyShort : formatCurrency;
  
  if (!minPrice && !maxPrice) return '';
  if (!minPrice) return `Up to ${formatter(maxPrice, options)}`;
  if (!maxPrice) return `From ${formatter(minPrice, options)}`;
  if (minPrice === maxPrice) return formatter(minPrice, options);
  
  return `${formatter(minPrice, options)} - ${formatter(maxPrice, options)}`;
};

/**
 * Parse currency string to number
 * @param {string} currencyString - Currency string to parse
 * @returns {number} Parsed number
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString === 'number') return currencyString;
  if (!currencyString) return 0;
  
  // Remove currency symbols and commas
  const cleaned = currencyString
    .replace(/[₹$,\s]/g, '')
    .replace(/[LlCcrRkK]/g, '');
  
  const number = parseFloat(cleaned);
  
  // Handle short forms
  if (currencyString.toLowerCase().includes('cr')) {
    return number * 10000000; // Convert Cr to actual value
  } else if (currencyString.toLowerCase().includes('l')) {
    return number * 100000; // Convert L to actual value
  } else if (currencyString.toLowerCase().includes('k')) {
    return number * 1000; // Convert K to actual value
  }
  
  return isNaN(number) ? 0 : number;
};

export default {
  formatCurrency,
  formatCurrencyShort,
  formatPriceRange,
  parseCurrency
};