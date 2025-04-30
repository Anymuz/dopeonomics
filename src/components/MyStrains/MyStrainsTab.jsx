// src/components/MyStrains/MyStrainsTab.jsx
const MyStrainsTab = ({ strains }) => {
  if (!strains.length) {
    return <div className="text-gray-500">No custom strains created yet.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Custom Strains</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strains.map((strain) => (
          <div
            key={strain.id}
            className="p-4 border rounded-md bg-white shadow hover:border-green-500"
          >
            <div className="font-bold text-lg">{strain.name}</div>
            <div className="text-sm text-gray-600 mb-2">Quality: {strain.quality}</div>
            <div className="text-sm">
              Effects: {
                Array.isArray(strain.effects) && strain.effects.length > 0
                  ? strain.effects.join(', ')
                  : 'None'
              }
            </div>
            <div className="text-green-700 font-semibold mt-2">
              Price: ${typeof strain.price === 'number' ? strain.price : 'Uncalculated'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStrainsTab;
