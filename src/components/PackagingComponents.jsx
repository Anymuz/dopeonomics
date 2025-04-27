import React, { useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { calculateRecommendedPrice } from '../data/pricing.jsx';

// Packaging Selector component
export const PackagingSelector = ({ packagingType, setPackagingType }) => (
  <div className="mb-6">
    <h3 className="text-md font-medium text-gray-700 mb-2">Packaging Type</h3>
    <div className="flex gap-4">
      <button
        className={`flex-1 p-3 rounded-lg border ${
          packagingType === 'baggies' 
            ? 'bg-green-50 border-green-500' 
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => setPackagingType('baggies')}
      >
        <div className="font-medium text-center">Baggies</div>
        <div className="text-sm text-center text-gray-500">$1 each</div>
      </button>
      
      <button
        className={`flex-1 p-3 rounded-lg border ${
          packagingType === 'jars' 
            ? 'bg-green-50 border-green-500' 
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => setPackagingType('jars')}
      >
        <div className="font-medium text-center">Jars</div>
        <div className="text-sm text-center text-gray-500">$3 per 5 buds</div>
      </button>
    </div>
  </div>
);

// Price Margin Inputs component 
export const PriceMarginInputs = ({ 
  salePrice, 
  targetMargin, 
  priceMultiplier,
  setPriceMultiplier,
  setSalePrice, 
  setTargetMargin,
  calculateMarginFromSalePrice,
  calculateSalePriceFromMargin,
  currentEffects, 
  productType = 'Weed' 
}) => {
  // Calculate recommended price based on current effects
  const recommendedPrice = currentEffects.length ? 
    Math.round(calculateRecommendedPrice(currentEffects, productType)) : 0;
  
  // Set the sale price to recommended price when effects change
  useEffect(() => {
    if (recommendedPrice > 0) {
      setSalePrice(recommendedPrice);
      calculateMarginFromSalePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendedPrice]);

  // Handler to ensure only whole numbers are entered
  const handlePriceChange = (e) => {
    // Parse as integer, defaulting to 0 if invalid
    const newPrice = parseInt(e.target.value) || 0;
    setSalePrice(newPrice);
    calculateMarginFromSalePrice();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($):</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={salePrice}
              onChange={handlePriceChange}
              min="0"
              step="1" // Only allow whole numbers
              onBlur={() => {
                // Ensure the value is a whole number when the field loses focus
                setSalePrice(Math.round(salePrice));
                calculateMarginFromSalePrice();
              }}
            />
          </div>
          {recommendedPrice > 0 && (
            <div className="text-sm text-green-600 mt-1">
              Recommended: ${recommendedPrice}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Margin (%):</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="flex-1 p-2 border rounded-md"
              value={targetMargin}
              onChange={(e) => {
                setTargetMargin(e.target.value);
                calculateSalePriceFromMargin();
              }}
              min="0"
              max="100"
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              onClick={calculateSalePriceFromMargin}
            >
              <Calculator className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price Multiplier (1-20x):</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min="1"
            max="20"
            step="1"
            value={priceMultiplier}
            onChange={(e) => setPriceMultiplier(parseInt(e.target.value))}
          />
          <span className="font-medium text-gray-800 min-w-[30px]">{priceMultiplier}x</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Multiplier affects total profit calculations but not per-bud prices
        </div>
      </div>
    </div>
  );
};