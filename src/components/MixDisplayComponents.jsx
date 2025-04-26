import React from 'react';

// Updated Current Mix Display component to show the sequential nature of the mix
export const CurrentMixDisplay = ({ 
  selectedSeed, 
  currentMix, 
  currentEffects, 
  effectColors, 
  additiveEffects, 
  calculateTotalCost,
  drugTypes
}) => (
  <div className="mb-6">
    <h3 className="text-md font-medium text-gray-700 mb-2">Mix Summary</h3>
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
              <div className="text-sm text-gray-600 ml-7">Base Effect: {selectedSeed.effect}</div>
            </div>
          )}
          
          {currentMix.length > 0 && (
            <div className="mb-3">
              <div className="font-medium mb-1">Ingredient Sequence:</div>
              <div className="flex flex-col space-y-2">
                {currentMix.map((ingredient, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium mr-2">
                      {idx + 1}
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center">
                      <span className="text-xl mr-1">{ingredient.emoji || '🧪'}</span>
                      {ingredient.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentEffects.length > 0 && (
            <div className="mb-3">
              <div className="font-medium mb-1">Final Effects:</div>
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
              <span>Cost per Unit:</span>
              <span className="font-medium">${Math.round(calculateTotalCost())}</span>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

export default CurrentMixDisplay;