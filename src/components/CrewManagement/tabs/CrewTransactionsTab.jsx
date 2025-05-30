// src/components/CrewManagement/tabs/CrewTransactionsTab.jsx
import { AlertTriangle } from 'lucide-react';

const CrewTransactionsTab = ({dailySales, transactions}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Dealer Transactions</h3>
        
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dealer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Collected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tx.dealerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.productType === 'weed' ? '🌿 Weed' : 
                      tx.productType === 'meth' ? '💎 Meth' : 
                      '❄️ Cocaine'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.inventorySupplied} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      ${tx.cashCollected.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      ${tx.profit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No dealer transactions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Record some dealer transactions to see them here.
            </p>
          </div>
        )}
      </div>

      {/* Personal Sales History */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Sales History</h3>
        
        {dailySales.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dailySales.map(sale => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.productType === 'weed' ? '🌿 Weed' : 
                      sale.productType === 'meth' ? '💎 Meth' : 
                      '❄️ Cocaine'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.units || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      ${sale.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      ${(sale.expenses || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      ${sale.profit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No personal sales</h3>
            <p className="mt-1 text-sm text-gray-500">
              Record your personal sales to see them here.
            </p>
          </div>
        )}
      </div>
      
      {/* Summary Statistics */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Dealer Sales */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Dealer Sales</h4>
            <p className="text-xl font-bold text-blue-700">
              ${transactions.reduce((sum, tx) => sum + tx.cashCollected, 0).toFixed(2)}
            </p>
            <p className="text-xs text-blue-500">
              {transactions.length} transactions
            </p>
          </div>
          
          {/* Total Personal Sales */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-800 mb-1">Personal Sales</h4>
            <p className="text-xl font-bold text-green-700">
              ${dailySales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)}
            </p>
            <p className="text-xs text-green-500">
              {dailySales.length} sales
            </p>
          </div>
          
          {/* Total Profit */}
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <h4 className="text-sm font-medium text-purple-800 mb-1">Total Profit</h4>
            <p className="text-xl font-bold text-purple-700">
              ${(transactions.reduce((sum, tx) => sum + tx.profit, 0) + dailySales.reduce((sum, sale) => sum + sale.profit, 0)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CrewTransactionsTab;
