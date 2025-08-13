// DisplayCard - Shared container component for consistent display styling.
// Provides standardized border, padding, and background styling for all display components.

// Simple card container component used by all display components.
export const DisplayCard = ({ children, className = '' }) => (
  <div className={`p-4 border rounded bg-gray-50 ${className}`}>
    {children}
  </div>
);
