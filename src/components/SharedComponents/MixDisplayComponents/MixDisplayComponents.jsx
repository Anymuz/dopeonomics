// src/components/SharedComponents/MixDisplayComponents/MixDisplayComponents.jsx
const MixDisplayComponents = ({ mixes }) => {
  if (!mixes || mixes.length === 0) {
    return <div className="text-gray-500">No mixes available.</div>;
  }

  return (
    <div className="space-y-4">
      {mixes.map((mix) => (
        <div
          key={mix.id}
          className="p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <div className="font-bold text-lg">{mix.name}</div>
          <div className="text-sm text-gray-600">{mix.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MixDisplayComponents;
