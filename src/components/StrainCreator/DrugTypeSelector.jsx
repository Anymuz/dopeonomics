// src/components/StrainCreator/DrugTypeSelector.jsx
import React from 'react';
import { drugTypes } from '@data/straindata';

const DrugTypeSelector = ({ selectedDrugType, onSelectDrugType }) => {
  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Select Drug Type:</h3>
      <div className="flex gap-4">
        {Object.entries(drugTypes).map(([key, drug]) => (
          <button
            key={key}
            onClick={() => onSelectDrugType(key)}
            className={`px-4 py-2 rounded border ${
              selectedDrugType === key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {drug.emoji} {drug.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DrugTypeSelector;
