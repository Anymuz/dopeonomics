// src/components/SharedComponents/SeedSelector/SeedSelector.jsx
const SeedSelector = ({ seeds, selectedSeed, onSelect }) => {
    if (!seeds || seeds.length === 0) {
      return <div className="text-gray-500">No seeds available.</div>;
    }
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {seeds.map((seed) => (
          <button
            key={seed.id}
            onClick={() => onSelect(seed)}
            className={`p-4 rounded-lg border-2 transition-all duration-150
              ${selectedSeed?.id === seed.id ? 'border-blue-600 bg-blue-100' : 'border-gray-300 hover:border-gray-500'}`}
          >
            <div className="font-bold text-lg">{seed.name}</div>
            <div className="text-sm text-gray-600">{seed.type}</div>
          </button>
        ))}
      </div>
    );
  };
  
  export default SeedSelector;
  