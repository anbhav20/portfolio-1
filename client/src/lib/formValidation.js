export const validateForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.length < 10) {
    errors.message = 'Message should be at least 10 characters';
  }
  
  return errors;
};