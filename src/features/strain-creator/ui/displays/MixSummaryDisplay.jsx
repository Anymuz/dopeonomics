// MixSummaryDisplay - Final summary of completed strain creation.
// Shows the complete strain recipe including base seed, ingredients, effects, and total cost.

// Importing primitive components for consistent styling.
import { DisplayCard } from '@features/strain-creator/ui/primitives/DisplayCard';
import { EffectTag } from '@features/strain-creator/ui/primitives/EffectTag';

const MixSummaryDisplay = ({ selectedSeed, currentMix, currentEffects, getTotalCost }) => {
  if (!selectedSeed) return null;

  return (
    <DisplayCard className="shadow mt-6">
      <h3 className="font-bold mb-2">Mix Summary</h3>
      <p className="mb-2">
        <strong className="text-purple-700">Base Seed:</strong>{' '}
        {selectedSeed.name} <span className="text-sm text-gray-500">({selectedSeed.effect})</span>
      </p>

      <div className="mb-4">
        <p className="font-semibold">Ingredient Sequence:</p>
        <ul className="list-disc list-inside text-sm mt-1 ml-2">
          {currentMix.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} <span className="text-gray-500">({ingredient.defaultEffect})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Final Effects:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {currentEffects.map((effect, index) => (
            <EffectTag key={index}>{effect}</EffectTag>
          ))}
        </div>
      </div>

      <p>
        <strong>Cost per Unit:</strong> ${getTotalCost()}
      </p>
    </DisplayCard>
  );
};

export default MixSummaryDisplay;
