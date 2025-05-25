// src/components/CrewManagement/tabs/CrewOverviewTab.jsx
import React from "react";
import { useCrew } from "@/hooks";
import { summarizeTransactions } from "@/utils/crewMetrics";

const CrewOverviewTab = () => {
  const { crew } = useCrew();

  if (!crew || crew.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No crew data available.
      </div>
    );
  }

  const summary = summarizeTransactions(crew);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Crew Overview</h2>
      <table className="min-w-full text-sm border rounded">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Total Earned</th>
            <th className="p-2">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((member, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 font-medium">{member.name}</td>
              <td className="p-2">{member.role}</td>
              <td className="p-2 text-green-700">${member.totalEarned.toFixed(2)}</td>
              <td className="p-2">{member.transactionCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewOverviewTab;
