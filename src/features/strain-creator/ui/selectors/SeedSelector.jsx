// SeedSelector - Component for selecting seed types based on the selected drug type.
// Filters and displays available seeds that match the selected drug type as selectable buttons.
// Note: The definition 'seed' in this project is synonymous with the precursor or base product for the drug type.

// Importing data and UI components for seed selection.
import { drugTypes, seedTypes } from '@features/strain-creator/data/strainData';
import SelectorHeader from '@features/strain-creator/ui/primitives/SelectorHeader';
import SeedButton from '@features/strain-creator/ui/buttons/SeedButton';

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
      <SelectorHeader>
        Select {drugTypes[selectedDrugType]?.title || 'Base Product'}
      </SelectorHeader>

      {/* Display the filtered seeds in a grid layout. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredSeeds.map((seed) => (
          <SeedButton
            key={seed.name}
            seed={seed}
            selectedSeed={selectedSeed}
            setSelectedSeed={setSelectedSeed}
            selectedDrugType={selectedDrugType}
            drugTypes={drugTypes}
          />
        ))}
      </div>
    </div>
  );
};
export default SeedSelector;