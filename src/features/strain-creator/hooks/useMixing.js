// Hook for managing the current mix, mixing history, and effects in strain creation.
// Provides functions to add ingredients, remove ingredients, reset the mix, and calculate effects.
// Automatically updates effects and mixing history based on seed selection and ingredient changes.

// Importing React hooks for state management and side effects.
import { useState, useEffect } from 'react';

// Importing utility functions for effect calculations and price recommendations.
import { calculateStrainEffects } from '@features/strain-creator/utils/determineEffects';
import { calculateRecommendedPrice } from '@features/strain-creator/utils/priceCalculations';

const useMixing = (selectedSeed, selectedDrugType, setSalePrice) => {
  // The selectedSeed state from custom useStrainSelection hook is used in this hook COMMENT REDO

  // State variables to manage the current mix, mixing history, and current effects:
  // These states are updated based on the selected seed and user interactions.
  const [currentMix, setCurrentMix] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [currentEffects, setCurrentEffects] = useState([]);

  // Effect to initialize the current effects and mixing history when a seed is selected:
  // If no seed is selected, it resets the current effects and mixing history.
  useEffect(() => {
    if (selectedSeed) {
      setCurrentMix([]);
      setCurrentEffects([selectedSeed.effect]);
      
      // Initialize mixing history with just the seed
      setMixingHistory([{
        step: 0,
        ingredient: "Base Seed",
        effectsBefore: [],
        effectsAfter: [selectedSeed.effect],
        changes: [`Added ${selectedSeed.effect}`]
      }]);

    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
      setCurrentMix([]);
    }
  }, [selectedSeed]);

  // Functions to manage the current mix:
  // These functions are used to manipulate the mix and effects based on user actions. 

  // addIngredient: Adds a new ingredient to the current mix, simulating its effects and updating the state.
  const addIngredient = (ingredient) => {
    // Add ingredient to the current mix
    const updatedMix = [...currentMix, ingredient];
    setCurrentMix(updatedMix);
    
    // Recalculate effects using the sequential approach
    if (selectedSeed) {
      const result = calculateStrainEffects(
        selectedSeed.effect, 
        updatedMix
      );
      
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      
      // Update recommended price
      const recommendedPrice = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      setSalePrice(recommendedPrice);
      }

   };

  // removeLastIngredient: Removes the last ingredient from the current mix and restores the previous effects.  
  const removeLastIngredient = () => {
    if (currentMix.length === 0) return;
    
    const updatedMix = currentMix.slice(0, currentMix.length - 1);
    setCurrentMix(updatedMix);
    
    // Recalculate effects using the sequential approach
    if (selectedSeed) {
      const result = calculateStrainEffects(
        selectedSeed.effect, 
        updatedMix
      );
      
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      
      // Update recommended price
      const recommendedPrice = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      setSalePrice(recommendedPrice);
    }
  };

  // resetMix: Resets the current mix and effects based on the selected seed or clears them if no seed is selected.
  const resetMix = () => {
    if (selectedSeed) {
      setCurrentEffects([selectedSeed.effect]);
      setMixingHistory([{
        step: 0,
        ingredient: "Base Seed",
        effectsBefore: [],
        effectsAfter: [selectedSeed.effect],
        changes: [`Added ${selectedSeed.effect}`]
      }]);
    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
    }
    setCurrentMix([]);
  };

  // Return the current mix, mixing history, current effects, and functions to manipulate them:
  // Allowing components using this hook to access and modify the mix and effects.
  return {
    currentMix,
    mixingHistory,
    currentEffects,
    addIngredient,
    removeLastIngredient,
    resetMix,
  };
};
export default useMixing;