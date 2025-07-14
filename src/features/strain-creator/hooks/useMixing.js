// Hooks for managing the current mix, mixing history, and current effects based on the selected seed.
// Provides functions to add ingredients, remove the last ingredient, and reset the mix.
// It also simulates the addition of ingredients to calculate new effects and updates the state accordingly

// Import hooks and utility functions:
import { useState, useEffect } from 'react';
import { simulateAddIngredient } from '@features/strain-creator/utils/determineEffects';
import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';

const useMixing = () => {
  // The selectedSeed state from custom useStrainSelection hook is used in this hook.
  const { selectedSeed } = useStrainSelection();

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
    const { newEffects } = simulateAddIngredient(currentEffects, ingredient);
    setCurrentMix([...currentMix, ingredient]);
    setMixingHistory([...mixingHistory, [...newEffects]]);
    setCurrentEffects(newEffects);
  };

  // removeLastIngredient: Removes the last ingredient from the current mix and restores the previous effects.  
  const removeLastIngredient = () => {
    const updatedMix = currentMix.slice(0, -1);
    const updatedHistory = mixingHistory.slice(0, -1);
    const restoredEffects = updatedHistory[updatedHistory.length - 1] || [];
    setCurrentMix(updatedMix);
    setMixingHistory(updatedHistory);
    setCurrentEffects(restoredEffects);
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