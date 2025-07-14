// Hook to manage pricing state in the strain creator feature.
// Calculates the sale price based on current effects and selected drug type.
// Also calculates the target profit margin based on the sale price and selected seed.

// Import react hooks for state and effect,utility functions and states used from other hooks.
import { useState, useEffect } from 'react';
import { calculateRecommendedPrice, calculateProfitMargin,} from '@features/strain-creator/utils/priceCalculations';

const usePricing = (currentEffects, currentMix, selectedDrugType, selectedSeed) => {
  // The selectedSeed and selectedDrugType states from custom useStrainSelection hook are used in this hook.
  // The currentEffects and currentMix states from custom useMixing hook are used in this hook.

  // State variables for this hook to manage sale price, target margin, and price multiplier:
  const [salePrice, setSalePrice] = useState(0);
  const [targetMargin, setTargetMargin] = useState(0.5);
  const [priceMultiplier, setPriceMultiplier] = useState(1);

  // Effect to update the sale price based on current effects and selected drug type:
  useEffect(() => {
    if (selectedDrugType && selectedSeed && currentEffects.length) {
      const recommended = calculateRecommendedPrice(currentEffects, selectedDrugType);
      if (recommended !== salePrice) setSalePrice(recommended);
    }
  }, [currentEffects, selectedDrugType, selectedSeed, salePrice]);

  // Effect to update the target margin based on sale price, selected seed, and current mix:
  useEffect(() => {
    if (salePrice > 0 && selectedSeed) {
      const margin = calculateProfitMargin(salePrice, selectedSeed, currentMix);
      setTargetMargin(parseFloat(margin));
    }
  }, [salePrice, selectedSeed, currentMix]);

  // Return the pricing state and setters:
  // Allowing components to access and modify the sale price, target margin, and price multiplier.
  return {
    salePrice,
    setSalePrice,
    targetMargin,
    setTargetMargin,
    priceMultiplier,
    setPriceMultiplier,
  };
};
export default usePricing;