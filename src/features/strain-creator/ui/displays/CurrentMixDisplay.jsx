// CurrentMixDisplay - Shows current strain creation status and progress.
// Displays selected seed, ingredients, effects, cost calculations, and slot indicators.

// Importing primitive components for consistent styling.
import { DisplayCard } from '@features/strain-creator/ui/primitives/DisplayCard';
import { EffectTag } from '@features/strain-creator/ui/primitives/EffectTag';

const CurrentMixDisplay = ({
  selectedSeed,
  currentMix,
  currentEffects,
  calculateTotalCost,
  drugTypes
}) => {
  const yieldAmount = drugTypes[selectedSeed?.drugType]?.yieldAmount || 1;

  return (
    <DisplayCard className="mb-4">
      <h4 className="font-semibold mb-1">Current Mix</h4>

      <p><strong>Seed:</strong> {selectedSeed?.name || 'None'}</p>
      <p><strong>Ingredients:</strong> {currentMix.map(i => i.name).join(', ') || 'None'}</p>
      
      <div className="mb-2">
        <strong>Effects:</strong>{' '}
        {currentEffects.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {currentEffects.map((effect, index) => (
              <EffectTag key={index}>{effect}</EffectTag>
            ))}
          </div>
        ) : (
          'None'
        )}
      </div>

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
    </DisplayCard>
  );
};

export default CurrentMixDisplay;

