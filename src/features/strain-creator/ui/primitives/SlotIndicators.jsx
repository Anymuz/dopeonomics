/**
 * Reusable slot indicator for showing progress/capacity
 */
export const SlotIndicators = ({
  current,
  total,
  label = 'slots used',
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            i < current
              ? 'bg-green-500 border-green-600'
              : 'bg-gray-200 border-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">
        {current}/{total} {label}
      </span>
    </div>
  );
};
