// src/components/EffectBuilder/EffectBuilderTab.jsx
const EffectBuilderTab = ({ ingredients }) => {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Effect Builder</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="p-4 border-2 rounded-lg shadow-sm bg-white hover:border-blue-400 transition-all duration-150"
            >
              <div className="font-semibold text-lg">{ingredient.name}</div>
              <div className="text-sm text-gray-600">{ingredient.effect}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default EffectBuilderTab;