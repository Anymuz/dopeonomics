/**
 * Reusable label-value display with flexible styling
 */
export const LabelValue = ({ 
  label, 
  value, 
  labelBold = false,
  valueClassName = '',
  className = ''
}) => {
  const labelClasses = labelBold ? 'font-bold' : 'font-medium';
  const containerClasses = `mb-2 ${className}`;

  return (
    <p className={containerClasses}>
      <span className={labelClasses}>{label}</span>{' '}
      <span className={valueClassName}>{value}</span>
    </p>
  );
};

/**
 * Specialized version for showing "None" fallbacks
 */
export const LabelValueWithFallback = ({ 
  label, 
  value, 
  fallback = 'None',
  labelBold = false,
  className = ''
}) => {
  return (
    <LabelValue
      label={label}
      value={value || fallback}
      labelBold={labelBold}
      valueClassName={!value ? 'text-gray-500' : ''}
      className={className}
    />
  );
};
