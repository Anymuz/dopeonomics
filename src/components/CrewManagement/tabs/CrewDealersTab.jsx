// src/components/CrewManagement/tabs/CrewDealersTab.jsx
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDealers, useDealerTransactions } from '@/hooks';
import DealerTransactionForm from '@components/SharedComponents/Forms/DealerTransactionForm.jsx'
//import { format } from 'date-fns';

const CrewDealersTab = ({addTransaction, dealers, toggleDealerStatus}) => {
  // const { dealers, setDealers } = useDealers();
  // const { transactions, addDealerTransaction } = useDealerTransactions();
  
  // // Function to add a dealer transaction
  // const addTransaction = (transaction) => {
  //   addDealerTransaction(transaction);
  // };

  // const toggleDealerStatus = (id) => {
  //   setDealers(
  //     dealers.map(dealer => 
  //       dealer.id === id ? { ...dealer, active: !dealer.active } : dealer
  //     )
  //   );
  // };

  return (
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
          addTransaction={addTransaction} 
        />
      )}
    </div>
  );
};
export default CrewDealersTab;
