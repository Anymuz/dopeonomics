import forms from '@tailwindcss/forms';
//import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anti-gravity': '#143371',
        'athletic': '#4d85a8',
        'balding': '#735620',
        'bright-eyed': '#8bc7d2',
        'calming': '#bda588',
        'calorie-dense': '#a3569f',
        'cyclopean': '#9c784a',
        'disorienting': '#964733',
        'electrifying': '#3680a3',
        'energizing': '#65a94b',
        'euphoric': '#898043',
        'explosive': '#932d29',
        'focused': '#41868f',
        'foggy': '#686a6b',
        'gingeritis': '#9c551c',
        'glowing': '#538e3a',
        'jennerising': '#925292',
        'laxative': '#4c281a',
        'lethal': '#6c1f1a',
        'long-faced': '#8b7839',
        'munchies': '#8b7839',
        'paranoia': '#733e3d',
        'refreshing': '#608955',
        'schizophrenia': '#302d7d',
        'sedating': '#302c63',
        'seizure-inducing': '#817804',
        'shrinking': '#689280',
        'slippery': '#5d8195',
        'smelly': '#4f7822',
        'sneaky': '#474849',
        'spicy': '#984231',
        'thought-provoking': '#a86b88',
        'toxic': '#3d6523',
        'tropic-thunder': '#8c592b',
        'zombifying': '#558248',
        // gradientColourStops
        'green-gradient-start': '#48bb78',
        'green-gradient-end': '#38a169',
        'blue-gradient-start': '#4299e1',
        'blue-gradient-end': '#3182ce',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'btn': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'selected': '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        'xxs': '0.625rem',
      },
    },
  },
  plugins: [forms],
};