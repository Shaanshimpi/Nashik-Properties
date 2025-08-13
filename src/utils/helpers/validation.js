// src/utils/helpers/validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  return String(value).length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return String(value).length <= maxLength;
};

export const validateNumericRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};
