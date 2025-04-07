import React, { useEffect } from 'react';
import { Package, Calculator, Info } from 'lucide-react';

// Strain Name Input component
export const StrainNameInput = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Strain Name:</label>
    <input
      type="text"
      className="w-full p-2 border rounded-md"
      placeholder="Enter a name for your strain"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// Updated SeedSelector component that only shows seeds for the selected drug type
export const SeedSelector = ({ seedTypes, selectedSeed, onSelectSeed, selectedDrugType }) => {
  // Filter seeds to only show those matching the selected drug type
  const filteredSeeds = seedTypes.filter(seed => seed.drugType === selectedDrugType);
  
  // Get emoji and title for the drug type
  const drugTypeInfo = {
    weed: { emoji: '🌿', title: 'Cannabis Seeds' },
    meth: { emoji: '💎', title: 'Methamphetamine Precursors' },
    cocaine: { emoji: '❄️', title: 'Cocaine Precursors' }
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">
        Select {drugTypeInfo[selectedDrugType]?.title || 'Base Product'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredSeeds.map((seed) => (
          <button
            key={seed.name}
            className={`flex items-center justify-start gap-3 p-3 rounded-lg text-left transition-all duration-200
              bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-sm
              ${selectedSeed?.name === seed.name ? 'bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 shadow-md' : ''}`}
            onClick={() => onSelectSeed(seed)}
          >
            <span className="text-2xl">{drugTypeInfo[selectedDrugType]?.emoji || '🌱'}</span>
            <div>
              <div className="font-medium">{seed.name}</div>
              <div className="text-sm text-gray-500">${seed.cost} - {seed.effect}</div>
              {seed.description && (
                <div className="text-xs text-gray-500 mt-1">{seed.description}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Updated IngredientsSelector component with drug type filtering
export const IngredientsSelector = ({ 
  ingredients, 
  currentMix, 
  additiveEffects, 
  effectColors, 
  toggleIngredient,
  selectedDrugType 
}) => {
  // Helper function to determine if an ingredient is relevant for the selected drug type
  const isIngredientRelevantForDrugType = (ingredient) => {
    // Common ingredients that work with all drug types (first 8 ingredients)
    const commonIngredients = [
      'Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagra', 'Mouth Wash', 'Flu Medicine', 'Gasoline'
    ];
    
    if (commonIngredients.includes(ingredient.name)) {
      return true;
    }
    
    // Drug-specific ingredients
    const methSpecificIngredients = ['Glass Shards', 'Blue Food Coloring'];
    const cocaineSpecificIngredients = ['Baking Soda', 'Caffeine Powder'];
    
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
  };
  
  // Filter ingredients based on drug type
  const filteredIngredients = ingredients.filter(isIngredientRelevantForDrugType);

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">Select Ingredients</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredIngredients.map((ingredient) => {
          const isSelected = currentMix.some(item => item.name === ingredient.name);
          const defaultEffect = additiveEffects[ingredient.name];
          
          return (
            <button
              key={ingredient.name}
              className={`p-3 rounded-lg text-left transition-all duration-200
                bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-sm
                ${isSelected ? 'bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-500 shadow-md' : ''}`}
              onClick={() => toggleIngredient(ingredient)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{ingredient.emoji || '🧪'}</span>
                  <span className="font-medium">{ingredient.name}</span>
                </div>
                <span className="text-md font-medium text-gray-700">${ingredient.cost}</span>
              </div>
              <div className="flex justify-start">
                <span
                  className="px-2 py-0.5 text-white rounded-full text-xs"
                  style={{ backgroundColor: effectColors[defaultEffect] || '#333' }}
                >
                  {defaultEffect}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Also define IngredientSelector as a copy of IngredientsSelector for compatibility
export const IngredientSelector = IngredientsSelector;

// Current Mix Display component - UPDATED for whole number formatting
export const CurrentMixDisplay = ({ 
  selectedSeed, 
  currentMix, 
  currentEffects, 
  effectColors, 
  additiveEffects, 
  calculateTotalCost,
  calculateRecommendedPrice 
}) => (
  <div className="mb-6">
    <h3 className="text-md font-medium text-gray-700 mb-2">Current Mix</h3>
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      {!selectedSeed && currentMix.length === 0 ? (
        <p className="text-gray-500 text-center py-2">Select a seed and ingredients to begin</p>
      ) : (
        <>
          {selectedSeed && (
            <div className="mb-3">
              <div className="font-medium text-purple-700 flex items-center">
                <span className="text-xl mr-2">🌱</span>
                Base Seed: {selectedSeed.name}
              </div>
              <div className="text-sm text-gray-600 ml-7">Effect: {selectedSeed.effect}</div>
            </div>
          )}
          
          {currentMix.length > 0 && (
            <div className="mb-3">
              <div className="font-medium mb-1">Ingredients:</div>
              <div className="flex flex-wrap gap-2">
                {currentMix.map((ingredient, idx) => (
                  <div key={idx} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                    <span className="text-xl mr-1">{ingredient.emoji || '🧪'}</span>
                    {ingredient.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentEffects.length > 0 && (
            <div className="mb-3">
              <div className="font-medium mb-1">Effects:</div>
              <div className="flex flex-wrap gap-2">
                {currentEffects.map((effect, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-white rounded-full text-xs"
                    style={{ backgroundColor: effectColors[effect] || '#333' }}
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span>Cost per Bud:</span>
              <span className="font-medium">${Math.round(calculateTotalCost())}</span>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

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

export const calculateRecommendedPrice = (effects, productType = 'Weed') => {
  // Get base price based on product type
  const basePrice = productType === 'Weed' ? 35 : 
                    productType === 'Meth' ? 70 : 
                    productType === 'Cocaine' ? 150 : 35;
  
  // Calculate total effect multiplier
  const effectMultipliers = {
    'Anti-Gravity': 0.54,
    'Athletic': 0.32,
    'Balding': 0.30,
    'Bright-Eyed': 0.40,
    'Calming': 0.10,
    'Calorie-Dense': 0.28,
    'Cyclopean': 0.56,
    'Disorienting': 0.00,
    'Electrifying': 0.50,
    'Energizing': 0.22,
    'Euphoric': 0.18,
    'Explosive': 0.00,
    'Focused': 0.16,
    'Foggy': 0.36,
    'Gingeritis': 0.20,
    'Glowing': 0.48,
    'Jennerising': 0.42,
    'Laxative': 0.00,
    'Long Faced': 0.52,
    'Munchies': 0.12,
    'Paranoia': 0.00,
    'Refreshing': 0.14,
    'Schizophrenia': 0.00,
    'Sedating': 0.26,
    'Seizure-Inducing': 0.00,
    'Shrinking': 0.60,
    'Slippery': 0.34,
    'Smelly': 0.00,
    'Sneaky': 0.24,
    'Spicy': 0.38,
    'Thought-Provoking': 0.44,
    'Toxic': 0.00,
    'Tropic Thunder': 0.46,
    'Zombifying': 0.58
  };

  const totalMultiplier = effects.reduce((total, effect) => {
    return total + (effectMultipliers[effect] || 0);
  }, 0);

  // Apply the formula: Final Price = Base Price * (1 + total effect multiplier)
  return Math.round(basePrice * (1 + totalMultiplier));
};

// Price Margin Inputs component - UPDATED for whole number formatting
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

// Profit Info Display component - UPDATED for whole number formatting
export const ProfitInfoDisplay = ({ 
  calculateProfit, 
  calculateProfitMargin, 
  calculateTotalBuddyProfit,
  calculatePackagingProfit,
  priceMultiplier,
  packagingType
}) => (
  <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
    <div className="flex justify-between items-center text-gray-700">
      <div>Profit per bud sold:</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        ${Math.round(calculateProfit())}
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700">
      <div>Profit margin:</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        {calculateProfitMargin()}%
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700">
      <div>Total profit from seed (12 buds):</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        ${Math.round(calculateProfit() * 12)}
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700 pt-2 mt-2 border-t border-gray-200">
      <div>Total profit with {priceMultiplier}x multiplier:</div>
      <div className={calculateTotalBuddyProfit() >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
        ${Math.round(calculateTotalBuddyProfit())}
      </div>
    </div>
    
    <div className="pt-4 mt-4 border-t border-gray-200">
      <div className="font-medium mb-2 text-gray-800 flex items-center">
        <Package className="mr-2 w-4 h-4 text-blue-500" />
        Packaging Profit Analysis
      </div>
      <div className="flex justify-between items-center mb-1 text-gray-700">
        <div>Packaging type:</div>
        <div className="font-medium">{packagingType === 'baggies' ? 'Baggies ($1 each)' : 'Jars ($3 per 5 buds)'}</div>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <div>Profit after packaging costs:</div>
        <div className={calculatePackagingProfit() >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          ${Math.round(calculatePackagingProfit())}
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <div>Profit per bud including packaging:</div>
        <div className={calculatePackagingProfit() / 12 >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          ${Math.round(calculatePackagingProfit() / 12)}
        </div>
      </div>
    </div>
    
    <div className="text-sm mt-2 text-gray-500 flex items-center">
      <Info className="inline-block mr-1 w-4 h-4" />
      <span>Note:</span> Packaging costs affect overall profitability
    </div>
  </div>
);