/* eslint-disable no-unused-vars */
// src/components/StrainCreator/StrainCreatorTab.jsx
const StrainCreatorTab = ({
  seeds,
  ingredients,
  selectedSeed,
  setSelectedSeed,
  selectedIngredientIds,
  setSelectedIngredientIds,
  strainName,
  setStrainName,
  selectedQuality,
  setSelectedQuality,
  syntheticStrain,
  onSave,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Create New Strain</h2>

    <div>
      <label className="block mb-2 font-semibold">Strain Name:</label>
      <input
        className="border p-2 rounded w-full"
        value={strainName}
        onChange={(e) => setStrainName(e.target.value)}
        placeholder="Enter strain name"
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold">Select Quality:</label>
      <select
        className="border p-2 rounded w-full"
        value={selectedQuality}
        onChange={(e) => setSelectedQuality(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <div>
      <h3 className="text-xl font-semibold mt-4">Select Ingredients:</h3>
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
            <div className="text-sm text-gray-600">
              {ingredient.defaultEffect || 'No effect'}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-4 mt-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold">Strain Preview</h3>
      <p><strong>Name:</strong> {syntheticStrain.name || 'Unnamed'}</p>
      <p><strong>Quality:</strong> {syntheticStrain.quality}</p>
      <p><strong>Effects:</strong> {syntheticStrain.effects.join(', ') || 'None selected'}</p>
      <p className="text-green-700 font-semibold">Recommended Price: ${syntheticStrain.price}</p>
    </div>

    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
      onClick={onSave}
    >
      Save Strain
    </button>
  </div>
);

export default StrainCreatorTab;
