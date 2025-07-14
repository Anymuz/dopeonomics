// Custom hook to manage ingredient selection in the strain creator:
// Handles the state and logic for selecting ingredients, showing previews, and managing hover effects in the UI.
// Integrates with the useMixing to provide UX features in selecting and previewing ingredients.
// Uses the simulateAddIngredient utility to calculate the effects of ingredients when hovered over.

// Import useState, utility fuction to simulate adding an ingredient, and the useMixing hook.
import { useState } from 'react';
import { simulateAddIngredient } from '@features/strain-creator/utils/determineEffects';
import useMixing from '@features/Strain-creator/hooks/useMixing';

const useIngredientSelection = () => {
  // Current effects from the useMixing allows the selection to reflect the current state of the mix.
  const {currentEffects} = useMixing();

  // State variables to manage the visibility of the ingredient selection modal and hovered ingredient effects:
  // These states are used to control the UI and provide feedback to the user.
  const [showSelectIngredient, setShowSelectIngredient] = useState(false);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  const [hoveredEffects, setHoveredEffects] = useState(null);

  // Set the hovered ingredient and calculate the new effects based on the current mix.
  const handleIngredientHover = (ingredient) => {
    setHoveredIngredient(ingredient);
    
    // If simulateAddIngredient and currentEffects are available, show what effects will be from the hovered ingredient.
    if (simulateAddIngredient && currentEffects) {
      const simulation = simulateAddIngredient(currentEffects, ingredient); 
      setHoveredEffects(simulation.newEffects);
    }
  };

  // Clear the preview of the hovered ingredient and effects when the mouse leaves the ingredient area.
  const handleIngredientLeave = () => {
    setHoveredIngredient(null);
    setHoveredEffects(null);
  };

  // Return the state variables and handler functions to be used in the component.
  return {
    showSelectIngredient, setShowSelectIngredient,
    hoveredIngredient, setHoveredIngredient,
    hoveredEffects, setHoveredEffects,
    handleIngredientHover,
    handleIngredientLeave
  };
};
export default useIngredientSelection;