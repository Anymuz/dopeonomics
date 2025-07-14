import React from 'react';
import { packagingTypes } from '@features/strain-creator/data/strainData';
import usePackaging from '@features/strain-creator/hooks/usePackaging';
import PackagingButton from '@features/strain-creator/ui/buttons/packagingButton';

const PackagingSelector = () => {
  const { packagingType, setPackagingType } = usePackaging('baggies');

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">Packaging Type</h3>
      <div className="flex gap-4">
        {packagingTypes.map(packaging => (
          <PackagingButton
            key={packaging.type}
            type={packaging.type}
            cost={packaging.cost}
            capacity={packaging.capacity}
            packagingType={packagingType}
            setPackagingType={setPackagingType}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagingSelector;

/* 
import React, { useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { calculateRecommendedPrice } from './pricing';

// Packaging Selector component
export const PackagingSelector = ({ packagingType, setPackagingType }) => (
  <div className="mb-6">
    <h3 className="text-md font-medium text-gray-700 mb-2">Packaging Type</h3>
    <div className="flex gap-4">
      <button
        className={`flex-1 p-3 rounded-lg border ${
          packagingType === 'baggies' 
            ? 'bg-green-50 border-green-500' 
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => setPackagingType('baggies')}
      >
        <div className="font-medium text-center">Baggies</div>
        <div className="text-sm text-center text-gray-500">$1 each</div>
      </button>
      
      <button
        className={`flex-1 p-3 rounded-lg border ${
          packagingType === 'jars' 
            ? 'bg-green-50 border-green-500' 
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => setPackagingType('jars')}
      >
        <div className="font-medium text-center">Jars</div>
        <div className="text-sm text-center text-gray-500">$3 per 5 buds</div>
      </button>
    </div>
  </div>
);
*/