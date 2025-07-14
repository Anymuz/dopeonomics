// Ingredient data for the strain creator feature
export const ingredients = [
    { 
      name: 'Cuke', 
      cost: 2, 
      emoji: '🥤', 
      defaultEffect: 'Energizing',
      specificality: null,
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
      specificality: null,
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
      specificality: 'all',
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: null,
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
      specificality: 'meth',
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
      specificality: 'meth',
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
      specificality: 'cocaine',
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
      specificality: 'cocaine',
      interactions: [
        { if: 'Euphoric', replaceWith: 'Bright-Eyed' },
        { if: 'Thought-Provoking', replaceWith: 'Energizing' }
      ]
    }
];