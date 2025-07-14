// SeedSelector component allows users to select a seed type based on the selected drug type.
// Filters the available seeds to match the selected drug type and displays them as buttons.ort React from 'react';
// Note: The definition 'seed' in this project is synonymous with the precursor or base product for the drug type.

// Import hooks and data for seed selection.
//import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';
import { drugTypes, seedTypes } from '@features/strain-creator/data/strainData';

const SeedSelector = ({ selectedDrugType, selectedSeed, setSelectedSeed }) => {
  // Use the strain selection hook to get the selected seed and drug type.
  // Filters the seed types based on the selected drug type.
  //const { selectedDrugType: currentDrugType } = useStrainSelection();
  const filteredSeeds = seedTypes.filter(seed => seed.drugType === selectedDrugType);
  
  // Render the seed selector with buttons for each filtered seed type.
  // Each button displays the seed name and cost, and highlights the selected seed.
  return (
    <div className="mb-6">
      {/* Display the precursor title based on the selected drug type, or default to 'Base Product' */}
      <h3 className="text-md font-medium text-gray-700 mb-2">
        Select {drugTypes[selectedDrugType]?.title || 'Base Product'}
      </h3>

      {/* Display the filtered seeds in a grid layout. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Each button shows the relevent data, has a unique key and applies styles based on whether it's selected. */}
        {filteredSeeds.map((seed) => (
          <button
            key={seed.name}
            className={`flex items-center justify-start gap-3 p-3 rounded-lg text-left transition-all duration-200
              bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-sm
              ${selectedSeed?.name === seed.name ? 'bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 shadow-md' : ''}`}
            onClick={() => setSelectedSeed(seed)}
          >
            {/* Add emoji icon based on the drugType data. */}
            <span className="text-2xl">{drugTypes[selectedDrugType]?.emoji || '🌱'}</span>
            
            {/* Seed details including name, cost, effect, and precursor/seed description. */}
            <div>
              <div className="font-medium">{seed.name}</div>
              <div className="text-sm text-gray-500">${seed.cost} - {seed.effect}</div>
              <div className="text-xs text-gray-500 mt-1">{drugTypes[selectedDrugType]?.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SeedSelector;