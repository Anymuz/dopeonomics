// Data module for Strain Creator
// This separates out all the static data to make the main component cleaner

export const seedTypes = [
  // Weed seeds
  { name: 'OG Kush Seed', cost: 30, effect: 'Calming', drugType: 'weed' },
  { name: 'Sour Diesel Seed', cost: 35, effect: 'Refreshing', drugType: 'weed' },
  { name: 'Green Crack Seed', cost: 40, effect: 'Energizing', drugType: 'weed' },
  { name: 'Granddaddy Purple Seed', cost: 45, effect: 'Sedating', drugType: 'weed' },
  
  // Meth "seeds" (really these are pseudoephedrine types)
  { name: 'Low-Quality Pseudo', cost: 140, effect: 'Energizing', drugType: 'meth', 
    description: 'Low-grade pseudoephedrine + chemicals', yieldAmount: 10, basePrice: 70,
    ingredients: 'Acid ($40), Red Phosphorus ($40), Low-Grade Pseudo ($60)', 
    productionTime: '8 minutes + 6 minutes in oven' },
  
  { name: 'Standard Pseudo', cost: 160, effect: 'Electrifying', drugType: 'meth',
    description: 'Standard pseudoephedrine + chemicals', yieldAmount: 10, basePrice: 70,
    ingredients: 'Acid ($40), Red Phosphorus ($40), Regular Pseudo ($80)', 
    productionTime: '8 minutes + 6 minutes in oven' },
  
  { name: 'High-Quality Pseudo', cost: 190, effect: 'Bright-Eyed', drugType: 'meth',
    description: 'Premium pseudoephedrine + chemicals', yieldAmount: 10, basePrice: 70,
    ingredients: 'Acid ($40), Red Phosphorus ($40), High-Grade Pseudo ($110)', 
    productionTime: '8 minutes + 6 minutes in oven' },
  
  // Cocaine "seeds" (different drying times for coca leaves)
  { name: 'Standard Coca Leaves', cost: 210, effect: 'Euphoric', drugType: 'cocaine',
    description: 'Fresh coca leaves (no drying)', yieldAmount: 10, basePrice: 90,
    ingredients: 'Coca Leaves (20), Gasoline (1)', 
    productionTime: '10 hours growing + 6 minutes processing + 6 minutes refining' },
  
  { name: 'Premium Coca Leaves', cost: 210, effect: 'Focused', drugType: 'cocaine',
    description: 'Coca leaves dried for 12 hours', yieldAmount: 10, basePrice: 135,
    ingredients: 'Coca Leaves (20), Gasoline (1)', 
    productionTime: '10 hours growing + 12 hours drying + 6 minutes processing + 6 minutes refining' },
  
  { name: 'Heavenly Coca Leaves', cost: 210, effect: 'Thought-Provoking', drugType: 'cocaine',
    description: 'Coca leaves dried for 24 hours', yieldAmount: 10, basePrice: 180,
    ingredients: 'Coca Leaves (20), Gasoline (1)', 
    productionTime: '10 hours growing + 24 hours drying + 6 minutes processing + 6 minutes refining' }
];

export const ingredients = [
    { name: 'Cuke', cost: 2, emoji: '🥤', 
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
    { name: 'Banana', cost: 2, emoji: '🍌',
      interactions: [
        { if: 'Energizing', replaceWith: 'Thought-Provoking' },
        { if: 'Calming', replaceWith: 'Sneaky' },
        { if: 'Toxic', replaceWith: 'Smelly' },
        { if: 'Long Faced', replaceWith: 'Refreshing' },
        { if: 'Cyclopean', replaceWith: 'Thought-Provoking' },
        { if: 'Disorienting', replaceWith: 'Focused' },
        { if: 'Focused', replaceWith: 'Seizure-Inducing' },
        { if: 'Paranoia', replaceWith: 'Jennerising' },
        { if: 'Smelly', replaceWith: 'Anti-Gravity' }
      ]
    },
    { name: 'Paracetamol', cost: 3, emoji: '⚪',
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
    { name: 'Donut', cost: 3, emoji: '🍩',
      interactions: [
        { if: 'Calorie-Dense', replaceWith: 'Explosive' },
        { if: 'Balding', replaceWith: 'Sneaky' },
        { if: 'Anti-Gravity', replaceWith: 'Slippery' },
        { if: 'Jennerising', replaceWith: 'Gingeritis' },
        { if: 'Focused', replaceWith: 'Euphoric' },
        { if: 'Shrinking', replaceWith: 'Energizing' }
      ]
    },
    { name: 'Viagra', cost: 4, emoji: '🍆',
      interactions: [
        { if: 'Athletic', replaceWith: 'Sneaky' },
        { if: 'Euphoric', replaceWith: 'Bright-Eyed' },
        { if: 'Laxative', replaceWith: 'Calming' },
        { if: 'Disorienting', replaceWith: 'Toxic' }
      ]
    },
    { name: 'Mouth Wash', cost: 4, emoji: '💧',
      interactions: [
        { if: 'Calming', replaceWith: 'Anti-Gravity' },
        { if: 'Calorie-Dense', replaceWith: 'Sneaky' },
        { if: 'Explosive', replaceWith: 'Sedating' },
        { if: 'Focused', replaceWith: 'Jennerising' }
      ]
    },
    { name: 'Flu Medicine', cost: 5, emoji: '🍇',
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
    { name: 'Gasoline', cost: 5, emoji: '⛽',
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
    { name: 'Energy Drink', cost: 6, emoji: '🐂',
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
    { name: 'Motor Oil', cost: 6, emoji: '🛢️',
      interactions: [
        { if: 'Energizing', replaceWith: 'Munchies' },
        { if: 'Foggy', replaceWith: 'Toxic' },
        { if: 'Euphoric', replaceWith: 'Sedating' },
        { if: 'Paranoia', replaceWith: 'Anti-Gravity' },
        { if: 'Munchies', replaceWith: 'Schizophrenia' }
      ]
    },
    { name: 'Mega Bean', cost: 7, emoji: '🫛',
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
    { name: 'Chili', cost: 7, emoji: '🌶️',
      interactions: [
        { if: 'Athletic', replaceWith: 'Euphoric' },
        { if: 'Anti-Gravity', replaceWith: 'Tropic Thunder' },
        { if: 'Sneaky', replaceWith: 'Bright-Eyed' },
        { if: 'Munchies', replaceWith: 'Toxic' },
        { if: 'Laxative', replaceWith: 'Long Faced' },
        { if: 'Shrinking', replaceWith: 'Refreshing' }
      ]
    },
    { name: 'Battery', cost: 8, emoji: '🔋',
      interactions: [
        { if: 'Munchies', replaceWith: 'Tropic Thunder' },
        { if: 'Euphoric', replaceWith: 'Zombifying' },
        { if: 'Electrifying', replaceWith: 'Euphoric' },
        { if: 'Laxative', replaceWith: 'Calorie-Dense' },
        { if: 'Cyclopean', replaceWith: 'Glowing' },
        { if: 'Shrinking', replaceWith: 'Munchies' }
      ]
    },
    { name: 'Iodine', cost: 8, emoji: '🟠',
      interactions: [
        { if: 'Calming', replaceWith: 'Balding' },
        { if: 'Toxic', replaceWith: 'Sneaky' },
        { if: 'Foggy', replaceWith: 'Paranoia' },
        { if: 'Calorie-Dense', replaceWith: 'Gingeritis' },
        { if: 'Euphoric', replaceWith: 'Seizure-Inducing' },
        { if: 'Refreshing', replaceWith: 'Thought-Provoking' }
      ]
    },
    { name: 'Addy', cost: 9, emoji: '💊',
      interactions: [
        { if: 'Sedating', replaceWith: 'Gingeritis' },
        { if: 'Long Faced', replaceWith: 'Electrifying' },
        { if: 'Glowing', replaceWith: 'Refreshing' },
        { if: 'Foggy', replaceWith: 'Energizing' },
        { if: 'Explosive', replaceWith: 'Euphoric' }
      ]
    },
    { name: 'Horse Semen', cost: 9, emoji: '🐴',
      interactions: [
        { if: 'Anti-Gravity', replaceWith: 'Calming' },
        { if: 'Gingeritis', replaceWith: 'Refreshing' },
        { if: 'Thought-Provoking', replaceWith: 'Electrifying' }
      ]
    },
    
    // New meth-specific ingredients
    { name: 'Glass Shards', cost: 10, emoji: '🔍',
      interactions: [
        { if: 'Energizing', replaceWith: 'Electrifying' },
        { if: 'Bright-Eyed', replaceWith: 'Explosive' }
      ]
    },
    { name: 'Blue Food Coloring', cost: 12, emoji: '🔵',
      interactions: [
        { if: 'Energizing', replaceWith: 'Calming' },
        { if: 'Electrifying', replaceWith: 'Glowing' }
      ]
    },
    
    // New cocaine-specific ingredients
    { name: 'Baking Soda', cost: 8, emoji: '🧂',
      interactions: [
        { if: 'Euphoric', replaceWith: 'Energizing' },
        { if: 'Focused', replaceWith: 'Athletic' }
      ]
    },
    { name: 'Caffeine Powder', cost: 15, emoji: '☕',
      interactions: [
        { if: 'Euphoric', replaceWith: 'Bright-Eyed' },
        { if: 'Thought-Provoking', replaceWith: 'Energizing' }
      ]
    }
];
  
export const additiveEffects = {
    'Cuke': 'Energizing',
    'Banana': 'Gingeritis',
    'Paracetamol': 'Sneaky',
    'Donut': 'Calorie-Dense',
    'Viagra': 'Tropic Thunder',
    'Mouth Wash': 'Balding',
    'Flu Medicine': 'Sedating',
    'Gasoline': 'Toxic',
    'Energy Drink': 'Athletic',
    'Motor Oil': 'Slippery',
    'Mega Bean': 'Foggy',
    'Chili': 'Spicy',
    'Battery': 'Bright-Eyed',
    'Iodine': 'Jennerising',
    'Addy': 'Thought-Provoking',
    'Horse Semen': 'Long-Faced',
    'Glass Shards': 'Explosive',
    'Blue Food Coloring': 'Glowing',
    'Baking Soda': 'Euphoric',
    'Caffeine Powder': 'Energizing'
};
  
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
  
// Helper functions related to strain effects
export const applyInteractions = (ingredient, effects) => {
    if (!ingredient.interactions) return [...effects];
    
    return effects.map(effect => {
      const interaction = ingredient.interactions.find(i => i.if === effect);
      return interaction ? interaction.replaceWith : effect;
    });
};
  
export const calculateStrainEffects = (seedEffect, ingredients) => {
    if (!seedEffect || !ingredients || ingredients.length === 0) {
      return seedEffect ? [seedEffect] : [];
    }
  
    let currentEffects = [seedEffect];
  
    ingredients.forEach(ingredient => {
      const naturalEffect = additiveEffects[ingredient.name];
      
      // Apply interactions
      currentEffects = applyInteractions(ingredient, currentEffects);
      
      // Add natural effect if not already present and under limit
      if (naturalEffect && currentEffects.length < 8 && !currentEffects.includes(naturalEffect)) {
        currentEffects.push(naturalEffect);
      }
  
      // Limit to 8 effects max
      if (currentEffects.length > 8) {
        currentEffects = currentEffects.slice(0, 8);
      }
    });
  
    return currentEffects;
};