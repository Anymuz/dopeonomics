// Strain data for the strain creator feature
// This file contains the seed types and their effects, as well as the drug type information.
// Note: The definition 'seed' in this project is synonymous with the precursor or base product for the drug type.

// Drug types with their properties:
// Each drug type has a name, emoji, precursor/seed title, base price, description, yield amount, and unit.
// Used to provide information about each drug type in the UI.
export const drugTypes = {
  'weed': {
    name: 'Weed',
    title: 'Cannabis Seeds',
    emoji: '🌿',
    basePrice: 35,
    description: 'Classic cannabis. Each seed produces 12 buds.',
    yieldAmount: 12,
    unit: 'buds'
  },
  'meth': {
    name: 'Meth',
    title: 'Methamphetamine Precursors',
    emoji: '💎',
    basePrice: 70,
    description: 'Crystal methamphetamine. Each batch produces 10 crystals.',
    yieldAmount: 10,
    unit: 'crystals'
  },
  'cocaine': {
    name: 'Cocaine',
    title: 'Cocaine Precursors',
    emoji: '❄️',
    basePrice: 90,
    description: 'Refined cocaine powder. Each batch produces 10 grams.',
    yieldAmount: 10,
    unit: 'grams'
  }
};

// Seed types with their properties:
// Each seed has a name, cost, effect, and associated drug type.
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

export const packagingTypes = [
  { type: 'baggies', cost: 1, capacity: 1 },
  { type: 'jars', cost: 3, capacity: 5 },
  { type: 'boxes', cost: 5, capacity: 10 } // Additional packaging option for future proof testing - not selectable.
];





  