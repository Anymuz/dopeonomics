// Utility functions to format strings used in code such as labels and identifiers into human readable text:
// Provides functions that can take various code strig formats (snake_case, camelCase, PascalCase and kebab-case)
// to a more readable format, such as Title Case or normal case for use withi text to facilitate user-friendly interfaces.

// Standardiszed warnning message with directory constant for quick maintainbility if file is moved or renamed.
const DIRECTORY = '@shared/utils/stringUtils.js'; // Change this if the file is moved or renamed.
const warningMessage = (functionName) => `${functionName} called with empty input or null from: ${DIRECTORY}`; 
// -------------------------------------------------------------------------

// Normalize string inputs for other utility functions, it handles different cases by normalising them all to snake_case
// then splits noramlised snake_case by underscore (_) to return an array of words to be used depending on utility function.
const normalizeString = (input) => {
  // Check if input is empty or null, return an empty array to avoid errors with warning log to help debugging,
  if (!input) {
    console.warn(warningMessage(normalizeString));
    return [];
  };

  // Convert 'kebab-case' inputs to 'snake_case' via regex '/-/g' to replace all hyphens with underscores.
  let normalized = input.replace(/-/g, '_');

  // Normalise 'camelCase' and 'PascalCase' inputs via regex '/([a-z])([A-Z])/g' to match a lowercase letter followed by an uppercase letter
  // and captures them with $1 and $2 respectively to insert an underscore between them, normalizing both formats to 'snake_case'.
  normalized = normalized.replace(/([a-z])([A-Z])/g, '$1_$2'); 

  // Return array of words by splitting where there are underscores (_) then filtering empty strings, hence prior normalisation into 'snake_case'.
  return normalized.split('_').filter(Boolean); 
};
// -------------------------------------------------------------------------

// Format strings such as labels into 'Title Case' for displaying titles in a consistent user-friendly format such as 'effectBuilder' to 'Effect Builder':
export const formatTitle = (stringInput) => {
  // Returns warning and empty string if input is empty or null.
  if (!stringInput) { 
    console.warn(warningMessage(formatTitle));
    return '';
  };

  // Uses normalizeString to split input into array of words then maps over each word but capitalizes the first letter of each word 
  // then reconstructs the input string by joining each word with spaces.
  return normalizeString(stringInput).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
// -------------------------------------------------------------------------

// Format strings such as labels into a more readable format flexibly via a specified separator:
// For example "drugtype_ingredient_seed" can be formatted to "drugtype, ingredient, seed" via formatWithSeparator(input, ',')
// or 'drugIngredents' to 'drug and ingredients' via formatWithSeparator(input, ' and ') etc.
export const formatWithSeparator = (stringInput, separator) => {
  // Returns warning and empty string if input is empty or null.
  if (!stringInput) {
    console.warn(warningMessage(formatWithSeparator));
    return '';
  }
  // Returns warning and empty string if separator is not provided.
  if (!separator) {
    console.warn(`formatWithSeparator called without a separator from ${DIRECTORY}.\nDid you mean to use formatNormalCase or formatTitle instead?`);
    return '';
  }
  // Uses normalizeString to split all formats into word array then maps over each word to lowercase it and joins them with the specified separator.
  return normalizeString(stringInput).map(word => word.toLowerCase()).join(separator);
};
// -------------------------------------------------------------------------

// Utility formatWithSeperator to format strings such as labels into 'normal case' for displaying within text as a user-friendly format:
export const formatNormalCase = (stringInput) => formatWithSeparator(stringInput, ' ');
// -------------------------------------------------------------------------