// src/components/StrainCreator/SeedSelector.jsx
import React from 'react';

const SeedSelector = ({ seedTypes, selectedSeed, onSelectSeed, selectedDrugType }) => {
  const filteredSeeds = seedTypes.filter(seed => seed.drugType === selectedDrugType);

  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Select Seed:</h3>
      <div className="flex flex-wrap gap-3">
        {filteredSeeds.map((seed, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSeed(seed)}
            className={`px-3 py-2 border rounded ${
              selectedSeed?.name === seed.name
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {seed.name} (${seed.cost})
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeedSelector;
