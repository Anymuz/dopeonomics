const PackagingButton = ({ type, cost, capacity, packagingType, setPackagingType }) => {
  const name = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const units = capacity === 1 ? 'unit' : 'units';
  const description = `$${cost} per ${capacity} ${units}`;

  return (
    <button
      key={type}
      className={`flex-1 p-3 rounded-lg border ${
        packagingType === type
          ? 'bg-green-50 border-green-500'
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }`}
      onClick={() => setPackagingType(type)}
    >
      <div className="font-medium text-center">{name}</div>
      <div className="text-sm text-center text-gray-500">{description}</div>
    </button>
  );
};

export default PackagingButton;