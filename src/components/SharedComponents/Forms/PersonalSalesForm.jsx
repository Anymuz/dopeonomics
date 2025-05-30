import React, { useState, /* useEffect */} from 'react';
import { Check } from 'lucide-react';

const PersonalSalesForm = ({ addPersonalSale }) => {
  const [saleAmount, setSaleAmount] = useState('');
  const [expenses, setExpenses] = useState('');
  const [productType, setProductType] = useState('weed');
  const [unitsCount, setUnitsCount] = useState('');
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!saleAmount) return;

    const expensesValue = expenses ? parseFloat(expenses) : 0;
    const unitsValue = unitsCount ? parseInt(unitsCount) : 0;

    const newSale = {
      id: Date.now(),
      amount: parseFloat(saleAmount),
      expenses: expensesValue,
      profit: parseFloat(saleAmount) - expensesValue,
      type: 'personal',
      productType,
      units: unitsValue,
      date: saleDate
    };

    addPersonalSale(newSale);
    
    // Reset form
    setSaleAmount('');
    setExpenses('');
    setUnitsCount('');
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-6">
      <h3 className="font-medium text-lg mb-4">Record Personal Sales</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={saleAmount}
              onChange={(e) => setSaleAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expenses ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
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
              Units Sold
            </label>
            <input
              type="number"
              min="0"
              value={unitsCount}
              onChange={(e) => setUnitsCount(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Date
            </label>
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Check className="w-4 h-4 mr-1 inline-block" />
            Record Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalSalesForm;