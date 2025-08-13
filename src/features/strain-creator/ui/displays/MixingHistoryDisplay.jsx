// MixingHistoryDisplay - Shows step-by-step mixing history.
// Displays all mixing steps with effects generated at each step in the creation process.

// Importing primitive components for consistent styling.
import { DisplayCard } from '@features/strain-creator/ui/primitives/DisplayCard';
import { EffectTag } from '@features/strain-creator/ui/primitives/EffectTag';

const MixingHistoryDisplay = ({ mixingHistory }) => {
  return (
    <DisplayCard className="shadow">
      <h3 className="font-bold mb-2">Mixing History</h3>
      {mixingHistory.length === 0 ? (
        <p className="text-gray-500">No mixing steps yet.</p>
      ) : (
        mixingHistory.map((effects, index) => (
          <div key={index} className="mb-3">
            <div className="text-sm font-medium text-blue-700">Step {index}:</div>
            <div className="flex gap-2 mt-1 flex-wrap">
              {effects.map((effect, i) => (
                <EffectTag key={i}>{effect}</EffectTag>
              ))}
            </div>
          </div>
        ))
      )}
    </DisplayCard>
  );
};

export default MixingHistoryDisplay;
