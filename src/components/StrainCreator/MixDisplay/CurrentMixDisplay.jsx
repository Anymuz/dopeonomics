const CurrentMixDisplay = ({
  selectedSeed,
  currentMix,
  currentEffects,
  calculateTotalCost,
  drugTypes
}) => {
  const yieldAmount = drugTypes[selectedSeed?.drugType]?.yieldAmount || 1;

  return (
    <div className="mb-4 p-3 border rounded bg-gray-50">
      <h4 className="font-semibold mb-1">Current Mix</h4>

      <p><strong>Seed:</strong> {selectedSeed?.name || 'None'}</p>
      <p><strong>Ingredients:</strong> {currentMix.map(i => i.name).join(', ') || 'None'}</p>
      <p><strong>Effects:</strong> {currentEffects.join(', ') || 'None'}</p>

      {/* Effect Slot Indicators */}
      <div className="flex items-center space-x-1 my-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${
              i < currentEffects.length
                ? 'bg-green-500 border-green-600'
                : 'bg-gray-200 border-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {currentEffects.length}/8 slots used
        </span>
      </div>

      <p><strong>Total Cost:</strong> ${calculateTotalCost().toFixed(2)}</p>
      <p><strong>Yield:</strong> {yieldAmount} {drugTypes[selectedSeed?.drugType]?.unit}</p>
    </div>
  );
};

export default CurrentMixDisplay;

