/*  This utility module is the original code extracted from the old EffectBuilderTab.jsx
    Moved in here to be preserved as much as possible, full credit of the content here belongs to Fustahson
    I meerly put it in here it as neatly as I could to be used by the new refactored design - Anymuz.    */
import { applyInteractions as calculateStrainEffects} from './effects';

export const filterSeedsByDrugType = (seedTypes, drugType) => {
  return seedTypes.filter(seed => seed.drugType === drugType);
};

export const filterIngredientsByDrugType = (ingredients, drugType) => {
  const commonIngredients = [
    'Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagra', 'Mouth Wash', 'Flu Medicine', 'Gasoline',
    'Energy Drink', 'Motor Oil', 'Mega Bean', 'Chili', 'Battery', 'Iodine', 'Addy', 'Horse Semen'
  ];
  const methOnly = ['Glass Shards', 'Blue Food Coloring'];
  const cocaineOnly = ['Baking Soda', 'Caffeine Powder'];

  return ingredients.filter(ingredient => {
    if (commonIngredients.includes(ingredient.name)) return true;
    if (drugType === 'meth') return methOnly.includes(ingredient.name);
    if (drugType === 'cocaine') return cocaineOnly.includes(ingredient.name);
    if (drugType === 'weed') return !methOnly.includes(ingredient.name) && !cocaineOnly.includes(ingredient.name);
    return true;
  });
};

export const calculateEffectMatchPercentage = (solution, selectedEffects) => {
  if (!solution || !selectedEffects) return 0;
  return (solution.matched.length / selectedEffects.length) * 100;
};

export const checkSequence = (seed, ingredientSequence, selectedEffects) => {
  if (!seed || ingredientSequence.length === 0) return false;

  const result = calculateStrainEffects(seed.effect, ingredientSequence);
  const finalEffects = result.finalEffects;

  const allSelected = selectedEffects.every(effect => finalEffects.includes(effect));

  if (allSelected) {
    return {
      seed,
      ingredients: ingredientSequence,
      allEffects: finalEffects,
      matched: selectedEffects,
      extra: finalEffects.filter(effect => !selectedEffects.includes(effect))
    };
  }

  return false;
};

export const searchSolutions = async ({
  seedTypes,
  ingredients,
  selectedDrugType,
  selectedEffects,
  setSearchProgress
}) => {
  const filteredSeeds = filterSeedsByDrugType(seedTypes, selectedDrugType);
  const filteredIngredients = filterIngredientsByDrugType(ingredients, selectedDrugType);

  const seedsWithDesiredEffects = filteredSeeds.filter(seed =>
    selectedEffects.includes(seed.effect)
  );

  const seedsToTry = [
    ...seedsWithDesiredEffects,
    ...filteredSeeds.filter(seed =>
      !seedsWithDesiredEffects.some(s => s.name === seed.name)
    ),
  ];

  let solutions = [];
  let bestSolution = null;
  let bestMatchPercentage = 0;

  const totalCombinations = seedsToTry.length * Math.min(10, filteredIngredients.length ** 3);
  let combinationsTried = 0;

  for (const seed of seedsToTry) {
    const seedOnlyResult = calculateStrainEffects(seed.effect, []);
    if (!seedOnlyResult || !Array.isArray(seedOnlyResult.finalEffects)) {
      continue;
    }

    const seedMatches = selectedEffects.filter(effect =>
      seedOnlyResult.finalEffects.includes(effect)
    );
    const seedMatchPercentage = (seedMatches.length / selectedEffects.length) * 100;

    if (seedMatchPercentage > bestMatchPercentage) {
      bestMatchPercentage = seedMatchPercentage;
      bestSolution = {
        seed,
        ingredients: [],
        allEffects: seedOnlyResult.finalEffects,
        matched: seedMatches,
        extra: seedOnlyResult.finalEffects.filter(effect => !seedMatches.includes(effect))
      };
      if (seedMatchPercentage === 100) solutions.push(bestSolution);
    }

    for (const ing1 of filteredIngredients) {
      await new Promise(resolve => setTimeout(resolve, 0));
      const sequence1 = [ing1];
      const result1 = checkSequence(seed, sequence1, selectedEffects, calculateStrainEffects);
      combinationsTried++;
      setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));

      if (result1) {
        solutions.push(result1);
        if (solutions.length >= 5) break;
      } else {
        const partialResult = calculateStrainEffects(seed.effect, sequence1);
        if (!partialResult || !Array.isArray(partialResult.finalEffects)) continue;

        const matches = selectedEffects.filter(effect =>
          partialResult.finalEffects.includes(effect)
        );
        const matchPercentage = (matches.length / selectedEffects.length) * 100;
        if (matchPercentage > bestMatchPercentage) {
          bestMatchPercentage = matchPercentage;
          bestSolution = {
            seed,
            ingredients: sequence1,
            allEffects: partialResult.finalEffects,
            matched: matches,
            extra: partialResult.finalEffects.filter(effect => !matches.includes(effect))
          };
        }
      }

      for (const ing2 of filteredIngredients) {
        await new Promise(resolve => setTimeout(resolve, 0));
        const sequence2 = [ing1, ing2];
        const result2 = checkSequence(seed, sequence2, selectedEffects, calculateStrainEffects);
        combinationsTried++;
        setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));

        if (result2) {
          solutions.push(result2);
          if (solutions.length >= 5) break;
        } else {
          const partialResult = calculateStrainEffects(seed.effect, sequence2);
          if (!partialResult || !Array.isArray(partialResult.finalEffects)) continue;

          const matches = selectedEffects.filter(effect =>
            partialResult.finalEffects.includes(effect)
          );
          const matchPercentage = (matches.length / selectedEffects.length) * 100;
          if (matchPercentage > bestMatchPercentage) {
            bestMatchPercentage = matchPercentage;
            bestSolution = {
              seed,
              ingredients: sequence2,
              allEffects: partialResult.finalEffects,
              matched: matches,
              extra: partialResult.finalEffects.filter(effect => !matches.includes(effect))
            };
          }
        }

        if (solutions.length === 0) {
          for (const ing3 of filteredIngredients) {
            const sequence3 = [ing1, ing2, ing3];
            const result3 = checkSequence(seed, sequence3, selectedEffects, calculateStrainEffects);
            combinationsTried++;
            setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));

            if (result3) {
              solutions.push(result3);
              if (solutions.length >= 5) break;
            } else {
              const partialResult = calculateStrainEffects(seed.effect, sequence3);
              if (!partialResult || !Array.isArray(partialResult.finalEffects)) continue;

              const matches = selectedEffects.filter(effect =>
                partialResult.finalEffects.includes(effect)
              );
              const matchPercentage = (matches.length / selectedEffects.length) * 100;
              if (matchPercentage > bestMatchPercentage) {
                bestMatchPercentage = matchPercentage;
                bestSolution = {
                  seed,
                  ingredients: sequence3,
                  allEffects: partialResult.finalEffects,
                  matched: matches,
                  extra: partialResult.finalEffects.filter(effect => !matches.includes(effect))
                };
              }
            }
          }
        }

        if (solutions.length >= 5) break;
      }

      if (solutions.length >= 5) break;
    }

    if (solutions.length >= 5) break;
  }

  solutions.sort((a, b) => a.ingredients.length - b.ingredients.length);

  return {
    solutionFound: solutions.length > 0,
    bestSolution: solutions.length > 0 ? solutions[0] : bestSolution,
    searchResults: solutions.length > 0 ? solutions : bestSolution ? [bestSolution] : [],
  };
};
