// src/components/Crew/CrewMembersTab.jsx
import React from 'react';
import { useCrew } from '@/hooks';

const CrewMembersTab = () => {
  const {
    crewTypes,
    crewCounts,
    hireMember,
    fireMember,
    calculateDailyCost,
    calculateTotalCrewCount,
    calculateWeeklyCost,
    calculateMonthlyCost
  } = useCrew();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crewTypes.map((type) => {
          const count = crewCounts[type.id] || 0;
          const totalDaily = count * type.dailyCost;

          return (
            <div key={type.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{type.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => fireMember(type.id)}
                    className="bg-red-100 text-red-700 px-2 rounded hover:bg-red-200"
                  >
                    −
                  </button>
                  <span className="px-2">{count}</span>
                  <button
                    onClick={() => hireMember(type.id)}
                    className="bg-green-100 text-green-700 px-2 rounded hover:bg-green-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Initial Hiring Cost: ${type.initialCost}</li>
                <li>Daily Cost: ${type.dailyCost}</li>
                <li className="font-medium">
                  Current Daily Total: ${totalDaily}
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Crew Cost Summary</h3>
        <ul className="text-sm text-gray-800 space-y-1">
          <li>
            <strong>Total Crew Members:</strong> {calculateTotalCrewCount()}
          </li>
          <li className="text-red-600">
            <strong>Daily Crew Cost:</strong> ${calculateDailyCost()}
          </li>
          <li className="text-red-600">
            <strong>Weekly Crew Cost:</strong> ${calculateWeeklyCost()}
          </li>
          <li className="text-red-600">
            <strong>Monthly Crew Cost:</strong> ${calculateMonthlyCost()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CrewMembersTab;
