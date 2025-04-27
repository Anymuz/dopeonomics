// CrewManagementTab.js
import React, { useState, useEffect } from 'react';
import {
  Users,
  Check,
  AlertTriangle,
  Plus,
  Minus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from 'recharts';

// Dealer data structure
const defaultDealers = [
  { id: 1, name: 'Benji Coleman', location: 'Motel Room 2', buyin: 500, cut: 20, maxCustomers: 8, active: false },
  { id: 2, name: 'Molly Presley', location: 'Brown Apartment', buyin: 1000, cut: 20, maxCustomers: 8, active: false },
  { id: 3, name: 'Brad Crosby', location: 'Parking Garage', buyin: 2000, cut: 20, maxCustomers: 8, active: false },
  { id: 4, name: 'Jane Lucero', location: 'Docks RV', buyin: 3000, cut: 20, maxCustomers: 8, active: false },
  { id: 5, name: 'Wei Long', location: 'Suburbia Shack', buyin: 4000, cut: 20, maxCustomers: 8, active: false },
  { id: 6, name: 'Leo Rivers', location: 'Near Church', buyin: 5000, cut: 20, maxCustomers: 8, active: false }
];

// Crew cost data
const crewCosts = {
  botanist: { initial: 1500, daily: 200 },
  cleaner: { initial: 1200, daily: 100 },
  handler: { initial: 1500, daily: 200 },
  chemist: { initial: 1800, daily: 300 }
};

// Dealer Transaction Form
const DealerTransactionForm = ({ dealers, addTransaction }) => {
  const [selectedDealer, setSelectedDealer] = useState('');
  const [productType, setProductType] = useState('weed');
  const [inventorySupplied, setInventorySupplied] = useState('');
  const [cashCollected, setCashCollected] = useState('');
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  );

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

// Personal Sales Form
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

// Crew Management Component
/* eslint-disable no-unused-vars */
const CrewManagementTab = ({ 
  dealers: existingDealers,
  setDealers,
  crewMembers,
  setCrewMembers,
  dealerTransactions,
  setDealerTransactions,
  dailySales,
  setDailySales,
  drugTypes
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dealers, setLocalDealers] = useState(existingDealers.length > 0 ? existingDealers : defaultDealers);
  
  // Update parent state when local dealers change
  useEffect(() => {
    setDealers(dealers);
  }, [dealers, setDealers]);

  // Helper function to calculate total daily crew cost
  const calculateDailyCost = () => {
    return (
      crewMembers.botanist * crewCosts.botanist.daily +
      crewMembers.cleaner * crewCosts.cleaner.daily +
      crewMembers.handler * crewCosts.handler.daily +
      crewMembers.chemist * crewCosts.chemist.daily
    );
  };

  // Function to add a dealer transaction
  const addDealerTransaction = (transaction) => {
    setDealerTransactions([...dealerTransactions, transaction]);
  };

  // Function to add personal sale
  const addPersonalSale = (sale) => {
    setDailySales([...dailySales, sale]);
  };

  // Function to toggle dealer active status
  const toggleDealerStatus = (id) => {
    setLocalDealers(
      dealers.map(dealer => 
        dealer.id === id ? { ...dealer, active: !dealer.active } : dealer
      )
    );
  };

  // Function to adjust crew count
  const adjustCrewCount = (type, increment) => {
    setCrewMembers({
      ...crewMembers,
      [type]: Math.max(0, crewMembers[type] + increment)
    });
  };

  // Prepare data for efficiency chart
  const getEfficiencyData = () => {
    // Group transactions by date
    const byDate = {};
    
    // Process dealer transactions
    dealerTransactions.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString();
      if (!byDate[date]) {
        byDate[date] = { date, revenue: 0, expenses: calculateDailyCost(), profit: 0 };
      }
      byDate[date].revenue += tx.cashCollected;
      byDate[date].profit = byDate[date].revenue - byDate[date].expenses;
    });
    
    // Process personal sales
    if (dailySales) {
      dailySales.forEach(sale => {
        const date = new Date(sale.date).toLocaleDateString();
        if (!byDate[date]) {
          byDate[date] = { date, revenue: 0, expenses: calculateDailyCost(), profit: 0 };
        }
        byDate[date].revenue += sale.amount;
        byDate[date].expenses += sale.expenses;
        byDate[date].profit = byDate[date].revenue - byDate[date].expenses;
      });
    }
    
    // Convert to array and sort by date
    return Object.values(byDate).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Calculate overall efficiency score (0-100) - higher is better
  const calculateEfficiencyScore = () => {
    if(!dailySales) return 0;

    if (dealerTransactions.length === 0 && dailySales.length === 0) return 0;
    
    const totalRevenue = [...dealerTransactions, ...dailySales].reduce((sum, tx) => 
      sum + (tx.cashCollected || tx.amount || 0), 0);
      
    const totalExpenses = calculateDailyCost() * 30 + // Monthly crew cost
      dailySales.reduce((sum, sale) => sum + (sale.expenses || 0), 0) +
      dealers.filter(d => d.active).reduce((sum, d) => sum + d.buyin, 0) / 30; // Amortized dealer buy-in
      
    if (totalRevenue === 0) return 0;
    
    // Calculate ROI as a percentage, max out at 100%
    const roi = Math.min(((totalRevenue - totalExpenses) / totalExpenses) * 100, 100);
    return Math.max(0, Math.round(roi));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Users className="mr-2 w-6 h-6 text-red-500" />
        Crew Management
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'overview'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'dealers'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('dealers')}
        >
          Dealers
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'crew'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('crew')}
        >
          Crew Members
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'transactions'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Efficiency Score */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Gang Gang Efficiency</h3>
            <div className="relative h-32 w-32 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-red-600">{calculateEfficiencyScore()}</span>
                <span className="text-lg text-gray-500">/100</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={[
                      { name: 'Score', value: calculateEfficiencyScore() },
                      { name: 'Remaining', value: 100 - calculateEfficiencyScore() }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#EF4444" />
                    <Cell fill="#F3F4F6" />
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {calculateEfficiencyScore() < 30 ? "Your business is struggling. Focus on increasing revenue or cutting costs." :
               calculateEfficiencyScore() < 60 ? "Your business is doing okay, but there's room for improvement." :
               "Your business is running efficiently. Keep up the good work!"}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Active Dealers</h3>
              <p className="text-2xl font-bold text-blue-700">
                {dealers.filter(d => d.active).length} / {dealers.length}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-sm font-medium text-green-800 mb-2">Crew Members</h3>
              <p className="text-2xl font-bold text-green-700">
                {Object.values(crewMembers).reduce((sum, count) => sum + count, 0)}
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="text-sm font-medium text-red-800 mb-2">Daily Crew Cost</h3>
              <p className="text-2xl font-bold text-red-700">${calculateDailyCost()}</p>
            </div>
          </div>

          {/* Efficiency Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Business Performance Over Time</h3>
            
            {getEfficiencyData() ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getEfficiencyData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center p-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Record some transactions to see your business performance over time.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'dealers' && (
        <div className="space-y-6">
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy-In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Customers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dealers.map(dealer => (
                  <tr key={dealer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dealer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dealer.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${dealer.buyin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dealer.cut}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dealer.maxCustomers}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        dealer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {dealer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleDealerStatus(dealer.id)}
                        className={`mr-2 ${
                          dealer.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {dealer.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {dealers.filter(d => d.active).length > 0 && (
            <DealerTransactionForm 
              dealers={dealers} 
              addTransaction={addDealerTransaction} 
            />
          )}
        </div>
      )}

      {activeTab === 'crew' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(crewCosts).map(([type, costs]) => (
              <div key={type} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800 capitalize">{type}s</h3>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => adjustCrewCount(type, -1)}
                      className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      disabled={crewMembers[type] <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{crewMembers[type]}</span>
                    <button
                      onClick={() => adjustCrewCount(type, 1)}
                      className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Initial Hiring Cost:</span>
                    <span className="font-medium">${costs.initial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Cost:</span>
                    <span className="font-medium">${costs.daily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Daily Total:</span>
                    <span className="font-medium">${costs.daily * crewMembers[type]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Crew Cost Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total Crew Members:</span>
                <span className="font-medium">
                  {Object.values(crewMembers).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Daily Crew Cost:</span>
                <span className="font-medium text-red-600">${calculateDailyCost()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Weekly Crew Cost:</span>
                <span className="font-medium text-red-600">${calculateDailyCost() * 7}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Crew Cost:</span>
                <span className="font-medium text-red-600">${calculateDailyCost() * 30}</span>
              </div>
            </div>
          </div>

          <PersonalSalesForm addPersonalSale={addPersonalSale} />
        </div>
      )}

{activeTab === 'transactions' && (
  <div className="space-y-6">
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Dealer Transactions</h3>
      
      {dealerTransactions ? (
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
              {dealerTransactions.map(tx => (
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
      
      {dailySales ? (
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
            ${dealerTransactions.reduce((sum, tx) => sum + tx.cashCollected, 0).toFixed(2)}
          </p>
          <p className="text-xs text-blue-500">
            {dealerTransactions.length} transactions
          </p>
        </div>
        
        {/* Total Personal Sales */}
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <h4 className="text-sm font-medium text-green-800 mb-1">Personal Sales</h4>
          <p className="text-xl font-bold text-green-700">
            ${ dailySales ? (dailySales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)): 0 }
          </p>
          <p className="text-xs text-green-500">
            {dailySales ? dailySales.length : 0 } sales
          </p>
        </div>
        
        {/* Total Profit */}
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
          <h4 className="text-sm font-medium text-purple-800 mb-1">Total Profit</h4>
          <p className="text-xl font-bold text-purple-700">
            ${( dealerTransactions ? (dealerTransactions.reduce((sum, tx) => sum + tx.profit, 0)) : 0 
              + 
              dailySales ? (dailySales.reduce((sum, sale) => sum + sale.profit, 0)) : 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  </div>
)}
</div>
  );
};

export default CrewManagementTab;