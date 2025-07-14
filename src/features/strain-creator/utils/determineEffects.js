// Contains utility functions for calculating strain effects based on ingredients and their interactions.
// It includes functions to get default effects, calculate strain effects based on a seed effect and a sequence of ingredients,
// and simulate the addition of an ingredient to the current effects.

import { ingredients } from '@features/strain-creator/data/ingredientData'; // Import the ingredient data.

// Create an object where each key is the ingredient name and the value is its default effect:
// This allows for fast access to the default effect of any ingredient by its name.
const getAdditiveEffects = () =>{
  return ingredients.reduce((accumulator, ingredient) => {
    accumulator[ingredient.name] = ingredient.defaultEffect;
    return accumulator;
  }, {});
};

// Map ingredient names to their default effects using the getAddictiveEffects function:
// Used to quickly look up the default effect of any ingredient by its name.
export const additiveEffects = getAdditiveEffects();
// Usage: additiveEffects['Banana'] returns 'Gingeritis'.

// Calculates strain effects:
// Based on the mixing of a base seed effect with a sequence of ingredients, applying transformations and adding default effects.
// Enforces an 8-effect limit and returns the final effects and a history of mixing steps for UI display.
export const calculateStrainEffects = (seedEffect, ingredientsSequence) => {
  if (!seedEffect || !ingredientsSequence || ingredientsSequence.length === 0) {
    return {
      finalEffects: seedEffect ? [seedEffect] : [],
      mixingHistory: seedEffect ? [{
        step: 0,
        ingredient: "Base Seed",
        effectsBefore: [],
        effectsAfter: [seedEffect],
        changes: [`Added ${seedEffect}`]
      }] : []
    };
  }
  
  // Start with the seed effect
  let currentEffects = [seedEffect];
  
  // Store the history of effect changes for UI display
  const mixingHistory = [{
    step: 0,
    ingredient: "Base Seed",
    effectsBefore: [],
    effectsAfter: [...currentEffects],
    changes: [`Added ${seedEffect}`]
  }];
  
  // Process each ingredient one by one in sequence
  ingredientsSequence.forEach((ingredient, index) => {
    const effectsBefore = [...currentEffects];
    
    // 1. Apply interactions (transformations) based on this ingredient
    if (ingredient.interactions && ingredient.interactions.length > 0) {
      // Create a new array for the effects after transformations
      let transformedEffects = [...currentEffects];
      
      // For each interaction rule, check if the effect exists and transform it
      // ONLY if the replacement effect is not already present
      ingredient.interactions.forEach(interaction => {
        const effectIndex = transformedEffects.findIndex(effect => effect === interaction.if);
        
        // Only apply transformation if:
        // 1. The target effect exists AND
        // 2. The replacement effect is NOT already in the effects list
        if (effectIndex !== -1 && !transformedEffects.includes(interaction.replaceWith)) {
          transformedEffects[effectIndex] = interaction.replaceWith;
        }
      });
      
      currentEffects = transformedEffects;
    }
    
    // Track what effects changed due to interactions
    const transformations = [];
    for (let i = 0; i < Math.min(effectsBefore.length, currentEffects.length); i++) {
      if (currentEffects[i] !== effectsBefore[i]) {
        transformations.push(`${effectsBefore[i]} → ${currentEffects[i]}`);
      }
    }
    
    // 2. Add the ingredient's default effect if not already present and under the 8 effects limit
    const defaultEffect = ingredient.defaultEffect;
    
    if (defaultEffect && currentEffects.length < 8 && !currentEffects.includes(defaultEffect)) {
      currentEffects.push(defaultEffect);
      transformations.push(`Added ${defaultEffect}`);
    }
    
    // Limit to maximum 8 effects
    if (currentEffects.length > 8) {
      const removed = currentEffects.slice(8);
      currentEffects = currentEffects.slice(0, 8);
      transformations.push(`Removed effects due to 8-effect limit: ${removed.join(', ')}`);
    }
    
    // Record this step in the mixing history
    mixingHistory.push({
      step: index + 1,
      ingredient: ingredient.name,
      effectsBefore: effectsBefore,
      effectsAfter: [...currentEffects],
      changes: transformations.length > 0 ? transformations : ["No change"]
    });
  });
  
  // Return both the final effects and the history for UI display
  return {
    finalEffects: currentEffects,
    mixingHistory: mixingHistory
  };
};



// Simulate the addition of an ingredient to the current effects, applying transformations and adding default effects:
// Returns the new effects, any transformations applied, whether a default effect was added, and the default effect itself.
// Used for previewing the effects of adding an ingredient without modifying the actual state
export const simulateAddIngredient = (currentEffects, ingredient) => {
  if (!currentEffects || !ingredient) return { newEffects: [...currentEffects], changes: ["No change"] };

  let newEffects = [...currentEffects];
  const transformations = [];

  // Apply interactions
  if (ingredient.interactions && ingredient.interactions.length > 0) {
    ingredient.interactions.forEach(interaction => {
      const effectIndex = newEffects.findIndex(effect => effect === interaction.if);
      
      // Only apply transformation if:
      // 1. The target effect exists AND 
      // 2. The replacement effect is NOT already in the effects list
      if (effectIndex !== -1 && !newEffects.includes(interaction.replaceWith)) {
        const oldEffect = newEffects[effectIndex];
        newEffects[effectIndex] = interaction.replaceWith;
         transformations.push({
          from: oldEffect,
          to: interaction.replaceWith
        });
      }
    });
  }

  // Add default effect if possible
  let addedDefaultEffect = false;
  if (ingredient.defaultEffect && newEffects.length < 8 && !newEffects.includes(ingredient.defaultEffect)) {
    newEffects.push(ingredient.defaultEffect);
    addedDefaultEffect = true;
    transformations.push(`Added ${ingredient.defaultEffect}`);
  }

  if (transformations.length === 0) transformations.push("No change");

  return {
    newEffects,
    transformations,
    addedDefaultEffect,
    defaultEffect: ingredient.defaultEffect
  };
};