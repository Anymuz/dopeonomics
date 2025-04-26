import React, { useState } from 'react';
import { PlusCircle, CornerDownRight, Check, RotateCcw, Trash2, XCircle, AlertTriangle } from 'lucide-react';

// Sequential Ingredients Selector - allows adding one ingredient at a time and shows effects after each step
export const SequentialIngredientsSelector = ({ 
  ingredients, 
  currentMix, 
  currentEffects,
  mixingHistory,
  effectColors, 
  additiveEffects,
  addIngredient,
  removeLastIngredient,
  resetMix,
  finalizeMix,
  selectedDrugType,
  simulateAddIngredient // Optional function to preview effects
}) => {
  const [showSelectIngredient, setShowSelectIngredient] = useState(false);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  const [hoveredEffects, setHoveredEffects] = useState(null);
  
  // Helper function to determine if an ingredient is relevant for the selected drug type
  const isIngredientRelevantForDrugType = (ingredient) => {
    // Common ingredients that work with all drug types (first 8 ingredients)
    const commonIngredients = [
      'Cuke', 'Banana', 'Paracetamol', 'Donut', 'Viagra', 'Mouth Wash', 'Flu Medicine', 'Gasoline',
      'Energy Drink', 'Motor Oil', 'Mega Bean', 'Chili', 'Battery', 'Iodine', 'Addy', 'Horse Semen'
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
  
  // Handle ingredient hover to show preview of effects
  const handleIngredientHover = (ingredient) => {
    setHoveredIngredient(ingredient);
    
    if (simulateAddIngredient && currentEffects) {
      const simulation = simulateAddIngredient(currentEffects, ingredient);
      setHoveredEffects(simulation.newEffects);
    }
  };
  
  const handleIngredientLeave = () => {
    setHoveredIngredient(null);
    setHoveredEffects(null);
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">Mix Creation Process</h3>
      
      {/* Current Mix Status */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-800">Current Mix Status</h4>
          <div>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Step {currentMix.length}
            </span>
          </div>
        </div>
        
        {/* Current Effects Display */}
        <div className="mb-3">
          <div className="text-sm text-gray-700 mb-1">Current Effects:</div>
          {currentEffects.length > 0 ? (
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
          ) : (
            <div className="text-sm text-gray-500 italic">No effects yet. Start by adding an ingredient.</div>
          )}
        </div>
        
        {/* Hovered Effects Preview (if available) */}
        {hoveredEffects && (
          <div className="mb-3 bg-blue-50 p-2 rounded-md border border-blue-100">
            <div className="text-sm text-blue-700 mb-1 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Preview: If you add {hoveredIngredient.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {hoveredEffects.map((effect, idx) => (
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
        
        {/* Available Effect Slots */}
        <div className="mb-3">
          <div className="text-sm text-gray-700 mb-1">Effect Slots:</div>
          <div className="flex items-center gap-1">
            {Array(8).fill(0).map((_, idx) => (
              <div 
                key={idx} 
                className={`w-3 h-3 rounded-full ${idx < currentEffects.length ? 'bg-green-500' : 'bg-gray-300'}`}
                title={idx < currentEffects.length ? `Slot ${idx+1}: ${currentEffects[idx]}` : 'Empty slot'}
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              {currentEffects.length}/8 slots used
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowSelectIngredient(true)}
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Ingredient
          </button>
          
          {currentMix.length > 0 && (
            <button
              onClick={removeLastIngredient}
              className="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Undo Last Step
            </button>
          )}
          
          {currentMix.length > 0 && (
            <button
              onClick={resetMix}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Reset Mix
            </button>
          )}
          
          {currentMix.length > 0 && (
            <button
              onClick={finalizeMix}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"
            >
              <Check className="w-4 h-4 mr-1" />
              Finalize Mix
            </button>
          )}
        </div>
      </div>
      
      {/* Mixing History */}
      {mixingHistory && mixingHistory.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <h4 className="font-medium text-gray-800 mb-3">Mixing History</h4>
          <div className="space-y-3">
            {mixingHistory.map((step, idx) => (
              <div key={idx} className="border-l-2 border-blue-400 pl-3">
                <div className="text-sm font-medium text-gray-700">
                  Step {step.step}: {step.ingredient}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.changes.map((change, changeIdx) => (
                    <div key={changeIdx} className="flex items-center">
                      <CornerDownRight className="w-3 h-3 mr-1 text-blue-400" />
                      {change}
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {step.effectsAfter.map((effect, effectIdx) => (
                    <span
                      key={effectIdx}
                      className="px-1.5 py-0.5 text-white rounded-full text-xs"
                      style={{ backgroundColor: effectColors[effect] || '#333' }}
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Ingredient Selection Dialog */}
      {showSelectIngredient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Select an Ingredient for Step {currentMix.length + 1}
              </h3>
              <button 
                onClick={() => setShowSelectIngredient(false)} 
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredIngredients.map((ingredient) => {
                const defaultEffect = ingredient.defaultEffect;
                
                return (
                  <button
                    key={ingredient.name}
                    className="p-3 rounded-lg text-left transition-all duration-200
                      bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-500"
                    onClick={() => {
                      addIngredient(ingredient);
                      setShowSelectIngredient(false);
                    }}
                    onMouseEnter={() => handleIngredientHover(ingredient)}
                    onMouseLeave={handleIngredientLeave}
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
                    
                    {ingredient.interactions && ingredient.interactions.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded">
                          {ingredient.interactions.length} interactions
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setShowSelectIngredient(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
        <p><strong>How mixing works:</strong> Each ingredient can transform existing effects and add its own effect. The order you add ingredients matters!</p>
        <p className="mt-1">Each strain can have a maximum of 8 effects. If there's no room for an ingredient's effect, it won't be added.</p>
      </div>
    </div>
  );
};

export default SequentialIngredientsSelector;