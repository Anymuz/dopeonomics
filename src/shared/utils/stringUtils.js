// String formatting utilities for converting between code and UI formats.
// Supports snake_case, camelCase, PascalCase, kebab-case, Title Case, and normal case.

// -------------------- VALIDATION & DEBUGGING --------------------

// For debug context in warning messages. Change if the file is moved.
const DIRECTORY = 'src/shared/utils/stringUtils.js';

/// Generates a consistent warning message with file, function, and parameter info.
const warningMessage = (functionName, parameter) =>(
  `${DIRECTORY} warning: ${functionName} was passed a missing or undefined ${parameter} value.
Returned empty fallback to avoid errors.`);

// Validates input, logs a warning, and returns a fallback if input is null/undefined.
const validateInput = (functionName, input, parameter, fallback = '') =>  
  (input === null || input === undefined) ? (console.warn(warningMessage(functionName, parameter)), fallback) : input;

// -------------------- CORE UTILITY FUNCTIONS --------------------

// Converts strings to camelCase or PascalCase for code identifiers.
// Example: "drug type ingredient seed" => "drugTypeIngredientSeed" or "DrugTypeIngredientSeed"
const formatCamelOrPascal = (stringInput, toPascal = false) => {
  const output = formatWithSeparator(validateInput('formatCamelOrPascal', stringInput, 'stringInput'), '', true);
  return toPascal ? output : output.charAt(0).toLowerCase() + output.slice(1);
};

// Normalizes input to an array of words from any format (handles spaces, hyphens, camelCase, PascalCase, snake_case).
const normalizeString = (stringInput) => {
  let normalized = String(validateInput('normalizeString', stringInput, 'stringInput', []))
    .replace(/[-\s]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2'); // Replace hyphens and spaces and between lowercase and uppercase letters with underscores.
  return normalized.split('_').filter(Boolean); // Split normalized to 'snake_case' string by underscores and filter out empty strings.
};

// Flexible formatter: joins normalized words with any separator, optionally capitalizing. Exported incase specific formats are needed.
// Example: formatWithSeparator("drugTypeIngredientSeed", '_') => "drug_type_ingredient_seed"
export const formatWithSeparator = (stringInput, separator, capitalize = false) => {
  separator = validateInput('formatWithSeparator', separator, 'separator');
  return separator === '' ? '': normalizeString(validateInput('formatWithSeparator', stringInput, 'stringInput')).map(
    word => capitalize ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()
  ).join(validateInput('formatWithSeparator', separator, 'separator'));
};

// -------------------- SPECIFIC FORMAT WRAPPERS --------------------

// Wrappers for converting between code and UI formats.

// To UI: formatTitle, formatNormal
export const formatTitle = (stringInput) =>  formatWithSeparator(validateInput('formatTitle', stringInput, 'stringInput'), ' ', true);
export const formatNormal = (stringInput) => formatWithSeparator(validateInput('formatNormal', stringInput, 'stringInput'), ' ', false);

// To code: formatCamel, formatPascal, formatSnake, formatKebab
export const formatCamel = (stringInput) => formatCamelOrPascal(validateInput('formatCamel', stringInput, 'stringInput'), false);
export const formatPascal = (stringInput) => formatCamelOrPascal(validateInput('formatPascal', stringInput, 'stringInput'), true);
export const formatSnake = (stringInput) => formatWithSeparator(validateInput('formatSnake', stringInput, 'stringInput'), '_', false);
export const formatKebab = (stringInput) => formatWithSeparator(validateInput('formatKebab', stringInput, 'stringInput'), '-', false);


