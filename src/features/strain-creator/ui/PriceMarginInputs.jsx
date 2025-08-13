// PriceMarginInputs - Component for setting sale price, target margin, and price multiplier.
// Provides pricing controls with input fields and a range slider for the price multiplier.

// Importing shared UI components for consistent styling.
import { InputField } from '@shared/ui/Input';
import SelectorHeader from '@features/strain-creator/ui/primitives/SelectorHeader';

const PriceMarginInputs = ({
  salePrice,
  targetMargin,
  priceMultiplier,
  handlePriceChange,
  handleMarginChange,
  handleMultiplierChange,
}) => {
  return (
    <div className="mb-6">
      <SelectorHeader>Price and Margin</SelectorHeader>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Sale Price"
          type="number"
          step="0.01"
          value={salePrice || ''}
          onChange={handlePriceChange}
          placeholder="0.00"
        />
        <InputField
          label="Target Margin (%)"
          type="number"
          step="0.01"
          value={targetMargin || ''}
          onChange={handleMarginChange}
          placeholder="0.00"
        />
      </div>
      
      {/* Price Multiplier Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Multiplier (1-20x):
        </label>
        <div className="flex items-center gap-3">
          <input
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min="1"
            max="20"
            step="1"
            type="range"
            value={priceMultiplier || 1}
            onChange={handleMultiplierChange}
          />
          <span className="font-medium text-gray-800 min-w-[30px]">
            {priceMultiplier || 1}x
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Multiplier affects total profit calculations but not per-bud prices
        </div>
      </div>
    </div>
  );
};

export default PriceMarginInputs;
