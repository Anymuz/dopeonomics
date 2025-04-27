import useGameStore from '../stores/GameStore.jsx';
import React from 'react';

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

export const IngredientsSelector = ({ 
    ingredients, 
    currentMix, 
    additiveEffects, 
    effectColors, 
    toggleIngredient,
    decreaseIngredient,
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
  
    const getIngredientQuantity = (ingredientName) => {
        const foundIngredient = currentMix.find(item => item.name === ingredientName);
        return foundIngredient ? foundIngredient.quantity : 0;
      };
  
    return (
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Select Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredIngredients.map((ingredient) => {
            const quantity = getIngredientQuantity(ingredient.name);
            const isSelected = quantity > 0;
            const defaultEffect = additiveEffects[ingredient.name];
            
            return (
              <div
                key={ingredient.name}
                className={`p-3 rounded-lg text-left transition-all duration-200
                  bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-sm
                  ${isSelected ? 'bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-500 shadow-md' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{ingredient.emoji || '🧪'}</span>
                    <span className="font-medium">{ingredient.name}</span>
                  </div>
                  <span className="text-md font-medium text-gray-700">${ingredient.cost}</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span
                    className="px-2 py-0.5 text-white rounded-full text-xs"
                    style={{ backgroundColor: effectColors[defaultEffect] || '#333' }}
                  >
                    {defaultEffect}
                  </span>
                </div>
                
  
                
                {/* Quantity controls */}
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-600">
                    {isSelected ? `Quantity: ${quantity}` : ''}
                  </div>
                  <div className="flex items-center">
                    {isSelected && (
                      <button
                        onClick={() => decreaseIngredient(ingredient)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                        title="Decrease quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => toggleIngredient(ingredient)}
                      className="ml-1 p-1 text-green-600 hover:bg-green-100 rounded-full"
                      title={isSelected ? "Increase quantity" : "Add ingredient"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Ingredient interaction info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
          <p><strong>How ingredients work:</strong> Each ingredient can transform existing effects and add its own effect. The order you add ingredients matters!</p>
          <p className="mt-1">Adding the same ingredient multiple times can produce different results as it interacts with the evolving strain effects.</p>
        </div>
      </div>
    );
  };

// For backwards compatibility
export const IngredientSelector = IngredientsSelector;