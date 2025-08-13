/**
 * Reusable section divider with optional top spacing
 */
export const SectionDivider = ({ 
  className = '',
  spacing = 'normal' // 'tight', 'normal', 'loose'
}) => {
  const spacingClasses = {
    tight: 'pt-2 mt-2',
    normal: 'pt-4 mt-4', 
    loose: 'pt-6 mt-6'
  };

  const dividerClasses = `border-t border-gray-200 ${spacingClasses[spacing]} ${className}`;

  return <div className={dividerClasses} />;
};
