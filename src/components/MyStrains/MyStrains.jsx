// src/components/MyStrains/MyStrains.jsx
const MyStrains = ({ strains }) => {
    if (!strains.length) {
      return <div className="text-gray-500">No strains available.</div>;
    }
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">My Strains</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {strains.map((strain) => (
            <div
              key={strain.id}
              className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-green-400 transition-all duration-150"
            >
              <div className="font-semibold text-lg">{strain.name}</div>
              <div className="text-sm text-gray-500">Potency: {strain.potency}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MyStrains;