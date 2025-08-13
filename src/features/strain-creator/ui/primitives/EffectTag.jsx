// EffectTag - Shared component for displaying effect names with consistent styling.
// Provides standardized green badge styling for effect display across all components.

// Simple effect tag component used for displaying effects across multiple components.
export const EffectTag = ({ children }) => (
  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
    {children}
  </span>
);
