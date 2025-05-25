// src/components/Crew/DealersTab.jsx
import React from 'react';
import { useDealers } from '@/hooks';

const DealersTab = () => {
  const { dealers, toggleDealerStatus } = useDealers();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dealers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-right">Buy-In</th>
              <th className="p-3 text-right">Cut</th>
              <th className="p-3 text-right">Max Customers</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map((dealer) => (
              <tr key={dealer.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{dealer.name}</td>
                <td className="p-3">{dealer.location}</td>
                <td className="p-3 text-right">${dealer.buyIn}</td>
                <td className="p-3 text-right">{dealer.cut}%</td>
                <td className="p-3 text-right">{dealer.maxCustomers}</td>
                <td className="p-3 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      dealer.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {dealer.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => toggleDealerStatus(dealer.id)}
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    {dealer.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {dealers.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No dealers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealersTab;
