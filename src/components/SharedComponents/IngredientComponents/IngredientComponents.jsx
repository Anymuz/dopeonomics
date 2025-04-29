// src/components/SharedComponents/IngredientComponents/IngredientComponents.jsx
const IngredientComponents = ({ ingredients, selectedIngredients, onSelect }) => {
  if (!ingredients || ingredients.length === 0) {
    return <div className="text-gray-500">No ingredients available.</div>;
  }

  const isSelected = (ingredient) =>
    selectedIngredients.some((ing) => ing.id === ingredient.id);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ingredients.map((ingredient) => (
        <button
          key={ingredient.id}
          onClick={() => onSelect(ingredient)}
          className={`p-4 rounded-lg border-2 transition-all duration-150
            ${isSelected(ingredient)
              ? 'border-green-600 bg-green-100'
              : 'border-gray-300 hover:border-gray-500'}`}
        >
          <div className="font-bold text-md">{ingredient.name}</div>
          <div className="text-xs text-gray-600">{ingredient.effect}</div>
        </button>
      ))}
    </div>
  );
};

export default IngredientComponents;
