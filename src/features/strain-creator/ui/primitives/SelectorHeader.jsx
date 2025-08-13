// SelectorHeader - Shared header component for all selector components.
// Provides consistent header styling and typography for selector sections in the strain creator.

// Shared header component used across all selector components in the strain creator.
const SelectorHeader = ({ children, className = "" }) => (
  <h3 className={`text-md font-medium text-gray-700 mb-2 ${className}`}>
    {children}
  </h3>
);

export default SelectorHeader;
