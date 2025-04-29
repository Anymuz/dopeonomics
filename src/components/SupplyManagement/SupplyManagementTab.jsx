// src/components/SupplyManagement/SupplyManagementTab.jsx
const SupplyManagementTab = ({ supplies, supplyHistory }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Supply Management</h2>

      <div>
        <h3 className="text-xl font-semibold mb-2">Current Supplies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {supplies.map((supply) => (
            <div
              key={supply.id}
              className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-purple-400 transition-all duration-150"
            >
              <div className="font-semibold">{supply.item}</div>
              <div className="text-sm text-gray-600">Quantity: {supply.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Supply History</h3>
        <div className="flex flex-col space-y-2">
          {supplyHistory.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-purple-300 transition-all duration-150"
            >
              <div className="font-semibold">{entry.item}</div>
              <div className="text-sm text-gray-600">
                +{entry.quantityAdded} on {entry.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplyManagementTab;
