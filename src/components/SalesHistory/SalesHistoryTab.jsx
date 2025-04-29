// src/components/SalesHistory/SalesHistoryTab.jsx
const SalesHistoryTab = ({ salesHistory }) => {
  if (!salesHistory.length) {
    return <div className="text-gray-500">No sales history available.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Sales History</h2>
      <div className="flex flex-col space-y-2">
        {salesHistory.map((sale) => (
          <div
            key={sale.id}
            className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-blue-400 transition-all duration-150"
          >
            <div className="font-semibold">{sale.dealer}</div>
            <div className="text-sm text-gray-600">
              ${sale.amount} - {sale.date}
            </div>
            <div className="text-sm text-green-700 font-medium">
              Profit: ${sale.profit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistoryTab;
