// DrugTypeSelector.js
import React from 'react';
import { drugTypes } from './straindata';

export const DrugTypeSelector = ({ selectedDrugType, onSelectDrugType }) => {
  // Convert drugTypes object to array for mapping
  const drugTypeArray = Object.entries(drugTypes).map(([key, value]) => ({
    id: key,
    ...value
  }));

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">Select Product Type</h3>
      <div className="grid grid-cols-3 gap-4">
        {drugTypeArray.map((drugType) => (
          <button
            key={drugType.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
              ${selectedDrugType === drugType.id 
                ? 'bg-blue-50 border-blue-500 shadow-md' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
            onClick={() => onSelectDrugType(drugType.id)}
          >
            <span className="text-3xl">{drugType.emoji}</span>
            <div className="font-medium text-center">{drugType.name}</div>
            <div className="text-xs text-gray-500 text-center">${drugType.basePrice} per {drugType.unit}</div>
          </button>
        ))}
      </div>
    </div>
  );
};