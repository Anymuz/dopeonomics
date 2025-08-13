// Utility functions for filtering ingredients based on drug type compatibility.
// Used by the SequentialIngredientSelector to show only relevant ingredients for the selected drug type.
// Handles both common ingredients and drug-specific ingredients for proper filtering.

// Importing ingredient data for filtering operations.
import { ingredients } from '@features/strain-creator/data/ingredientData';

// Check if an ingredient is relevant for the selected drug type, optimised to avoid inefficient array recalculations
// Used by filterIngredients to determine ingredients, returns true if common or specific match for selected drug type
const isIngredientForDrug = (selectedDrugType, ingredient) => {
  // Default to 'weed' if drug type is null or undefined
  if (!selectedDrugType) selectedDrugType = 'weed'
  // Common if ingredient has no specificality property or the property is null.
  const isCommon = !ingredient.specificality;

  // Check if the ingredient is common or specific to the selected drug type.
  // Common always used and weed has no specific ingredients to include unlike meth and cocaine.
  if (selectedDrugType === 'weed') {
    return isCommon;
  } else if (selectedDrugType === 'meth') {
    return isCommon || ingredient.specificality === 'meth';
  } else if (selectedDrugType === 'cocaine') {
    return isCommon || ingredient.specificality === 'cocaine';
  } else {
    // For any other/unknown drug type, exclude the ingredient (should not happen in practice)
    console.warn(`Unknown drug type: ${selectedDrugType}. Ingredient filtering may not work as expected.`);
    return false;
  };
};

// Filters all ingredients and returns only ones for the selected drug type
// Used by the sequential ingredients selector UI component to display correct ingredients
export const filterIngredients = (selectedDrugType) => ingredients.filter(ingredient => isIngredientForDrug(selectedDrugType, ingredient));
