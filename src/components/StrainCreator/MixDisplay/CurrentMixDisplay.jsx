// src/components/StrainCreator/MixDisplay/CurrentMixDisplay.jsx
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
      <p><strong>Total Cost:</strong> ${calculateTotalCost().toFixed(2)}</p>
      <p><strong>Yield:</strong> {yieldAmount} {drugTypes[selectedSeed?.drugType]?.unit}</p>
    </div>
  );
};

export default CurrentMixDisplay;
