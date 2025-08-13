// SeedButton component for seed selection
// Displays seed with emoji, name, cost, effect, and description. In this case seed is interchangeable with precursor.

const SeedButton = ({ seed, selectedSeed, setSelectedSeed, selectedDrugType, drugTypes }) => {
  return (
    <button
      key={seed.name}
      className={`flex items-center justify-start gap-3 p-3 rounded-lg text-left transition-all duration-200
        bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:shadow-sm
        ${selectedSeed?.name === seed.name ? 'bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-500 shadow-md' : ''}`}
      onClick={() => setSelectedSeed(seed)}
    >
      {/* Emoji icon based on the drugType selected. */}
      <span className="text-2xl">{drugTypes[selectedDrugType]?.emoji || '🌱'}</span>
      
      {/* Seed details including name, cost, effect, and precursor/seed description */}
      <div>
        <div className="font-medium">{seed.name}</div>
        <div className="text-sm text-gray-500">${seed.cost} - {seed.effect}</div>
        <div className="text-xs text-gray-500 mt-1">{drugTypes[selectedDrugType]?.description}</div>
      </div>
    </button>
  );
};

export default SeedButton;
