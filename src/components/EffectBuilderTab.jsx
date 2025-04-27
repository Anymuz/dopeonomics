import useGameStore from '../stores/GameStore.jsx';
// EffectBuilderTab.js
import React, { useState} from 'react';
import {
  Beaker,
  RotateCcw,
  Check,
  Search,
  AlertTriangle,
  ArrowRight,
  X,
} from 'lucide-react';
import { effectDetails } from '../data/straindata.jsx';

// Effect Builder Tab Component
const EffectBuilderTab = ({ 
  seedTypes, 
  ingredients, 
  effectColors, 
  drugTypes,
  calculateStrainEffects,
}) => {
  // State for selected effects and search
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [effectSearchTerm, setEffectSearchTerm] = useState('');
  const [selectedDrugType, setSelectedDrugType] = useState('weed');
  const [solutionFound, setSolutionFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [bestSolution, setBestSolution] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchProgress, setSearchProgress] = useState(0);
  const [effectSortOrder, setEffectSortOrder] = useState('alphabetical'); // 'alphabetical', 'type', 'value'
  const [effectTypeFilter, setEffectTypeFilter] = useState('all'); // 'all', 'Ability', 'Cosmetic'
  
  // Get all available effects from effect colors for display
  const allEffects = Object.keys(effectColors).sort();
  
  // Filter and sort effects based on search term and sort order
  const filteredAndSortedEffects = () => {
    // First filter by search term
    let filtered = allEffects.filter(effect => 
      effect.toLowerCase().includes(effectSearchTerm.toLowerCase())
    );
    
    // Filter by effect type if not 'all'
    if (effectTypeFilter !== 'all') {
      filtered = filtered.filter(effect => 
        effectDetails[effect]?.type === effectTypeFilter
      );
    }
    
    // Then sort by selected order
    if (effectSortOrder === 'type') {
      filtered = [...filtered].sort((a, b) => {
        const typeA = effectDetails[a]?.type || '';
        const typeB = effectDetails[b]?.type || '';
        return typeA.localeCompare(typeB) || a.localeCompare(b);
      });
    } else if (effectSortOrder === 'value') {
      filtered = [...filtered].sort((a, b) => {
        const valueA = effectDetails[a]?.multiplier || 0;
        const valueB = effectDetails[b]?.multiplier || 0;
        return valueB - valueA; // Higher values first
      });
    }
    // For 'alphabetical', already sorted
    
    return filtered;
  };

  // Toggle effect selection
  const toggleEffect = (effect) => {
    if (selectedEffects.includes(effect)) {
      setSelectedEffects(selectedEffects.filter(e => e !== effect));
    } else {
      // Only allow selecting up to 8 effects (maximum in the game)
      if (selectedEffects.length < 8) {
        setSelectedEffects([...selectedEffects, effect]);
      }
    }
    // Reset solution when effects change
    setSolutionFound(false);
    setBestSolution(null);
  };
  
  // Reset all selections
  const resetSelections = () => {
    setSelectedEffects([]);
    setSolutionFound(false);
    setBestSolution(null);
    setSearchResults([]);
    setSearchProgress(0);
  };
  
  // Filter seeds by drug type
  const getFilteredSeeds = () => {
    return seedTypes.filter(seed => seed.drugType === selectedDrugType);
  };
  
  // Filter ingredients based on drug type
  const getFilteredIngredients = () => {
    // Common ingredients that work with all drug types
    const commonIngredients = [
      'Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagra', 'Mouth Wash', 'Flu Medicine', 'Gasoline',
      'Energy Drink', 'Motor Oil', 'Mega Bean', 'Chili', 'Battery', 'Iodine', 'Addy', 'Horse Semen'
    ];
    
    // Drug-specific ingredients
    const methSpecificIngredients = ['Glass Shards', 'Blue Food Coloring'];
    const cocaineSpecificIngredients = ['Baking Soda', 'Caffeine Powder'];
    
    return ingredients.filter(ingredient => {
      if (commonIngredients.includes(ingredient.name)) {
        return true;
      }
      
      if (selectedDrugType === 'meth' && methSpecificIngredients.includes(ingredient.name)) {
        return true;
      }
      
      if (selectedDrugType === 'cocaine' && cocaineSpecificIngredients.includes(ingredient.name)) {
        return true;
      }
      
      // For weed, show most ingredients except the very specific ones for meth/cocaine
      if (selectedDrugType === 'weed') {
        return !methSpecificIngredients.includes(ingredient.name) && 
               !cocaineSpecificIngredients.includes(ingredient.name);
      }
      
      return true;
    });
  };
  
  // Check if a given sequence can produce the selected effects
  const checkSequence = (seed, ingredientSequence) => {
    if (!seed || ingredientSequence.length === 0) return false;
    
    const result = calculateStrainEffects(seed.effect, ingredientSequence);
    const finalEffects = result.finalEffects;
    
    // Check if ALL selected effects are in the final effects
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
  
  // Calculate effect match percentage for a potential solution
  const calculateEffectMatchPercentage = (solution) => {
    if (!solution) return 0;
    
    const matchedCount = solution.matched.length;
    const totalEffects = selectedEffects.length;
    
    return (matchedCount / totalEffects) * 100;
  };
  
  // Building and searching for a solution
  const searchForSolutions = async () => {
    if (selectedEffects.length === 0) return;
    
    setIsSearching(true);
    setSolutionFound(false);
    setBestSolution(null);
    setSearchResults([]);
    setSearchProgress(0);
    
    const filteredSeeds = getFilteredSeeds();
    const filteredIngredients = getFilteredIngredients();
    
    // Use a more intelligent approach to find solutions
    // Start with checking if any single seed already contains one of the desired effects
    const seedsWithDesiredEffects = filteredSeeds.filter(seed => 
      selectedEffects.includes(seed.effect)
    );
    
    // Also include all seeds as fallbacks
    const seedsToTry = [...seedsWithDesiredEffects, ...filteredSeeds.filter(seed => 
      !seedsWithDesiredEffects.some(s => s.name === seed.name)
    )];
    
    let solutions = [];
    let bestMatch = null;
    let bestMatchPercentage = 0;
    
    const totalCombinations = seedsToTry.length * Math.min(10, filteredIngredients.length ** 3);
    let combinationsTried = 0;
    
    // Process in chunks to keep UI responsive
    for (const seed of seedsToTry) {
      // Check the seed alone first
      const seedOnlyResult = calculateStrainEffects(seed.effect, []);
      const seedMatches = selectedEffects.filter(effect => seedOnlyResult.finalEffects.includes(effect));
      const seedMatchPercentage = (seedMatches.length / selectedEffects.length) * 100;
      
      if (seedMatchPercentage > bestMatchPercentage) {
        bestMatchPercentage = seedMatchPercentage;
        bestMatch = {
          seed,
          ingredients: [],
          allEffects: seedOnlyResult.finalEffects,
          matched: seedMatches,
          extra: seedOnlyResult.finalEffects.filter(effect => !seedMatches.includes(effect))
        };
        
        // If perfect match, add to solutions
        if (seedMatchPercentage === 100) {
          solutions.push(bestMatch);
        }
      }
      
      // Try adding 1 ingredient
      for (const ing1 of filteredIngredients) {
        await new Promise(resolve => setTimeout(resolve, 0)); // Allow UI updates
        
        const sequence1 = [ing1];
        const result1 = checkSequence(seed, sequence1);
        
        combinationsTried++;
        setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));
        
        if (result1) {
          solutions.push(result1);
          if (solutions.length >= 5) break; // Limit to 5 solutions
        } else if (result1 === false) {
          // Calculate partial match
          const partialResult = calculateStrainEffects(seed.effect, sequence1);
          const matches = selectedEffects.filter(effect => partialResult.finalEffects.includes(effect));
          const matchPercentage = (matches.length / selectedEffects.length) * 100;
          
          if (matchPercentage > bestMatchPercentage) {
            bestMatchPercentage = matchPercentage;
            bestMatch = {
              seed,
              ingredients: sequence1,
              allEffects: partialResult.finalEffects,
              matched: matches,
              extra: partialResult.finalEffects.filter(effect => !matches.includes(effect))
            };
          }
        }
        
        // Try adding 2 ingredients
        for (const ing2 of filteredIngredients) {
          await new Promise(resolve => setTimeout(resolve, 0)); // Allow UI updates
          
          const sequence2 = [ing1, ing2];
          const result2 = checkSequence(seed, sequence2);
          
          combinationsTried++;
          setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));
          
          if (result2) {
            solutions.push(result2);
            if (solutions.length >= 5) break; // Limit to 5 solutions
          } else if (result2 === false) {
            // Calculate partial match
            const partialResult = calculateStrainEffects(seed.effect, sequence2);
            const matches = selectedEffects.filter(effect => partialResult.finalEffects.includes(effect));
            const matchPercentage = (matches.length / selectedEffects.length) * 100;
            
            if (matchPercentage > bestMatchPercentage) {
              bestMatchPercentage = matchPercentage;
              bestMatch = {
                seed,
                ingredients: sequence2,
                allEffects: partialResult.finalEffects,
                matched: matches,
                extra: partialResult.finalEffects.filter(effect => !matches.includes(effect))
              };
            }
          }
          
          // Only try 3 ingredients if we haven't found solutions yet
          if (solutions.length === 0) {
            // Try adding 3 ingredients
            for (const ing3 of filteredIngredients) {
              const sequence3 = [ing1, ing2, ing3];
              const result3 = checkSequence(seed, sequence3);
              
              combinationsTried++;
              setSearchProgress(Math.min(99, (combinationsTried / totalCombinations) * 100));
              
              if (result3) {
                solutions.push(result3);
                if (solutions.length >= 5) break; // Limit to 5 solutions
              } else if (result3 === false) {
                // Calculate partial match
                const partialResult = calculateStrainEffects(seed.effect, sequence3);
                const matches = selectedEffects.filter(effect => partialResult.finalEffects.includes(effect));
                const matchPercentage = (matches.length / selectedEffects.length) * 100;
                
                if (matchPercentage > bestMatchPercentage) {
                  bestMatchPercentage = matchPercentage;
                  bestMatch = {
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
          
          if (solutions.length >= 5) break; // Limit to 5 solutions
        }
        
        if (solutions.length >= 5) break; // Limit to 5 solutions
      }
      
      if (solutions.length >= 5) break; // Limit to 5 solutions
    }
    
    // Sort solutions by least ingredients first
    solutions.sort((a, b) => a.ingredients.length - b.ingredients.length);
    
    if (solutions.length > 0) {
      setSolutionFound(true);
      setBestSolution(solutions[0]);
      setSearchResults(solutions);
    } else if (bestMatch) {
      // If no perfect solutions, show best partial match
      setSolutionFound(false);
      setBestSolution(bestMatch);
      setSearchResults([bestMatch]);
    } else {
      setSolutionFound(false);
      setBestSolution(null);
      setSearchResults([]);
    }
    
    setSearchProgress(100);
    setIsSearching(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Beaker className="mr-2 w-6 h-6 text-purple-500" />
        Effect Builder
      </h2>

      {/* Drug Type Selection */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Select Product Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(drugTypes).map(([key, value]) => (
            <button
              key={key}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
                ${selectedDrugType === key 
                  ? 'bg-blue-50 border-blue-500 shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
              onClick={() => setSelectedDrugType(key)}
            >
              <span className="text-3xl">{value.emoji}</span>
              <div className="font-medium text-center">{value.name}</div>
              <div className="text-xs text-gray-500 text-center">${value.basePrice} per {value.unit}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Effects Selection */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium text-gray-700">Select Desired Effects</h3>
          <div className="text-sm text-gray-600">
            {selectedEffects.length}/8 effects selected
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="relative w-full md:w-64 mb-2 md:mb-0">
            <input
              type="text"
              placeholder="Search effects..."
              value={effectSearchTerm}
              onChange={(e) => setEffectSearchTerm(e.target.value)}
              className="w-full p-2 pl-9 text-sm border rounded-md"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {effectSearchTerm && (
              <button 
                onClick={() => setEffectSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Type:</span>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setEffectTypeFilter('all')}
                  className={`px-3 py-1 text-xs rounded-l-md border ${
                    effectTypeFilter === 'all'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setEffectTypeFilter('Ability')}
                  className={`px-3 py-1 text-xs border-t border-b ${
                    effectTypeFilter === 'Ability'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Ability
                </button>
                <button
                  onClick={() => setEffectTypeFilter('Cosmetic')}
                  className={`px-3 py-1 text-xs rounded-r-md border ${
                    effectTypeFilter === 'Cosmetic'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cosmetic
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort:</span>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setEffectSortOrder('alphabetical')}
                  className={`px-3 py-1 text-xs rounded-l-md border ${
                    effectSortOrder === 'alphabetical'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Name
                </button>
                <button
                  onClick={() => setEffectSortOrder('type')}
                  className={`px-3 py-1 text-xs border-t border-b ${
                    effectSortOrder === 'type'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Type
                </button>
                <button
                  onClick={() => setEffectSortOrder('value')}
                  className={`px-3 py-1 text-xs rounded-r-md border ${
                    effectSortOrder === 'value'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Value
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Effects Preview */}
        {selectedEffects.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="font-medium text-gray-700 mb-2">Selected Effects:</div>
            <div className="flex flex-wrap gap-2">
              {selectedEffects.map((effect) => (
                <div key={effect} className="relative group">
                  <div className="flex items-center">
                    <span
                      className="px-2 py-1 text-white rounded-l-full text-sm inline-flex items-center"
                      style={{ backgroundColor: effectColors[effect] || '#333' }}
                    >
                      <span>{effect}</span>
                      {/* <span className="ml-2 px-1 py-0.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-xs">
                        {effectDetails[effect]?.type.charAt(0)}
                      </span> */}
                      <span className="ml-2 px-1 py-0.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-xs">
                        {effectDetails[effect]?.type}
                      </span>
                    </span>
                    <button
                      onClick={() => toggleEffect(effect)}
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded-r-full"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  {/* Tooltip - Always position below when in the selected effects area */}
                  <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded-md shadow-lg w-48 text-xs top-full left-0 mt-2">
                    <div className="font-medium mb-1">{effect}</div>
                    <div className="text-gray-300 mb-1">Type: {effectDetails[effect]?.type}</div>
                    <div className="text-gray-300">Value: {(effectDetails[effect]?.multiplier * 100).toFixed(0)}%</div>
                    <div className="mt-1">{effectDetails[effect]?.description}</div>
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 top-0 left-4 -translate-y-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Effects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto p-2 border rounded-md">
          {filteredAndSortedEffects().length > 0 ? (
            filteredAndSortedEffects().map((effect, index) => {
              // Determine if this is in the first row
              const isInFirstFourRows = index < 16;
      
                return (
                    <div key={effect} className="relative group">
                    <button
                        onClick={() => toggleEffect(effect)}
                        className={`w-full p-2 rounded-md text-white text-sm transition-all ${
                        selectedEffects.includes(effect) 
                            ? 'opacity-100 ring-2 ring-white' 
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: effectColors[effect] || '#333' }}
                        disabled={selectedEffects.length >= 8 && !selectedEffects.includes(effect)}
                    >
                        <div className="flex items-center justify-between">
                        <span>{effect}</span>
                        {selectedEffects.includes(effect) && (
                            <Check className="ml-1 w-4 h-4" />
                        )}
                        <span className="ml-2 px-1 py-0.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-xs">
                          {effectDetails[effect]?.type}
                        </span>
                        </div>
                    </button>
                    {/* Tooltip - Position below for first 4 rows, above for others */}
                    <div className={`absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded-md shadow-lg w-48 text-xs ${
                        isInFirstFourRows ? 'top-full mt-2' : 'bottom-full mb-2'
                    } left-1/2 transform -translate-x-1/2`}>
                        <div className="font-medium mb-1">{effect}</div>
                        <div className="text-gray-300 mb-1">Type: {effectDetails[effect]?.type}</div>
                        <div className="text-gray-300">Value: {(effectDetails[effect]?.multiplier * 100).toFixed(0)}%</div>
                        <div className="mt-1">{effectDetails[effect]?.description}</div>
                        <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                        isInFirstFourRows ? 'top-0 -translate-y-1' : 'bottom-0 translate-y-1'
                        } left-1/2 -translate-x-1/2`}></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center p-4 text-gray-500">
              No effects match your search
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={searchForSolutions}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex-1 flex items-center justify-center"
          disabled={selectedEffects.length === 0 || isSearching}
        >
          <Beaker className="mr-2 w-5 h-5" />
          Find Recipe
        </button>
        
        <button
          onClick={resetSelections}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
          disabled={isSearching}
        >
          <RotateCcw className="mr-2 w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Search Progress */}
      {isSearching && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Searching for recipes...</span>
            <span>{Math.round(searchProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${searchProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {searchProgress === 100 && (
        <div className="space-y-6">
          {solutionFound ? (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-green-700 font-medium mb-2">
                <Check className="mr-2 w-5 h-5" />
                Perfect Match Found!
              </div>
              <p className="text-sm text-green-600 mb-2">
                We found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''} that 
                will produce a strain with all your selected effects.
              </p>
            </div>
          ) : bestSolution ? (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <AlertTriangle className="mr-2 w-5 h-5" />
                Partial Match Found
              </div>
              <p className="text-sm text-yellow-600 mb-2">
                We found a recipe that includes {bestSolution.matched.length} out of {selectedEffects.length} 
                desired effects ({Math.round(calculateEffectMatchPercentage(bestSolution))}% match).
              </p>
            </div>
          ) : searchResults.length === 0 && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center text-red-700 font-medium mb-2">
                <AlertTriangle className="mr-2 w-5 h-5" />
                No Matches Found
              </div>
              <p className="text-sm text-red-600 mb-2">
                We couldn't find any recipes that produce a strain with your selected effects.
                Try selecting fewer effects or different combinations.
              </p>
            </div>
          )}
          
          {/* Solution Cards */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Recipe Solutions</h3>
              
              {searchResults.map((solution, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    solutionFound 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">
                      Recipe #{index + 1} - {solution.seed.name}
                    </h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {Math.round(calculateEffectMatchPercentage(solution))}% Match
                    </span>
                  </div>
                  
                  {/* Recipe Steps */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                        1
                      </div>
                      <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                      <div className="flex items-center bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                        <span className="text-xl mr-2">{drugTypes[selectedDrugType]?.emoji || '🌱'}</span>
                        <span>Start with <strong>{solution.seed.name}</strong></span>
                      </div>
                    </div>
                    
                    {solution.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                          {idx + 2}
                        </div>
                        <ArrowRight className="mx-2 w-4 h-4 text-gray-400" />
                        <div className="flex items-center bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                          <span className="text-xl mr-2">{ingredient.emoji || '🧪'}</span>
                          <span>Add <strong>{ingredient.name}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Effects Result */}
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="font-medium text-gray-700 mb-2">
                      This recipe will create a strain with these effects:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {solution.allEffects.map((effect) => (
                        <div key={effect} className="relative group">
                          <span
                            className={`px-2 py-1 text-white rounded-full text-xs inline-flex items-center ${
                              selectedEffects.includes(effect) 
                                ? 'ring-2 ring-white' 
                                : 'opacity-70'
                            }`}
                            style={{ backgroundColor: effectColors[effect] || '#333' }}
                          >
                            {effect}
                            <span className="ml-1 text-xs bg-white bg-opacity-20 px-1 rounded">
                              {effectDetails[effect]?.type.charAt(0)}
                            </span>
                            {!selectedEffects.includes(effect) && (
                              <span className="ml-1 text-xs">+</span>
                            )}
                          </span>
                          {/* Tooltip */}
                          <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded-md shadow-lg w-48 text-xs bottom-full left-0 mb-2">
                            <div className="font-medium mb-1">{effect}</div>
                            <div className="text-gray-300 mb-1">Type: {effectDetails[effect]?.type}</div>
                            <div className="text-gray-300">Value: {(effectDetails[effect]?.multiplier * 100).toFixed(0)}%</div>
                            <div className="mt-1">{effectDetails[effect]?.description}</div>
                            <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 bottom-0 left-4 translate-y-1"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {!solutionFound && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium text-yellow-700">Missing effects: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedEffects.filter(e => !solution.matched.includes(e)).map((effect) => (
                            <div key={effect} className="relative group">
                              <span 
                                className="inline-block px-2 py-0.5 rounded-full text-xs text-white"
                                style={{ backgroundColor: effectColors[effect] || '#333' }}
                              >
                                {effect}
                                <span className="ml-1 text-xs bg-white bg-opacity-20 px-1 rounded">
                                  {effectDetails[effect]?.type.charAt(0)}
                                </span>
                              </span>
                              {/* Tooltip */}
                              <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded-md shadow-lg w-48 text-xs bottom-full left-0 mb-2">
                                <div className="font-medium mb-1">{effect}</div>
                                <div className="text-gray-300 mb-1">Type: {effectDetails[effect]?.type}</div>
                                <div className="text-gray-300">Value: {(effectDetails[effect]?.multiplier * 100).toFixed(0)}%</div>
                                <div className="mt-1">{effectDetails[effect]?.description}</div>
                                <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 bottom-0 left-4 translate-y-1"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Information about how it works */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">How the Effect Builder Works</h3>
        <p className="text-sm text-blue-700 mb-2">
          The Effect Builder attempts to find the optimal recipe that will produce a strain with your selected effects.
          It searches through different seeds and ingredient combinations to find solutions that match your criteria.
        </p>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Select up to 8 desired effects for your strain</li>
          <li>Choose the right drug type for your product</li>
          <li>The builder will search for the best recipe to create your desired strain</li>
          <li>Perfect matches include all your selected effects</li>
          <li>Partial matches include some but not all selected effects</li>
        </ul>
        <p className="text-sm text-blue-700 mt-2">
          Note: Not all effect combinations are possible due to game mechanics. The builder will find the closest match possible.
        </p>
      </div>
    </div>
  );
};

export default EffectBuilderTab;