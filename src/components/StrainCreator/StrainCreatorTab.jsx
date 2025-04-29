// src/components/StrainCreator/StrainCreatorTab.jsx
const StrainCreatorTab = ({ seeds, ingredients, recommendedPrice }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Create New Strain</h2>

    <div className="text-lg font-semibold text-green-600">
      Recommended Price: ${recommendedPrice}
    </div>

    {/* Render seeds and ingredients selections here */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {seeds.map((seed) => (
        <div key={seed.id} className="p-4 border rounded bg-white shadow-sm">
          <div className="font-bold">{seed.name}</div>
          <div className="text-sm text-gray-600">{seed.type}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="p-4 border rounded bg-white shadow-sm">
          <div className="font-bold">{ingredient.name}</div>
          <div className="text-sm text-gray-600">{ingredient.effect}</div>
        </div>
      ))}
    </div>
  </div>
);

export default StrainCreatorTab;