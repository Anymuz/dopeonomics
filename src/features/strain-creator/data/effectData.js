// Colour codes for the effects:
// These colors are used in the UI to visually represent each effect.
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

// Effect details including multiplier, type, and description
// This object is used to provide detailed information about each effect in the UI.
export const effectDetails = {
  'Anti-Gravity': { 
    multiplier: 0.54, 
    type: 'Ability', 
    description: 'Causes user to jump higher.'
  },
  'Athletic': { 
    multiplier: 0.32, 
    type: 'Ability', 
    description: 'Causes user to run faster.'
  },
  'Balding': { 
    multiplier: 0.30, 
    type: 'Cosmetic', 
    description: 'Causes user to be bald.'
  },
  'Bright-Eyed': { 
    multiplier: 0.40, 
    type: 'Ability', 
    description: 'Causes user\'s eyes to shine flashlight beams.'
  },
  'Calming': { 
    multiplier: 0.10, 
    type: 'Cosmetic', 
    description: 'Causes user to have chromatic aberration around screen.'
  },
  'Calorie-Dense': { 
    multiplier: 0.28, 
    type: 'Cosmetic', 
    description: 'Causes user to appear fat.'
  },
  'Cyclopean': { 
    multiplier: 0.56, 
    type: 'Cosmetic', 
    description: 'Causes user to only have one eye.'
  },
  'Disorienting': { 
    multiplier: 0.00, 
    type: 'Ability', 
    description: 'Causes camera controls for up and down and movement controls for left and right to be inverted.'
  },
  'Electrifying': { 
    multiplier: 0.50, 
    type: 'Cosmetic', 
    description: 'Causes lightning effect on user.'
  },
  'Energizing': { 
    multiplier: 0.22, 
    type: 'Ability', 
    description: 'Causes user to run faster.'
  },
  'Euphoric': { 
    multiplier: 0.18, 
    type: 'Cosmetic', 
    description: 'Causes visual effects and improved mood.'
  },
  'Explosive': { 
    multiplier: 0.00, 
    type: 'Ability', 
    description: 'Causes user to explode after ticking countdown, killing the user and damaging NPCs in the vicinity.'
  },
  'Focused': { 
    multiplier: 0.16, 
    type: 'Cosmetic', 
    description: 'Causes user to have chromatic aberration around screen.'
  },
  'Foggy': { 
    multiplier: 0.36, 
    type: 'Cosmetic', 
    description: 'Causes a fog cloud effect around user. Also causes user to perceive the world as extremely foggy, significantly limiting visibility.'
  },
  'Gingeritis': { 
    multiplier: 0.20, 
    type: 'Cosmetic', 
    description: 'Causes user to have red hair.'
  },
  'Glowing': { 
    multiplier: 0.48, 
    type: 'Cosmetic', 
    description: 'Causes user to have a radioactive glow.'
  },
  'Jennerising': { 
    multiplier: 0.42, 
    type: 'Cosmetic', 
    description: 'Causes user to appear female.'
  },
  'Laxative': { 
    multiplier: 0.00, 
    type: 'Cosmetic', 
    description: 'Causes user to constantly soil themselves.'
  },
  'Long-Faced': { 
    multiplier: 0.52, 
    type: 'Cosmetic', 
    description: 'Causes user\'s neck and face to grow.'
  },
  'Munchies': { 
    multiplier: 0.12, 
    type: 'Ability', 
    description: 'Causes user to feel hungry.'
  },
  'Paranoia': { 
    multiplier: 0.00, 
    type: 'Ability', 
    description: 'Causes user to experience paranoia effects.'
  },
  'Refreshing': { 
    multiplier: 0.14, 
    type: 'Ability', 
    description: 'Causes rejuvenating effects.'
  },
  'Schizophrenia': { 
    multiplier: 0.00, 
    type: 'Ability', 
    description: 'Causes user to hear voices and see things.'
  },
  'Sedating': { 
    multiplier: 0.26, 
    type: 'Cosmetic', 
    description: 'Causes user to have a vignette around screen and mouse smoothing.'
  },
  'Seizure-Inducing': { 
    multiplier: 0.00, 
    type: 'Cosmetic', 
    description: 'Causes user to have a seizure and shake on the ground.'
  },
  'Shrinking': { 
    multiplier: 0.60, 
    type: 'Cosmetic', 
    description: 'Causes user to shrink.'
  },
  'Slippery': { 
    multiplier: 0.34, 
    type: 'Ability', 
    description: 'Causes user to have sluggish, slippery movement.'
  },
  'Smelly': { 
    multiplier: 0.00, 
    type: 'Cosmetic', 
    description: 'Causes user to have a stinky cloud around them.'
  },
  'Sneaky': { 
    multiplier: 0.24, 
    type: 'Ability', 
    description: 'Improves stealth capabilities.'
  },
  'Spicy': { 
    multiplier: 0.38, 
    type: 'Cosmetic', 
    description: 'Causes user\'s head to light on fire.'
  },
  'Thought-Provoking': { 
    multiplier: 0.44, 
    type: 'Cosmetic', 
    description: 'Causes user\'s head to grow in size.'
  },
  'Toxic': { 
    multiplier: 0.00, 
    type: 'Cosmetic', 
    description: 'Causes user to vomit.'
  },
  'Tropic Thunder': { 
    multiplier: 0.46, 
    type: 'Cosmetic', 
    description: 'Causes user to have black skin.'
  },
  'Zombifying': { 
    multiplier: 0.58, 
    type: 'Cosmetic', 
    description: 'Causes user to have green skin and have a zombie-like voice.'
  }
}; 