import React, { useState, /* useEffect */} from 'react';
import { Check } from 'lucide-react';

const DealerTransactionForm = ({ dealers, addTransaction }) => {
  const [selectedDealer, setSelectedDealer] = useState('');
  const [productType, setProductType] = useState('weed');
  const [inventorySupplied, setInventorySupplied] = useState('');
  const [cashCollected, setCashCollected] = useState('');
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  //const { transaction, addDealerTransaction } = useDealerTransactions();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDealer || !inventorySupplied || !cashCollected) return;

    const dealer = dealers.find(d => d.id === parseInt(selectedDealer));
    if (!dealer) return;

    const newTransaction = {
      id: Date.now(),
      dealerId: parseInt(selectedDealer),
      dealerName: dealer.name,
      productType,
      inventorySupplied: parseInt(inventorySupplied),
      cashCollected: parseFloat(cashCollected),
      profit: parseFloat(cashCollected) - (dealer.cut / 100 * parseFloat(cashCollected)),
      date: transactionDate
    };

    addTransaction(newTransaction);
    
    // Reset form
    setInventorySupplied('');
    setCashCollected('');
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
      <h3 className="font-medium text-lg mb-4">Record Dealer Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Dealer
            </label>
            <select
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a dealer</option>
              {dealers.filter(d => d.active).map(dealer => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.name} - {dealer.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="weed">Weed 🌿</option>
              <option value="meth">Meth 💎</option>
              <option value="cocaine">Cocaine ❄️</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inventory Supplied (units)
            </label>
            <input
              type="number"
              min="1"
              value={inventorySupplied}
              onChange={(e) => setInventorySupplied(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cash Collected ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cashCollected}
              onChange={(e) => setCashCollected(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Check className="w-4 h-4 mr-1 inline-block" />
            Record Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealerTransactionForm;