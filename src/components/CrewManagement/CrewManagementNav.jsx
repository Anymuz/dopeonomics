// src/components/Crew/CrewOverviewTab.jsx
import React from 'react';
import { Users } from 'lucide-react';

const CrewManagementTab = ({activeTab, renderActiveTab, setActiveTab}) => {
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
          onClick={() => setActiveTab('members')}
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

      {/* Active Tab Content */}
      <div className="bg-white rounded-xl border p-4 shadow">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default CrewManagementTab;
