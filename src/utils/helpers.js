// Utility functions 
// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password validation
  export const isValidPassword = (password) => {
    return password.length >= 6;
  };
  
  // Form validation
  export const validateForm = (email, password) => {
    if (!isValidEmail(email)) {
      return { valid: false, message: 'Invalid email format' };
    }
  
    if (!isValidPassword(password)) {
      return { valid: false, message: 'Password should be at least 6 characters' };
    }
  
    return { valid: true, message: '' };
  };
  