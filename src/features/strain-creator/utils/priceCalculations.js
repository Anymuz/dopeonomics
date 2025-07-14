// Contains utility functions for calculating pricing, costs, and profits related to strain production in the strain creator feature of the application.
// It includes functions for calculating effect multipliers, recommended prices, total units produced, ingredient costs, total costs, profits, and production plans.
// It also handles packaging costs and profit margins based on sale prices and production costs.

import { effectDetails } from '@features/strain-creator/data/effectData'; // Import effect details for multipliers and descriptions

// Calculate the effect multiplier based on current effects:
// Returns the sum of multipliers for all effects, or 0 if no effects are present
export const calculateEffectMultiplier = (currentEffects) => {
  // Add a safety check to ensure currentEffects is an array
  if (!currentEffects || !Array.isArray(currentEffects) || currentEffects.length === 0) {
    return 0;
  }
  
  // Sum up the multipliers for all effects
  return currentEffects.reduce((total, effect) => {
    return total + (effectDetails[effect]?.multiplier || 0);
  }, 0);
};

// Calcuate the recommended price based on effects and product type:
// Returns a price based on the base price of the drug type and the effect multiplier.
export const calculateRecommendedPrice = (effects, productType = 'Weed') => {
  // Add safety check for effects
  if (!effects || !Array.isArray(effects)) {
    effects = [];
  }
  
  // Get base price based on drug type
  const basePrice = productType === 'Weed' ? 35 : 
                    productType === 'Meth' ? 70 : 
                    productType === 'Cocaine' ? 90 : 35;
  
  const effectMultiplier = calculateEffectMultiplier(effects);
  return Math.round(basePrice * (1 + effectMultiplier));
};

// Calculate total units produced based on selected seed:
// Returns the total number of units produced per seed based on the drug type.
export const calculateTotalUnits = (selectedSeed) => {
  if (!selectedSeed) return 0;
  
  if (selectedSeed.drugType === 'weed') {
    return 12; // Weed yields 12 buds per seed
  } else if (selectedSeed.drugType === 'meth') {
    return 10; // Meth yields 10 crystals per batch
  } else if (selectedSeed.drugType === 'cocaine') {
    return 10; // Cocaine yields 10 grams per batch
  }
  
  return 12; // Default fallback
};

// Calculate the cost of ingredients in the current mix:
// Returns the total cost of all ingredients, multiplying by their quantity if specified.
export const calculateIngredientCost = (currentMix) => {
  if (!currentMix || !Array.isArray(currentMix)) {
    return 0;
  }
  
  return currentMix.reduce((total, ingredient) => {
    const quantity = ingredient.quantity || 1;
    return total + (ingredient.cost * quantity);
  }, 0);
};

// Calculate total cost based on selected seed and current mix:
// Returns the total cost per unit, which is seed cost divided by total units plus ingredient costs
export const calculateTotalCost = (selectedSeed, currentMix, packagingType) => {
  if (!selectedSeed || !currentMix || !Array.isArray(currentMix)) return 0;
  
  const ingredientsCost = calculateIngredientCost(currentMix); 
  const packagingCost = calculatePackagingNeeds(calculateTotalUnits(selectedSeed), packagingType).cost;
  return selectedSeed.cost + ingredientsCost + packagingCost;
};

// Calculate profit based on sale price, selected seed, and current mix:
// Returns the profit per unit sold, which is sale price minus total cost.
export const calculateProfit = (salePrice, selectedSeed, currentMix) => {
  return salePrice - calculateTotalCost(selectedSeed, currentMix);
};

// Calculate profit margin percentage using sale price, selected seed, and current mix:
// Returns the profit margin as a percentage rounded to one decimal place.
export const calculateProfitMargin = (salePrice, selectedSeed, currentMix) => {
  const cost = calculateTotalCost(selectedSeed, currentMix);
  if (cost === 0 || salePrice === 0) return 0;
  return ((salePrice - cost) / salePrice * 100).toFixed(1);
};

// Returns the total profit for the batch using sale price, selected seed, current mix, and price multiplier:
export const calculateTotalBatchProfit = (salePrice, selectedSeed, currentMix, priceMultiplier) => {
  const profitPerUnit = calculateProfit(salePrice, selectedSeed, currentMix);
  const totalUnits = calculateTotalUnits(selectedSeed);
  return profitPerUnit * totalUnits * priceMultiplier;
};

// Calculate the profit after accounting for drug type and packaging costs:
// Takes into account the type of packaging (baggies or jars) and the total units produced.
// Returns the profit after subtracting packaging costs from total profit.
export const calculatePackagingProfit = (salePrice, selectedSeed, currentMix, packagingType) => {
  const profitPerUnit = calculateProfit(salePrice, selectedSeed, currentMix);
  const totalUnits = calculateTotalUnits(selectedSeed);
  
  if (packagingType === 'baggies') {
    // $1 per baggie, one unit per baggie
    const packagingCost = 1 * totalUnits;
    return (profitPerUnit * totalUnits) - packagingCost;
  } else {
    // Jars: $3 per jar, 5 units per jar, with the last jar potentially not full
    const jarsNeeded = Math.ceil(totalUnits / 5);
    const packagingCost = 3 * jarsNeeded;
    return (profitPerUnit * totalUnits) - packagingCost;
  }
};

// Calculate the sale price based on the target margin and current seed cost:
// Returns the sale price rounded to the nearest integer.
export const calculateSalePriceFromMargin = (targetMargin, selectedSeed, currentMix) => {
  if (!targetMargin || !selectedSeed) return 0;
  
  const cost = calculateTotalCost(selectedSeed, currentMix);
  if (cost === 0) return 0;
  
  const margin = parseFloat(targetMargin) / 100;
  const calculatedPrice = cost / (1 - margin);
  return Math.round(calculatedPrice);
};

// Calculate packaging needs for a given quantity:
// Determines the type and quantity of packaging needed based on the quantity and type.
// Returns an object with the type, quantity, and cost of packaging.
export const calculatePackagingNeeds = (quantity, type) => {
  if (type === 'baggies') {
    return {
      type: 'baggies',
      quantity: quantity,
      cost: quantity
    };
  } else {
    const jarsNeeded = Math.ceil(quantity / 5);
    return {
      type: 'jars',
      quantity: jarsNeeded,
      cost: jarsNeeded * 3
    };
  }
};

// Calculate production plan data for based on the strain and quantity:
// Includes seed cost, ingredient needs, packaging, and expected profit.
// Returns a production plan object with all necessary details.
export const calculateProductionPlan = (strain, quantity) => {
  // Safety checks
  if (!strain || !strain.seed) return null;
  
  // Ensure quantity is a valid number
  quantity = parseInt(quantity) || calculateTotalUnits(strain.seed);
  
  const seedsOrBatchesNeeded = Math.ceil(quantity / calculateTotalUnits(strain.seed));
  const seedCost = seedsOrBatchesNeeded * strain.seed.cost;
  
  const ingredientsNeeded = (strain.ingredients || []).map(ingredient => {
    const quantity = ingredient.quantity || 1;
    return {
      name: ingredient.name,
      quantity: quantity,
      totalCost: ingredient.cost * quantity
    };
  });
  
  const seedIngredient = {
    name: strain.seed.name,
    quantity: seedsOrBatchesNeeded,
    totalCost: seedCost
  };
  
  const packagingNeeded = calculatePackagingNeeds(quantity, strain.packagingType || 'baggies');
  
  const productionCost = seedCost + 
    (strain.ingredients || []).reduce((sum, ing) => {
      const quantity = ing.quantity || 1;
      return sum + (ing.cost * quantity);
    }, 0) + 
    packagingNeeded.cost;
  
  const expectedRevenue = strain.salePrice * quantity;
  const expectedProfit = expectedRevenue - productionCost;
  

  return {
    id: Date.now(),
    strainId: strain.id,
    strainName: strain.name,
    drugType: strain.drugType || 'weed',
    plannedQuantity: quantity,
    status: 'planned',
    dateCreated: new Date().toISOString(),
    dateSold: null,
    totalIngredientNeeds: [seedIngredient, ...ingredientsNeeded],
    packagingNeeded: packagingNeeded,
    productionCost: productionCost,
    expectedRevenue: expectedRevenue,
    expectedProfit: expectedProfit
  };
  
};

// Calculate production cost based on ingredients:
// sums up the cost of all ingredients in the production plan.
// Returns the total cost of production
// If ingredients is not an array, it returns 0
export const calculateProductionCost = (ingredients) => {
  if (!Array.isArray(ingredients)) return 0;
  return ingredients.reduce((sum, item) => sum + (item.cost || 0), 0);
};
