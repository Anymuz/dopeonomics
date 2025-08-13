// StrainCreatorTab - Main container for the strain creation workflow.
// Orchestrates all strain creation components including selectors, displays, and controls.

// Importing selector components for user input.
import DrugTypeSelector from '@features/strain-creator/ui/selectors/DrugTypeSelector';
import SeedSelector from '@features/strain-creator/ui/selectors/SeedSelector';
import SequentialIngredientsSelector from '@features/strain-creator/ui/selectors/SequentialIngredientsSelector';
import PackagingSelector from '@features/strain-creator/ui/selectors/PackagingSelector';

// Importing hooks for state management and user interactions.
import useMixing from '@features/strain-creator/hooks/useMixing';
import useNamingModal from '@features/strain-creator/hooks/useNamingModal';
import usePricing from '@features/strain-creator/hooks/usePricing';
import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';
import usePackaging from '@features/strain-creator/hooks/usePackaging';

// Importing display components for showing current state and calculations.
import CurrentMixDisplay from '@features/strain-creator/ui/displays/CurrentMixDisplay';
import MixingHistoryDisplay from '@features/strain-creator/ui/displays/MixingHistoryDisplay';
import MixSummaryDisplay from '@features/strain-creator/ui/displays/MixSummaryDisplay';
import ProfitInfoDisplay from '@features/strain-creator/ui/displays/ProfitInfoDisplay';

// Importing additional UI components.
import PriceMarginInputs from '@features/strain-creator/ui/PriceMarginInputs';
import NamePromptModal from '@features/strain-creator/ui/NamePromptModal';

// Importing shared UI components and icons.
import { IconButton } from '@shared/ui/Button';
import { CheckCircle } from 'lucide-react';

// Importing data and utility functions.
import { drugTypes } from '@features/strain-creator/data/strainData';
import { calculateTotalCost } from '@features/strain-creator/utils/priceCalculations';

const StrainCreatorTab = () => {
  const { selectedDrugType, selectedSeed, setSelectedSeed, setSelectedDrugType } = useStrainSelection('weed');
  const { currentMix, currentEffects, mixingHistory, addIngredient, removeLastIngredient, resetMix} = useMixing(selectedSeed, selectedDrugType);
  const { salePrice, targetMargin, priceMultiplier, handlePriceChange, handleMarginChange, setPriceMultiplier } = usePricing(currentEffects, currentMix, selectedDrugType, selectedSeed);
  const { isNamingModalOpen, openNamingModal, handleNameConfirm } = useNamingModal();
  const { packagingType } = usePackaging('baggies');

  const handleMultiplierChange = (e) => {
    setPriceMultiplier(Number(e.target.value));
  };

  const getTotalCost = () => calculateTotalCost(selectedSeed, currentMix);

  return (
      <div>
        <DrugTypeSelector 
          selectedDrugType={selectedDrugType}
          setSelectedDrugType={setSelectedDrugType}  
          />
        <SeedSelector 
          selectedDrugType={selectedDrugType}
          selectedSeed={selectedSeed}
          setSelectedSeed={setSelectedSeed}
        />
        <SequentialIngredientsSelector
          currentMix={currentMix}
          currentEffects={currentEffects}
          mixingHistory={mixingHistory}
          addIngredient={addIngredient}
          removeLastIngredient={removeLastIngredient}
          resetMix={resetMix}
        />
        <CurrentMixDisplay 
          selectedSeed={selectedSeed}
          currentMix={currentMix}
          currentEffects={currentEffects}
          calculateTotalCost={getTotalCost}
          drugTypes={drugTypes}
        />
        <MixingHistoryDisplay 
          mixingHistory={mixingHistory}
        />
        <MixSummaryDisplay 
          selectedSeed={selectedSeed}
          currentMix={currentMix}
          currentEffects={currentEffects}
          getTotalCost={getTotalCost}
        /> 
        <PackagingSelector />
        <PriceMarginInputs
          salePrice={salePrice}
          targetMargin={targetMargin}
          priceMultiplier={priceMultiplier}
          handlePriceChange={handlePriceChange}
          handleMarginChange={handleMarginChange}
          handleMultiplierChange={handleMultiplierChange}
        />
        <ProfitInfoDisplay 
          calculateProfit={() => salePrice - getTotalCost()}
          calculateProfitMargin={() => ((salePrice - getTotalCost()) / salePrice) * 100}
          calculateTotalBuddyProfit={() => (salePrice - getTotalCost()) * 12 * priceMultiplier}
          calculatePackagingProfit={() => salePrice - getTotalCost()} // Simplified for now
          priceMultiplier={priceMultiplier}
          packagingType={packagingType}
          drugType={selectedDrugType}
        />
        {/* Save Mix Button */}
        <IconButton
          icon={CheckCircle}
          onClick={() => openNamingModal(currentMix)}
          disabled={!selectedSeed || currentMix.length === 0 || salePrice <= 0}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
        >
          Save Creation
        </IconButton>
      
      {/* Conditional rendering in parent */}
      {isNamingModalOpen && <NamePromptModal onConfirm={handleNameConfirm} />}
      </div>
  );
};
export default StrainCreatorTab;