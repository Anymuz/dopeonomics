// src/components/Crew/CrewTransactionsTab.jsx
import React from 'react';
import { useCrew } from '@/hooks';
import { format } from 'date-fns';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const CrewTransactionsTab = () => {
  const { crewTransactions } = useCrew();

  const formatAmount = (amount) => {
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Crew Transactions</h3>
      {crewTransactions.length === 0 ? (
        <div className="text-gray-500">No transactions recorded.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {crewTransactions.map((tx, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{format(new Date(tx.date), 'yyyy-MM-dd')}</td>
                  <td className="p-3 capitalize">
                    <div className="flex items-center gap-2">
                      {tx.amount < 0 ? (
                        <ArrowDownCircle className="text-red-500" size={16} />
                      ) : (
                        <ArrowUpCircle className="text-green-500" size={16} />
                      )}
                      {tx.type}
                    </div>
                  </td>
                  <td className="p-3">{tx.description}</td>
                  <td className="p-3 text-right font-mono">
                    <span
                      className={`${
                        tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {formatAmount(tx.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CrewTransactionsTab;
