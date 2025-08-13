// DrugTypeButton - Button component for drug type selection in the strain creator.
// Displays drug type with emoji, name, and pricing information with selection state styling.

// Button component for drug type selection with visual feedback for active state.
const DrugTypeButton = ({ drugKey, drug, selectedDrugType, setSelectedDrugType }) => {
  return (
    <button
      key={drugKey}
      className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
        ${selectedDrugType === drugKey
          ? 'bg-blue-50 border-blue-500 shadow-md' 
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
      onClick={() => setSelectedDrugType(drugKey)}
    >
      {/* Drug type name, emoji and price per unit */}
      <span className="text-3xl">{drug.emoji}</span>
      <div className="font-medium text-center">{drug.name}</div>
      <div className="text-xs text-gray-500 text-center">${drug.basePrice} per {drug.unit}</div>
    </button>
  );
};

export default DrugTypeButton;
