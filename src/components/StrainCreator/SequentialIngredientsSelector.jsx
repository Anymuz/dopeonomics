// src/components/StrainCreator/SequentialIngredientsSelector.jsx
import React from 'react';

const SequentialIngredientsSelector = ({
  ingredients,
  //currentMix,
  //currentEffects,
  //mixingHistory,
  addIngredient,
  removeLastIngredient,
  resetMix,
  //finalizeMix,
  //selectedDrugType
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold mb-2">Add Ingredients:</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {ingredients.map((ing) => (
          <button
            key={ing.name}
            onClick={() => addIngredient(ing)}
            className="px-3 py-1 bg-yellow-100 border border-yellow-400 rounded"
          >
            {ing.emoji} {ing.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={removeLastIngredient}
          className="px-3 py-1 text-sm bg-gray-200 rounded"
        >
          Undo
        </button>
        <button
          onClick={resetMix}
          className="px-3 py-1 text-sm bg-red-200 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SequentialIngredientsSelector;
