// src/components/StrainCreator/MixDisplay/MixSummaryDisplay.jsx
import React from 'react';

const MixSummaryDisplay = ({ selectedSeed, currentMix, currentEffects, getTotalCost }) => {
  if (!selectedSeed) return null;

  return (
    <div className="rounded border p-4 bg-white shadow mt-6">
      <h3 className="font-bold mb-2">Mix Summary</h3>
      <p className="mb-2">
        <strong className="text-purple-700">Base Seed:</strong>{' '}
        {selectedSeed.name} <span className="text-sm text-gray-500">({selectedSeed.effect})</span>
      </p>

      <div className="mb-4">
        <p className="font-semibold">Ingredient Sequence:</p>
        <ul className="list-disc list-inside text-sm mt-1 ml-2">
          {currentMix.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} <span className="text-gray-500">({ingredient.defaultEffect})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Final Effects:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {currentEffects.map((effect, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
            >
              {effect}
            </span>
          ))}
        </div>
      </div>

      <p>
        <strong>Cost per Unit:</strong> ${getTotalCost()}
      </p>
    </div>
  );
};

export default MixSummaryDisplay;
