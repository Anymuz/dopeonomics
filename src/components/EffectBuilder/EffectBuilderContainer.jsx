import React, { useState } from 'react';
import EffectBuilderTab from './EffectBuilderTab';
import { seedTypes, ingredients, effectColors, drugTypes } from '@data/straindata';
import { searchSolutions, calculateEffectMatchPercentage } from '@utils/effectSolver';

const EffectBuilderContainer = () => {
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [selectedDrugType, setSelectedDrugType] = useState('weed');
  const [effectSearchTerm, setEffectSearchTerm] = useState('');
  const [effectSortOrder, setEffectSortOrder] = useState('alphabetical');
  const [effectTypeFilter, setEffectTypeFilter] = useState('all');

  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [solutionFound, setSolutionFound] = useState(false);
  const [bestSolution, setBestSolution] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const resetSelections = () => {
    setSelectedEffects([]);
    setSolutionFound(false);
    setBestSolution(null);
    setSearchResults([]);
    setSearchProgress(0);
  };

  const handleSearch = async () => {
    if (selectedEffects.length === 0) return;
    setIsSearching(true);
    setSearchProgress(0);
    const result = await searchSolutions({
      selectedEffects,
      selectedDrugType,
      seedTypes,
      ingredients,
      setSearchProgress, // ✅ corrected parameter name
    });

    setIsSearching(false);
    setSolutionFound(result.solutionFound);
    setBestSolution(result.bestSolution);
    setSearchResults(result.searchResults);
    setSearchProgress(100);
  };

  return (
    <EffectBuilderTab
      selectedEffects={selectedEffects}
      setSelectedEffects={setSelectedEffects}
      selectedDrugType={selectedDrugType}
      setSelectedDrugType={setSelectedDrugType}
      drugTypes={drugTypes}
      effectColors={effectColors}
      ingredients={ingredients}
      seedTypes={seedTypes}
      effectSearchTerm={effectSearchTerm}
      setEffectSearchTerm={setEffectSearchTerm}
      effectSortOrder={effectSortOrder}
      setEffectSortOrder={setEffectSortOrder}
      effectTypeFilter={effectTypeFilter}
      setEffectTypeFilter={setEffectTypeFilter}
      handleSearch={handleSearch}
      resetSelections={resetSelections}
      isSearching={isSearching}
      searchProgress={searchProgress}
      solutionFound={solutionFound}
      bestSolution={bestSolution}
      searchResults={searchResults}
      calculateEffectMatchPercentage={calculateEffectMatchPercentage}
    />
  );
};

export default EffectBuilderContainer;
