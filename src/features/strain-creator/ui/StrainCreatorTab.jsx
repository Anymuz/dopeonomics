import React from 'react';
import DrugTypeSelector from '@features/strain-creator/ui/selectors/DrugTypeSelector';
import SeedSelector from '@features/strain-creator/ui/selectors/SeedSelector';
import SequentialIngredientsSelector from '@features/strain-creator/ui/selectors/SequentialIngredientsSelector';
import PackagingSelector from '@features/strain-creator/ui/selectors/PackagingSelector';

import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';

// import CurrentMixDisplay from '@features/strain-creator/ui/displays/CurrentMixDisplay';
// import MixingHistoryDisplay from '@features/strain-creator/ui/displays/MixingHistoryDisplay';
// import MixSummaryDisplay from '@features/strain-creator/ui/displays/sMixSummaryDisplay';
// import ProfitInfoDisplay from '@features/strain-creator/ui/displays/ProfitInfoDisplay';

// import PriceMarginInputs from '@features/strain-creator/ui/PriceMarginInputs';
// import NamePromptModal from '@features/strain-creator/ui/NamePromptModal';

const StrainCreatorTab = () => {
  const { selectedDrugType, selectedSeed, setSelectedSeed, setSelectedDrugType } = useStrainSelection('weed');
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
        <SequentialIngredientsSelector />
        {/* <CurrentMixDisplay />
        <MixingHistoryDisplay />
        <MixSummaryDisplay /> */}
        <PackagingSelector />
        {/* <PriceMarginInputs />
        <ProfitInfoDisplay />
        <NamePromptModal /> */}
      </div>
  );
};

export default StrainCreatorTab;