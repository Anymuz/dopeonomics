// SalesHistoryTab.js
import React, { useState } from 'react';
import {
  BarChart,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Filter,
  Copy,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

// Quantity Modal Component
const QuantityModal = ({ isOpen, onClose, onConfirm, initialQuantity = 12 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Set Production Quantity</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How many units would you like to produce?
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(quantity)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Sales History Tab Component
const SalesHistoryTab = ({ salesHistory, reproduceProductionPlan, drugTypes }) => {
  // New state for tracking which sale we want to reproduce
  const [saleToReproduce, setSaleToReproduce] = useState(null);
  // Sales filtering
  const [drugTypeFilter, setDrugTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all'); // 'all', 'week', 'month'
  
  // Apply drug type filter
  const filteredSalesHistory = drugTypeFilter === 'all' 
    ? salesHistory 
    : salesHistory.filter(sale => sale.drugType === drugTypeFilter);
  
  // Get drug type emoji
  const getDrugTypeEmoji = (drugType) => {
    return drugTypes[drugType]?.emoji || '🌿';
  };
  
  // Prepare data for chart
  const getTopStrains = () => {
    if (!filteredSalesHistory || filteredSalesHistory.length === 0) return [];
    
    // Group sales by strain
    const salesByStrain = filteredSalesHistory.reduce((acc, sale) => {
      const key = sale.strainName;
      if (!acc[key]) {
        acc[key] = {
          name: key,
          totalProfit: 0,
          totalSales: 0,
          totalRevenue: 0,
          strainId: sale.strainId,
          productionId: sale.productionId,
          drugType: sale.drugType
        };
      }
      
      acc[key].totalProfit += sale.profit;
      acc[key].totalSales += sale.quantitySold;
      acc[key].totalRevenue += sale.totalRevenue;
      
      return acc;
    }, {});
    
    // Convert to array and sort by profit
    return Object.values(salesByStrain)
      .sort((a, b) => b.totalProfit - a.totalProfit)
      .slice(0, 10)
      .map((item, index) => ({
        ...item,
        color: getColorForIndex(index)
      }));
  };
  
  // Get daily sales data for trend analysis
  const getDailySalesData = () => {
    if (!filteredSalesHistory || filteredSalesHistory.length === 0) return [];
    
    // Group sales by date
    const salesByDate = filteredSalesHistory.reduce((acc, sale) => {
      const date = new Date(sale.dateSold).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          revenue: 0,
          profit: 0,
          units: 0
        };
      }
      
      acc[date].revenue += sale.totalRevenue;
      acc[date].profit += sale.profit;
      acc[date].units += sale.quantitySold;
      
      return acc;
    }, {});
    
    // Convert to array and sort by date
    return Object.values(salesByDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  // Get a color from a predefined list based on index
  const getColorForIndex = (index) => {
    const colors = [
      '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
      '#d0ed57', '#ffc658', '#ff8042', '#ff5252', '#e74c3c'
    ];
    return colors[index % colors.length];
  };
  
  const topStrains = getTopStrains();
  const dailySalesData = getDailySalesData();
  
  // Calculate total statistics
  const totalStats = filteredSalesHistory.reduce((stats, sale) => {
    stats.revenue += sale.totalRevenue;
    stats.profit += sale.profit;
    stats.quantitySold += sale.quantitySold;
    return stats;
  }, { revenue: 0, profit: 0, quantitySold: 0 });

  // Handle reproduce from sales history
  const handleReproduceFromSale = (sale) => {
    setSaleToReproduce(sale);
  };

  const confirmReproduce = (quantity) => {
    // Find the original production plan info from the sale record
    const originalPlan = {
      strainId: saleToReproduce.strainId,
      strainName: saleToReproduce.strainName,
      drugType: saleToReproduce.drugType
      // The reproduceProductionPlan function will need to fill in other details
    };
    
    reproduceProductionPlan(originalPlan, quantity);
    setSaleToReproduce(null);
  };

  // Add this section to render the drug type filters
  const DrugTypeFilters = () => (
    <div className="flex mb-4 gap-2 overflow-x-auto pb-2">
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          drugTypeFilter === 'all' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setDrugTypeFilter('all')}
      >
        All Types
      </button>
      {Object.entries(drugTypes).map(([key, value]) => (
        <button
          key={key}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            drugTypeFilter === key 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setDrugTypeFilter(key)}
        >
          <span className="mr-1">{value.emoji}</span> {value.name}
        </button>
      ))}
    </div>
  );

  const DateRangeFilters = () => (
    <div className="flex mb-4 gap-2 overflow-x-auto pb-2">
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          dateRangeFilter === 'all' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setDateRangeFilter('all')}
      >
        All Time
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          dateRangeFilter === 'week' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setDateRangeFilter('week')}
      >
        <Calendar className="inline-block mr-1 w-4 h-4" />
        This Week
      </button>
      <button 
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          dateRangeFilter === 'month' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setDateRangeFilter('month')}
      >
        <Calendar className="inline-block mr-1 w-4 h-4" />
        This Month
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <ShoppingCart className="mr-2 w-6 h-6 text-purple-500" />
        Sales History
      </h2>

      {salesHistory.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <BarChart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No sales history</h3>
          <p className="mt-1 text-sm text-gray-500">
            Mark production plans as sold to track your sales.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
            <h3 className="text-md font-medium text-gray-700 flex items-center">
              <Filter className="mr-2 w-4 h-4" />
              Filter Sales Data
            </h3>
            
            {/* Drug Type Filters */}
            <DrugTypeFilters />
            
            {/* Date Range Filters */}
            <DateRangeFilters />
          </div>
          
          {/* Sales Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-sm font-medium text-green-800 mb-1">Total Sales</h3>
              <p className="text-2xl font-bold text-green-700">{totalStats.quantitySold} units</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Total Revenue</h3>
              <p className="text-2xl font-bold text-blue-700">${totalStats.revenue.toFixed(2)}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="text-sm font-medium text-purple-800 mb-1">Total Profit</h3>
              <p className="text-2xl font-bold text-purple-700">${totalStats.profit.toFixed(2)}</p>
            </div>
          </div>
          
          {/* Daily Sales Trend Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              <TrendingUp className="inline-block mr-1 w-5 h-5 text-blue-500" />
              Daily Sales Trend
            </h3>
            
            {dailySalesData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailySalesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="units" name="Units Sold" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">Not enough data to generate chart</p>
            )}
          </div>
          
          {/* Top Strains Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Top 10 Most Profitable Strains
              {drugTypeFilter !== 'all' && (
                <span className="ml-2 text-sm text-gray-500">
                  ({drugTypes[drugTypeFilter]?.emoji} {drugTypes[drugTypeFilter]?.name} only)
                </span>
              )}
            </h3>
            
            {topStrains.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={topStrains}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => ['$' + value.toFixed(2), 'Profit']}
                      labelFormatter={(value) => `Strain: ${value}`}
                    />
                    <Legend />
                    <Bar dataKey="totalProfit" name="Total Profit">
                      {topStrains.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">Not enough data to generate chart</p>
            )}
          </div>
          
          {/* Sales History Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <h3 className="text-lg font-medium p-4 bg-gray-50 border-b border-gray-200">
              Sales History
              {drugTypeFilter !== 'all' && (
                <span className="ml-2 text-sm text-gray-500">
                  ({drugTypes[drugTypeFilter]?.emoji} {drugTypes[drugTypeFilter]?.name} only)
                </span>
              )}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Strain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSalesHistory.map(sale => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xl" title={drugTypes[sale.drugType]?.name || 'Weed'}>
                          {getDrugTypeEmoji(sale.drugType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sale.dateSold).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {sale.strainName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.quantitySold} {drugTypes[sale.drugType]?.unit || 'units'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        ${sale.totalRevenue.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        ${sale.profit.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleReproduceFromSale(sale)}
                          className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded"
                          title="Produce this strain again"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Modal for Sales History Reproduction */}
      {saleToReproduce && (
        <QuantityModal
          isOpen={saleToReproduce !== null}
          onClose={() => setSaleToReproduce(null)}
          onConfirm={confirmReproduce}
          initialQuantity={saleToReproduce.quantitySold}
        />
      )}
    </div>
  );
};

export default SalesHistoryTab;