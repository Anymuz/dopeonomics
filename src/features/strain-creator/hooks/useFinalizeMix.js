// Hook to finalize the mix and handle naming before saving it to the store.
// Provides functionality to finalize the mix, set the pending mix, and handle naming confirmation.

// Import callback from React to memoize functions and the mixes store for managing mix data.
import { useCallback } from 'react';
import { calculateProfit, calculateTotalCost,  calculateTotalUnits} from '@features/strain-creator/utils/priceCalculations';

import useMixesStore from '@shared/model/mixes.store';

import useMixing from '@features/strain-creator/hooks/useMixing';
import useNamingModal from '@features/strain-creator/hooks/useNamingModal';
import usePackaging from '@features/strain-creator/hooks/usePackaging';
import usePricing from '@features/strain-creator/hooks/usePricing';
import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';

const useFinalizeMix = () => {
  // Extract the addMix function from the mixes store to add a finalized mix to the store.
  const { addMix } = useMixesStore();

  // Use custom hooks to access the states and state functions needed for finalizing the mix:
  const { currentMix, currentEffects, resetMix } = useMixing();
  const { setIsNamingModalOpen, pendingMix, setPendingMix, name, setName } = useNamingModal();
  const { packagingType } = usePackaging();
  const { priceMultiplier, salePrice, targetMargin } = usePricing();
  const { selectedSeed, selectedDrugType, setSelectedSeed } = useStrainSelection();
  
  // Finalize the mix by checking if a seed is selected, if there are ingredients in the mix, and if the sale price is valid.
  // If all conditions are met, set the pending mix in the modal state and open the naming modal.
  // The pending mix includes the current mix, effects, packaging type, sale price, and total cost.
  // Memoized using useCallback to prevent unnecessary re-renders.
  const finalizeMix = useCallback(() => {
    if (!selectedSeed || currentMix.length === 0 || salePrice <= 0) return;
    setPendingMix({
      id: Date.now(),
      name: name.trim() || 'New Mix',
      seed: selectedSeed,
      drugType: selectedDrugType,
      totalUnits: calculateTotalUnits(selectedSeed),
      ingredients: [...currentMix],  // Spread operator to create a new array of ingredients.
      effects: [...currentEffects], // Creating a new array detaches so the mix doesnt reference the state which will change.
      mixingSequence: [... currentMix].map((ingredient) => ingredient.name),
      salePrice: Math.round(parseFloat(salePrice)),
      totalCost: calculateTotalCost(selectedSeed, currentMix, packagingType),
      profit: calculateProfit(salePrice, selectedSeed, currentMix),      profitMargin: targetMargin,
      priceMultiplier: priceMultiplier,
      packagingType: packagingType,
      favorite: false,
      dateCreated: new Date().toISOString()
    });
    setIsNamingModalOpen(true);
  }, [selectedSeed, 
      currentMix, 
      salePrice, 
      setPendingMix, 
      name, 
      selectedDrugType, 
      currentEffects, 
      packagingType, 
      targetMargin, 
      priceMultiplier, 
      setIsNamingModalOpen]
  );

  // Handle the confirmation of the mix name in the naming modal:
  // If pending mix exists, it saves the mix in the store with provided name and resets modal state.
  // Also resets the mixing state and clears the selected seed.
  const handleConfirmName = useCallback(
    (name) => {
      if (!pendingMix) return;
      addMix({ ...pendingMix, name });
      setIsNamingModalOpen(false);
      setPendingMix(null);
      resetMix();
      setName('');
      setSelectedSeed(null);
    }, [pendingMix, 
        addMix, 
        setIsNamingModalOpen, 
        setPendingMix,
        resetMix, 
        setName, 
        setSelectedSeed]
  );

  // Return the finalizeMix function and handleConfirmName function to be used in components.
  return { finalizeMix, handleConfirmName };
};
export default useFinalizeMix;