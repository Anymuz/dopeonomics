// src/components/Crew/CrewOverviewTab.jsx
import React from 'react';
import { useCrew, useDealers, useDealerTransactions } from '@/hooks';
import { calculateRoleStats, summarizeTransactions } from '@/utils/crewMetrics';

const CrewOverviewTab = () => {
  const { crewMembers } = useCrew();
  const { dealers } = useDealers();
  const { transactions } = useDealerTransactions();

  const {
    totalMembers,
    totalDailyCost,
    efficiencyScore
  } = calculateRoleStats(crewMembers, dealers);

  const { dates, revenue, expenses, profit } = summarizeTransactions(transactions);

  return (
    <div className="p-6 space-y-6">
      <div className="border p-4 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">Gang Gang Efficiency</h2>
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-red-400"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${efficiencyScore}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-xl">
              {efficiencyScore}/100
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-2">
          Your business is running efficiently. Keep up the good work!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500">Active Dealers</div>
          <div className="text-2xl font-bold text-blue-600">{dealers.filter(d => d.active).length} / {dealers.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500">Crew Members</div>
          <div className="text-2xl font-bold text-green-600">{totalMembers}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500">Daily Crew Cost</div>
          <div className="text-2xl font-bold text-red-600">${totalDailyCost}</div>
        </div>
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Business Performance Over Time</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-left border-b">
                <th className="p-2">Date</th>
                <th className="p-2 text-blue-600">Revenue</th>
                <th className="p-2 text-red-500">Expenses</th>
                <th className="p-2 text-green-600">Profit</th>
              </tr>
            </thead>
            <tbody>
              {(dates || []).map((date, i) => (
                <tr key={date} className="border-t">
                  <td className="p-2">{date}</td>
                  <td className="p-2 text-blue-600">${revenue[i]}</td>
                  <td className="p-2 text-red-500">${expenses[i]}</td>
                  <td className="p-2 text-green-600">${profit[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrewOverviewTab;
