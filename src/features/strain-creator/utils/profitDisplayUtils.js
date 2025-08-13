// Utility functions for profit display formatting and styling in strain creator components.
// Provides consistent color coding for profit/loss values and packaging display formatting.

// Importing shared utility functions and packaging data.
import { formatDisplayValue } from '@shared/utils/displayUtils';
import { formatTitle } from '@shared/utils/stringUtils';
import { packagingTypes } from '@features/strain-creator/data/strainData';

// Utility function to get profit color based on value
export const getProfitColor = (value, isProfit = true) => {
  if (!isProfit) return 'text-gray-800';
  return value >= 0 ? 'text-green-600' : 'text-red-600';
};

// Utility function to format packaging display
// Bases the format of the packaging display on the packaging type and cost making it dynamic.
export const formatPackagingDisplay = (packagingTypeKey, unit = 'units') => {
  const packagingData = packagingTypes.find(packaging => packaging.type === packagingTypeKey);
  
  if (!packagingData) return packagingTypeKey; // Fallback to raw key
  
  const { type, cost, capacity } = packagingData;
  const unitText = capacity === 1 ? 'each' : `per ${capacity} ${unit}`;
  
  return `${formatTitle(type)} (${formatDisplayValue(cost, { type: 'currency' })} ${unitText})`;
};
