// Revised straindata.js with accurate interactions
// Based on the game mechanics and properly implementing transformations

export const seedTypes = [
  // Weed seeds
  { name: 'OG Kush Seed', cost: 30, effect: 'Calming', drugType: 'weed' },
  { name: 'Sour Diesel Seed', cost: 35, effect: 'Refreshing', drugType: 'weed' },
  { name: 'Green Crack Seed', cost: 40, effect: 'Energizing', drugType: 'weed' },
  { name: 'Granddaddy Purple Seed', cost: 45, effect: 'Sedating', drugType: 'weed' },
  
  // Meth "seeds"
  { name: 'Low-Quality Pseudo', cost: 140, effect: 'Energizing', drugType: 'meth' },
  { name: 'Standard Pseudo', cost: 160, effect: 'Electrifying', drugType: 'meth' },
  { name: 'High-Quality Pseudo', cost: 190, effect: 'Bright-Eyed', drugType: 'meth' },
  
  // Cocaine "seeds"
  { name: 'Standard Coca Leaves', cost: 210, effect: 'Euphoric', drugType: 'cocaine' },
  { name: 'Premium Coca Leaves', cost: 210, effect: 'Focused', drugType: 'cocaine' },
  { name: 'Heavenly Coca Leaves', cost: 210, effect: 'Thought-Provoking', drugType: 'cocaine' }
];

export const ingredients = [
    { 
      name: 'Cuke', 
      cost: 2, 
      emoji: '🥤', 
      defaultEffect: 'Energizing',
      interactions: [
        { if: 'Toxic', replaceWith: 'Euphoric' },
        { if: 'Slippery', replaceWith: 'Munchies' },
        { if: 'Sneaky', replaceWith: 'Paranoia' },
        { if: 'Foggy', replaceWith: 'Cyclopean' },
        { if: 'Gingeritis', replaceWith: 'Thought-Provoking' },
        { if: 'Munchies', replaceWith: 'Athletic' },
        { if: 'Euphoric', replaceWith: 'Laxative' }
      ] 
    },
    { 
      name: 'Banana', 
      cost: 2, 
      emoji: '🍌',
      defaultEffect: 'Gingeritis',
      interactions: [
        { if: 'Energizing', replaceWith: 'Thought-Provoking' },
        { if: 'Calming', replaceWith: 'Sneaky' },
        { if: 'Toxic', replaceWith: 'Smelly' },
        { if: 'Long-Faced', replaceWith: 'Refreshing' },
        { if: 'Cyclopean', replaceWith: 'Thought-Provoking' },
        { if: 'Disorienting', replaceWith: 'Focused' },
        { if: 'Focused', replaceWith: 'Seizure-Inducing' },
        { if: 'Paranoia', replaceWith: 'Jennerising' },
        { if: 'Smelly', replaceWith: 'Anti-Gravity' }
      ]
    },
    { 
      name: 'Paracetamol', 
      cost: 3, 
      emoji: '⚪',
      defaultEffect: 'Sneaky',
      interactions: [
        { if: 'Energizing', replaceWith: 'Paranoia' },
        { if: 'Calming', replaceWith: 'Slippery' },
        { if: 'Toxic', replaceWith: 'Tropic Thunder' },
        { if: 'Spicy', replaceWith: 'Bright-Eyed' },
        { if: 'Glowing', replaceWith: 'Toxic' },
        { if: 'Foggy', replaceWith: 'Calming' },
        { if: 'Munchies', replaceWith: 'Anti-Gravity' },
        { if: 'Paranoia', replaceWith: 'Balding' },
        { if: 'Electrifying', replaceWith: 'Athletic' },
        { if: 'Focused', replaceWith: 'Gingeritis' }
      ]
    },
    { 
      name: 'Donut', 
      cost: 3, 
      emoji: '🍩',
      defaultEffect: 'Calorie-Dense',
      interactions: [
        { if: 'Calorie-Dense', replaceWith: 'Explosive' },
        { if: 'Balding', replaceWith: 'Sneaky' },
        { if: 'Anti-Gravity', replaceWith: 'Slippery' },
        { if: 'Jennerising', replaceWith: 'Gingeritis' },
        { if: 'Focused', replaceWith: 'Euphoric' },
        { if: 'Shrinking', replaceWith: 'Energizing' }
      ]
    },
    { 
      name: 'Viagra', 
      cost: 4, 
      emoji: '🍆',
      defaultEffect: 'Tropic Thunder',
      interactions: [
        { if: 'Athletic', replaceWith: 'Sneaky' },
        { if: 'Euphoric', replaceWith: 'Bright-Eyed' },
        { if: 'Laxative', replaceWith: 'Calming' },
        { if: 'Disorienting', replaceWith: 'Toxic' }
      ]
    },
    { 
      name: 'Mouth Wash', 
      cost: 4, 
      emoji: '💧',
      defaultEffect: 'Balding',
      interactions: [
        { if: 'Calming', replaceWith: 'Anti-Gravity' },
        { if: 'Calorie-Dense', replaceWith: 'Sneaky' },
        { if: 'Explosive', replaceWith: 'Sedating' },
        { if: 'Focused', replaceWith: 'Jennerising' }
      ]
    },
    { 
      name: 'Flu Medicine', 
      cost: 5, 
      emoji: '🍇',
      defaultEffect: 'Sedating',
      interactions: [
        { if: 'Calming', replaceWith: 'Bright-Eyed' },
        { if: 'Athletic', replaceWith: 'Munchies' },
        { if: 'Thought-Provoking', replaceWith: 'Gingeritis' },
        { if: 'Cyclopean', replaceWith: 'Foggy' },
        { if: 'Munchies', replaceWith: 'Slippery' },
        { if: 'Laxative', replaceWith: 'Euphoric' },
        { if: 'Euphoric', replaceWith: 'Toxic' },
        { if: 'Focused', replaceWith: 'Calming' },
        { if: 'Electrifying', replaceWith: 'Refreshing' },
        { if: 'Shrinking', replaceWith: 'Paranoia' }
      ]
    },
    { 
      name: 'Gasoline', 
      cost: 5, 
      emoji: '⛽',
      defaultEffect: 'Toxic',
      interactions: [
        { if: 'Gingeritis', replaceWith: 'Smelly' },
        { if: 'Jennerising', replaceWith: 'Sneaky' },
        { if: 'Sneaky', replaceWith: 'Tropic Thunder' },
        { if: 'Munchies', replaceWith: 'Sedating' },
        { if: 'Energizing', replaceWith: 'Euphoric' },
        { if: 'Euphoric', replaceWith: 'Energizing' },
        { if: 'Laxative', replaceWith: 'Foggy' },
        { if: 'Disorienting', replaceWith: 'Glowing' },
        { if: 'Paranoia', replaceWith: 'Calming' },
        { if: 'Electrifying', replaceWith: 'Disorienting' },
        { if: 'Shrinking', replaceWith: 'Focused' }
      ]
    },
    { 
      name: 'Energy Drink', 
      cost: 6, 
      emoji: '🐂',
      defaultEffect: 'Athletic',
      interactions: [
        { if: 'Sedating', replaceWith: 'Munchies' },
        { if: 'Euphoric', replaceWith: 'Energizing' },
        { if: 'Spicy', replaceWith: 'Euphoric' },
        { if: 'Tropic Thunder', replaceWith: 'Sneaky' },
        { if: 'Glowing', replaceWith: 'Disorienting' },
        { if: 'Foggy', replaceWith: 'Laxative' },
        { if: 'Disorienting', replaceWith: 'Electrifying' },
        { if: 'Schizophrenia', replaceWith: 'Balding' },
        { if: 'Focused', replaceWith: 'Shrinking' }
      ]
    },
    { 
      name: 'Motor Oil', 
      cost: 6, 
      emoji: '🛢️',
      defaultEffect: 'Slippery',
      interactions: [
        { if: 'Energizing', replaceWith: 'Munchies' },
        { if: 'Foggy', replaceWith: 'Toxic' },
        { if: 'Euphoric', replaceWith: 'Sedating' },
        { if: 'Paranoia', replaceWith: 'Anti-Gravity' },
        { if: 'Munchies', replaceWith: 'Schizophrenia' }
      ]
    },
    { 
      name: 'Mega Bean', 
      cost: 7, 
      emoji: '🫛',
      defaultEffect: 'Foggy',
      interactions: [
        { if: 'Energizing', replaceWith: 'Cyclopean' },
        { if: 'Calming', replaceWith: 'Glowing' },
        { if: 'Athletic', replaceWith: 'Laxative' },
        { if: 'Sneaky', replaceWith: 'Calming' },
        { if: 'Jennerising', replaceWith: 'Paranoia' },
        { if: 'Slippery', replaceWith: 'Toxic' },
        { if: 'Thought-Provoking', replaceWith: 'Energizing' },
        { if: 'Seizure-Inducing', replaceWith: 'Focused' },
        { if: 'Focused', replaceWith: 'Disorienting' },
        { if: 'Shrinking', replaceWith: 'Electrifying' }
      ]
    },
    { 
      name: 'Chili', 
      cost: 7, 
      emoji: '🌶️',
      defaultEffect: 'Spicy',
      interactions: [
        { if: 'Athletic', replaceWith: 'Euphoric' },
        { if: 'Anti-Gravity', replaceWith: 'Tropic Thunder' },
        { if: 'Sneaky', replaceWith: 'Bright-Eyed' },
        { if: 'Munchies', replaceWith: 'Toxic' },
        { if: 'Laxative', replaceWith: 'Long-Faced' },
        { if: 'Shrinking', replaceWith: 'Refreshing' }
      ]
    },
    { 
      name: 'Battery', 
      cost: 8, 
      emoji: '🔋',
      defaultEffect: 'Bright-Eyed',
      interactions: [
        { if: 'Munchies', replaceWith: 'Tropic Thunder' },
        { if: 'Euphoric', replaceWith: 'Zombifying' },
        { if: 'Electrifying', replaceWith: 'Euphoric' },
        { if: 'Laxative', replaceWith: 'Calorie-Dense' },
        { if: 'Cyclopean', replaceWith: 'Glowing' },
        { if: 'Shrinking', replaceWith: 'Munchies' }
      ]
    },
    { 
      name: 'Iodine', 
      cost: 8, 
      emoji: '🟠',
      defaultEffect: 'Jennerising',
      interactions: [
        { if: 'Calming', replaceWith: 'Balding' },
        { if: 'Toxic', replaceWith: 'Sneaky' },
        { if: 'Foggy', replaceWith: 'Paranoia' },
        { if: 'Calorie-Dense', replaceWith: 'Gingeritis' },
        { if: 'Euphoric', replaceWith: 'Seizure-Inducing' },
        { if: 'Refreshing', replaceWith: 'Thought-Provoking' }
      ]
    },
    { 
      name: 'Addy', 
      cost: 9, 
      emoji: '💊',
      defaultEffect: 'Thought-Provoking',
      interactions: [
        { if: 'Sedating', replaceWith: 'Gingeritis' },
        { if: 'Long-Faced', replaceWith: 'Electrifying' },
        { if: 'Glowing', replaceWith: 'Refreshing' },
        { if: 'Foggy', replaceWith: 'Energizing' },
        { if: 'Explosive', replaceWith: 'Euphoric' }
      ]
    },
    { 
      name: 'Horse Semen', 
      cost: 9, 
      emoji: '🐴',
      defaultEffect: 'Long-Faced',
      interactions: [
        { if: 'Anti-Gravity', replaceWith: 'Calming' },
        { if: 'Gingeritis', replaceWith: 'Refreshing' },
        { if: 'Thought-Provoking', replaceWith: 'Electrifying' }
      ]
    },
    
    // Meth-specific ingredients
    { 
      name: 'Glass Shards', 
      cost: 10, 
      emoji: '🔍',
      defaultEffect: 'Explosive',
      interactions: [
        { if: 'Energizing', replaceWith: 'Electrifying' },
        { if: 'Bright-Eyed', replaceWith: 'Explosive' }
      ]
    },
    { 
      name: 'Blue Food Coloring', 
      cost: 12, 
      emoji: '🔵',
      defaultEffect: 'Glowing',
      interactions: [
        { if: 'Energizing', replaceWith: 'Calming' },
        { if: 'Electrifying', replaceWith: 'Glowing' }
      ]
    },
    
    // Cocaine-specific ingredients
    { 
      name: 'Baking Soda', 
      cost: 8, 
      emoji: '🧂',
      defaultEffect: 'Euphoric',
      interactions: [
        { if: 'Euphoric', replaceWith: 'Energizing' },
        { if: 'Focused', replaceWith: 'Athletic' }
      ]
    },
    { 
      name: 'Caffeine Powder', 
      cost: 15, 
      emoji: '☕',
      defaultEffect: 'Energizing',
      interactions: [
        { if: 'Euphoric', replaceWith: 'Bright-Eyed' },
        { if: 'Thought-Provoking', replaceWith: 'Energizing' }
      ]
    }
];

// For backwards compatibility with existing code
export const additiveEffects = ingredients.reduce((acc, ingredient) => {
  acc[ingredient.name] = ingredient.defaultEffect;
  return acc;
}, {});

export const effectColors = {
    'Anti-Gravity': '#143371',
    'Athletic': '#4d85a8',
    'Balding': '#735620',
    'Bright-Eyed': '#8bc7d2',
    'Calming': '#bda588',
    'Calorie-Dense': '#a3569f',
    'Cyclopean': '#9c784a',
    'Disorienting': '#964733',
    'Electrifying': '#3680a3',
    'Energizing': '#65a94b',
    'Euphoric': '#898043',
    'Explosive': '#932d29',
    'Focused': '#41868f',
    'Foggy': '#686a6b',
    'Gingeritis': '#9c551c',
    'Glowing': '#538e3a',
    'Jennerising': '#925292',
    'Laxative': '#4c281a',
    'Lethal': '#6c1f1a',
    'Long-Faced': '#8b7839',
    'Munchies': '#8b7839',
    'Paranoia': '#733e3d',
    'Refreshing': '#608955',
    'Schizophrenia': '#302d7d',
    'Sedating': '#302c63',
    'Seizure-Inducing': '#817804',
    'Shrinking': '#689280',
    'Slippery': '#5d8195',
    'Smelly': '#4f7822',
    'Sneaky': '#474849',
    'Spicy': '#984231',
    'Thought-Provoking': '#a86b88',
    'Toxic': '#3d6523',
    'Tropic Thunder': '#8c592b',
    'Zombifying': '#558248'
};

// Drug type information
export const drugTypes = {
  'weed': {
    name: 'Weed',
    emoji: '🌿',
    basePrice: 35,
    description: 'Classic cannabis. Each seed produces 12 buds.',
    yieldAmount: 12,
    unit: 'buds'
  },
  'meth': {
    name: 'Meth',
    emoji: '💎',
    basePrice: 70,
    description: 'Crystal methamphetamine. Each batch produces 10 crystals.',
    yieldAmount: 10,
    unit: 'crystals'
  },
  'cocaine': {
    name: 'Cocaine',
    emoji: '❄️',
    basePrice: 90,
    description: 'Refined cocaine powder. Each batch produces 10 grams.',
    yieldAmount: 10,
    unit: 'grams'
  }
};

// Updated sequential mixing function with proper interaction application
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

// Helper function to check what would happen if we add a specific ingredient next
export const simulateAddIngredient = (currentEffects, ingredient) => {
  if (!currentEffects || !ingredient) return { newEffects: [...currentEffects] };
  
  // Clone current effects
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
  }
  
  return {
    newEffects,
    transformations,
    addedDefaultEffect,
    defaultEffect: ingredient.defaultEffect
  };
};
  