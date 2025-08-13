// Utility function to format display values
// Handles various types and formats for consistent display
export const formatDisplayValue = (value, options = {}) => {
  const { type = 'auto', showCents = false, decimals = 0 } = options; // defaults

  // Handle null/undefined values
  if (value == null) return '';
  
  // Auto-detect formatting for backward compatibility
  // If type is 'auto', determine the type based on the value
  if (type === 'auto') {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') {
      return showCents ? `$${value.toFixed(2)}` : `$${Math.round(value)}`;
    }
    return String(value);
  }
  
  // Explicit formatting based on type
  // Handles various types and formats for consistent display
  switch (type) {
    case 'currency':
      if (typeof value !== 'number' || isNaN(value)) return '$0';
      return showCents ? `$${value.toFixed(2)}` : `$${Math.round(value)}`;
      
    case 'percentage':
      if (typeof value !== 'number' || isNaN(value)) return '0%';
      return `${value.toFixed(decimals)}%`;
      
    case 'number':
      if (typeof value === 'number') return value.toString();
      return String(value);
      
    case 'text':
    default:
      return String(value);
  }
};