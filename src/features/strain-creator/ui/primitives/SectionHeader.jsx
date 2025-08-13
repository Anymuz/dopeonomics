/**
 * Reusable section header with optional icon
 */
export const SectionHeader = ({ 
  children, 
  icon: Icon,
  iconColor = 'text-blue-500',
  className = ''
}) => {
  const headerClasses = `font-medium text-gray-800 flex items-center ${className}`;

  return (
    <div className={headerClasses}>
      {Icon && <Icon className={`mr-2 w-4 h-4 ${iconColor}`} />}
      {children}
    </div>
  );
};
