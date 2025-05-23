// src/components/StrainCreator/MixDisplay/MixingHistoryDisplay.jsx
const MixingHistoryDisplay = ({ mixingHistory }) => {
  return (
    <div className="rounded border p-4 bg-white shadow">
      <h3 className="font-bold mb-2">Mixing History</h3>
      {mixingHistory.length === 0 ? (
        <p className="text-gray-500">No mixing steps yet.</p>
      ) : (
        mixingHistory.map((effects, index) => (
          <div key={index} className="mb-3">
            <div className="text-sm font-medium text-blue-700">Step {index}:</div>
            <div className="flex gap-2 mt-1 flex-wrap">
              {effects.map((effect, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {effect}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MixingHistoryDisplay;
