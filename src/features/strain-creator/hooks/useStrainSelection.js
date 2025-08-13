// Hook for managing drug type and seed selection in the strain creator.
// Provides state management for selected drug type and seed with automatic seed reset on drug type change.
// Used by components that need to display or interact with the selected strain data.

// Importing React hooks for state management and side effects.
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