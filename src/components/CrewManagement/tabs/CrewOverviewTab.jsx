// src/components/CrewManagement/tabs/CrewOverviewTab.jsx
import { getEfficiencyData, calculateDailyCost, calculateEfficiencyScore } from '@/utils/crewMetrics';
import { startCrew } from '@data/crewData'
import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from 'recharts';

const CrewOverviewTab = ({ crew, dailySales, dealers, transactions }) => {
  const safeCrew = crew && typeof crew === 'object' ? { ...startCrew, ...crew } : { ...startCrew };
  return (
    <div className="space-y-6">
      {/* Efficiency Score */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Gang Gang Efficiency</h3>
        <div className="relative h-32 w-32 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-red-600">{calculateEfficiencyScore(dealers, transactions, dailySales, safeCrew)}</span>
            <span className="text-lg text-gray-500">/100</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={[
                  { name: 'Score', value: calculateEfficiencyScore(dealers, transactions, dailySales, safeCrew) },
                  { name: 'Remaining', value: 100 - calculateEfficiencyScore(dealers, transactions, dailySales, safeCrew) }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
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
          {calculateEfficiencyScore(dealers, transactions, dailySales, safeCrew) < 30 ? "Your business is struggling. Focus on increasing revenue or cutting costs." :
            calculateEfficiencyScore(dealers, transactions, dailySales, safeCrew) < 60 ? "Your business is doing okay, but there's room for improvement." :
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
            {crew ? Object.values(crew).reduce((sum, count) => sum + count, 0) : 0}
          </p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-red-800 mb-2">Daily Crew Cost</h3>
          <p className="text-2xl font-bold text-red-700">${crew ? calculateDailyCost(safeCrew) : 0}</p>
        </div>
      </div>

      {/* Efficiency Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Business Performance Over Time</h3>
        
        {getEfficiencyData(transactions, dailySales).length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getEfficiencyData(transactions, dailySales, safeCrew)}
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
  );
};
export default CrewOverviewTab;