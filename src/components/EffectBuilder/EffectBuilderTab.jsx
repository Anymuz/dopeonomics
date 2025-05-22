
/* eslint-disable no-unused-vars */  
// src/components/EffectBuilder/EffectBuilderTab.jsx
const EffectBuilderTab = ({
  ingredients,
  selectedIngredientIds,
  setSelectedIngredientIds,
  selectedIngredients,
  combinedEffects,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Effect Builder</h2>
      <p>Select ingredients to analyze potential combined effects.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id || ingredient.name}
            className={`p-4 border rounded shadow-sm cursor-pointer ${
              selectedIngredientIds.includes(ingredient.id) ? 'border-green-400' : 'border-gray-300'
            }`}
            onClick={() => {
              setSelectedIngredientIds((prev) =>
                prev.includes(ingredient.id)
                  ? prev.filter((id) => id !== ingredient.id)
                  : [...prev, ingredient.id]
              );
            }}
          >
            <div className="font-bold">{ingredient.emoji} {ingredient.name}</div>
            <div className="text-sm text-gray-600">{ingredient.defaultEffect || 'No effect'}</div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Combined Effects Preview</h3>
        <ul className="list-disc list-inside text-gray-800">
          {combinedEffects.length === 0 ? (
            <li>No ingredients selected.</li>
          ) : (
            combinedEffects.map((effect, idx) => (
              <li key={idx}>{effect}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default EffectBuilderTab;