// src/components/StrainCreator/StrainCreatorTab.jsx
import React from 'react';
import DrugTypeSelector from './DrugTypeSelector';
import SeedSelector from './SeedSelector';
import SequentialIngredientsSelector from './SequentialIngredientsSelector';
import CurrentMixDisplay from './CurrentMixDisplay';
import PackagingSelector from './PackagingSelector';
import PriceMarginInputs from './ProfitComponents/PriceMarginInputs';
import ProfitInfoDisplay from './ProfitComponents/ProfitInfoDisplay';
import { CheckCircle } from 'lucide-react';

const StrainCreatorTab = ({
  drugTypes,
  seedTypes,
  selectedDrugType,
  onSelectDrugType,
  selectedSeed,
  setSelectedSeed,
  ingredients,
  currentMix,
  mixingHistory,
  currentEffects,
  packagingType,
  setPackagingType,
  salePrice,
  setSalePrice,
  priceMultiplier,
  setPriceMultiplier,
  targetMargin,
  setTargetMargin,
  addIngredient,
  removeLastIngredient,
  resetMix,
  finalizeMix,
  getTotalCost,
  getProfit,
  getProfitMargin,
  getTotalBatchProfit,
  getPackagingProfit
}) => {
  return (
    <div className="strain-card space-y-4">
       <DrugTypeSelector
        selectedDrugType={selectedDrugType}
        onSelectDrugType={onSelectDrugType}
      />

      <SeedSelector
        seedTypes={seedTypes}
        selectedSeed={selectedSeed}
        onSelectSeed={setSelectedSeed}
        selectedDrugType={selectedDrugType}
      />

      <SequentialIngredientsSelector
        ingredients={ingredients}
        currentMix={currentMix}
        currentEffects={currentEffects}
        mixingHistory={mixingHistory}
        addIngredient={addIngredient}
        removeLastIngredient={removeLastIngredient}
        resetMix={resetMix}
        finalizeMix={finalizeMix}
        selectedDrugType={selectedDrugType}
      />

      <CurrentMixDisplay
        selectedSeed={selectedSeed}
        currentMix={currentMix}
        currentEffects={currentEffects}
        calculateTotalCost={getTotalCost}
        drugTypes={drugTypes}
      />

      <PackagingSelector
        packagingType={packagingType}
        setPackagingType={setPackagingType}
      />

      <PriceMarginInputs
        salePrice={salePrice}
        targetMargin={targetMargin}
        priceMultiplier={priceMultiplier}
        setPriceMultiplier={setPriceMultiplier}
        setSalePrice={setSalePrice}
        setTargetMargin={setTargetMargin}
        currentEffects={currentEffects}
        productType={selectedDrugType}
      />

      {selectedSeed && salePrice > 0 && (
        <ProfitInfoDisplay
          calculateProfit={getProfit}
          calculateProfitMargin={getProfitMargin}
          calculateTotalBuddyProfit={getTotalBatchProfit}
          calculatePackagingProfit={getPackagingProfit}
          priceMultiplier={priceMultiplier}
          packagingType={packagingType}
        />
      )}

      <button
        className="btn-primary"
        onClick={finalizeMix}
        disabled={!selectedSeed || currentMix.length === 0 || salePrice <= 0}
      >
        <CheckCircle className="mr-2 w-5 h-5" />
        Save Creation
      </button>
    </div>
  );
};

export default StrainCreatorTab;
