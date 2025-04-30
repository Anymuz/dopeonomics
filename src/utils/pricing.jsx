// pricing.js - Centralized pricing functions for the application

// Calculate effect multiplier for price calculations
export const calculateEffectMultiplier = (currentEffects) => {
  // Add a safety check to ensure currentEffects is an array
  if (!currentEffects || !Array.isArray(currentEffects) || currentEffects.length === 0) {
    return 0;
  }
  
  // Multiplier values for each effect
  const effectMultipliers = {
    'Anti-Gravity': 0.54,
    'Athletic': 0.32,
    'Balding': 0.30,
    'Bright-Eyed': 0.40,
    'Calming': 0.10,
    'Calorie-Dense': 0.28,
    'Cyclopean': 0.56,
    'Disorienting': 0.00,
    'Electrifying': 0.50,
    'Energizing': 0.22,
    'Euphoric': 0.18,
    'Explosive': 0.00,
    'Focused': 0.16,
    'Foggy': 0.36,
    'Gingeritis': 0.20,
    'Glowing': 0.48,
    'Jennerising': 0.42,
    'Laxative': 0.00,
    'Long-Faced': 0.52,
    'Munchies': 0.12,
    'Paranoia': 0.00,
    'Refreshing': 0.14,
    'Schizophrenia': 0.00,
    'Sedating': 0.26,
    'Seizure-Inducing': 0.00,
    'Shrinking': 0.60,
    'Slippery': 0.34,
    'Smelly': 0.00,
    'Sneaky': 0.24,
    'Spicy': 0.38,
    'Thought-Provoking': 0.44,
    'Toxic': 0.00,
    'Tropic Thunder': 0.46,
    'Zombifying': 0.58
  };
  
  // Sum up the multipliers for all effects
  return currentEffects.reduce((total, effect) => {
    return total + (effectMultipliers[effect] || 0);
  }, 0);
};

// Calculate recommended price based on drug type and effects
export const calculateRecommendedPrice = ({ effects = [], quality = 'Medium' }) => {
  const basePrice = 35;

  const qualityModifier = {
    Low: 0.8,
    Medium: 1.0,
    High: 1.2,
  }[quality] || 1.0;

  const effectBonus = effects.length * 0.1; // each effect adds 10%
  const effectMultiplier = 1 + effectBonus;

  return Math.floor(basePrice * qualityModifier * effectMultiplier);
};

// Calculate total yield units based on drug type
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

// Calculate total ingredient cost
export const calculateIngredientCost = (currentMix) => {
  if (!currentMix || !Array.isArray(currentMix)) {
    return 0;
  }
  
  return currentMix.reduce((total, ingredient) => {
    const quantity = ingredient.quantity || 1;
    return total + (ingredient.cost * quantity);
  }, 0);
};

// Calculate total cost including seed cost per unit
export const calculateTotalCost = (selectedSeed, currentMix) => {
  if (!selectedSeed) return 0;
  if (!currentMix || !Array.isArray(currentMix)) {
    currentMix = [];
  }
  
  const ingredientsCost = calculateIngredientCost(currentMix);
  
  // Calculate seed cost per unit based on drug type
  let seedCostPerUnit;
  const totalUnits = calculateTotalUnits(selectedSeed);
  
  seedCostPerUnit = selectedSeed.cost / totalUnits;
  
  return seedCostPerUnit + ingredientsCost;
};

// Calculate profit per unit
export const calculateProfit = (salePrice, selectedSeed, currentMix) => {
  return salePrice - calculateTotalCost(selectedSeed, currentMix);
};

// Calculate profit margin percentage
export const calculateProfitMargin = (salePrice, selectedSeed, currentMix) => {
  const cost = calculateTotalCost(selectedSeed, currentMix);
  if (cost === 0 || salePrice === 0) return 0;
  return ((salePrice - cost) / salePrice * 100).toFixed(1);
};

// Calculate total profit for entire batch with multiplier
export const calculateTotalBatchProfit = (salePrice, selectedSeed, currentMix, priceMultiplier) => {
  const profitPerUnit = calculateProfit(salePrice, selectedSeed, currentMix);
  const totalUnits = calculateTotalUnits(selectedSeed);
  return profitPerUnit * totalUnits * priceMultiplier;
};

// Calculate packaging costs and profit based on drug type
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

// Calculate the sale price from a target margin
export const calculateSalePriceFromMargin = (targetMargin, selectedSeed, currentMix) => {
  if (!targetMargin || !selectedSeed) return 0;
  
  const cost = calculateTotalCost(selectedSeed, currentMix);
  if (cost === 0) return 0;
  
  const margin = parseFloat(targetMargin) / 100;
  const calculatedPrice = cost / (1 - margin);
  return Math.round(calculatedPrice);
};

// Calculate packaging needs for a given quantity
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

// Calculate production plan data for a strain
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

export const calculateProductionCost = (ingredients) => {
  if (!Array.isArray(ingredients)) return 0;
  return ingredients.reduce((sum, item) => sum + (item.cost || 0), 0);
};
