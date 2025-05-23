// src/components/StrainCreator/PackagingSelector.jsx
import React from 'react';

const PackagingSelector = ({ packagingType, setPackagingType }) => {
  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Packaging Type:</h3>
      <div className="flex gap-4">
        {['baggies', 'jars'].map(type => (
          <button
            key={type}
            onClick={() => setPackagingType(type)}
            className={`px-3 py-2 rounded border ${
              packagingType === type ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackagingSelector;
