// Hook that manages the selection of drug types and seeds in the strain creator feature. 
// Provides state management for the selected drug type and seed, allowing components to access and modify these selections.
// Used for components that need to display or interact with the selected strain data.

//  Import React's useState hook and useEffect to manage state.
import { useState, useEffect } from 'react';

const useStrainSelection = (defaultDrugType = 'weed') => {
  // State variables to manage the selected drug type and seed:
  const [selectedDrugType, setSelectedDrugType] = useState(defaultDrugType);
  const [selectedSeed, setSelectedSeed] = useState();

  // Effect to reset the selected seed when the drug type changes:
  // This ensures that when a new drug type is selected, the seed is cleared.
  useEffect(() => {
    setSelectedSeed(null);
  }, [selectedDrugType]);

  // Returns the state and setters allowing components to access and modify as needed.
  return {
    selectedDrugType,
    setSelectedDrugType,
    selectedSeed,
    setSelectedSeed,
  };
};
export default useStrainSelection;