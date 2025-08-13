// Hook for managing pricing state and calculations in the strain creator.
// Calculates sale prices, profit margins, and handles price multiplier functionality.
// Automatically updates pricing recommendations based on effects and drug type selection.

// Importing React hooks for state management and side effects.
import { useState, useEffect } from 'react';

// Importing utility functions for price and profit calculations.
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

  // Handler functions for manual price/margin changes
  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setSalePrice(value);
  };

  const handleMarginChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTargetMargin(value);
  };

  // Return the pricing state, setters, and handlers:
  // Allowing components to access and modify the sale price, target margin, and price multiplier.
  return {
    salePrice,
    setSalePrice,
    targetMargin,
    setTargetMargin,
    priceMultiplier,
    setPriceMultiplier,
    handlePriceChange,
    handleMarginChange,
  };
};
export default usePricing;