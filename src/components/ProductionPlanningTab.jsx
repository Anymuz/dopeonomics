// Enhanced Production Planning Tab Component
import React, { useState } from 'react';
import {
  Factory,
  AlertTriangle,
} from 'lucide-react';

// Import our enhanced card component
import ProductionPlanCard from './ProductionPlanCard.jsx'; 

// Production Planning Tab Component
const ProductionPlanningTab = ({ 
  strains, 
  productionPlans, 
  updateProductionPlan, 
  markAsSold, 
  removeProductionPlan,
  reproduceProductionPlan,
  drugTypes,
  dealers = [],
  dailySales = [],
  setDailySales,
  dealerTransactions = [],
  setDealerTransactions,
  effectColors
}) => {
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('active'); // Default to 'active' instead of 'all'

  const toggleExpandPlan = (id) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  // Filter production plans based on status or other criteria
  const getFilteredPlans = () => {
    if (activeFilter === 'sold') {
      return productionPlans.filter(plan => plan.status === 'sold');
    }
    if (activeFilter === 'active') {
      return productionPlans.filter(plan => plan.status !== 'sold');
    }
    return productionPlans;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Factory className="mr-2 w-6 h-6 text-indigo-500" />
        Production Planning
      </h2>

      {/* Filter controls */}
      <div className="flex mb-6 space-x-2">
        <button
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            activeFilter === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          All Plans
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            activeFilter === 'active' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('active')}
        >
          Active Plans
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            activeFilter === 'sold' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('sold')}
        >
          Completed Plans
        </button>
      </div>

      {productionPlans.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <Factory className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No production plans</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add strains to production from the Strain Creator tab.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {getFilteredPlans().length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <AlertTriangle className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No plans match your filter</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your filter selection above.
              </p>
            </div>
          ) : (
            getFilteredPlans().map(plan => (
              <ProductionPlanCard 
                key={plan.id}
                plan={plan}
                isExpanded={expandedPlanId === plan.id}
                onToggleExpand={() => toggleExpandPlan(plan.id)}
                onUpdatePlan={updateProductionPlan}
                onMarkAsSold={markAsSold}
                onRemove={removeProductionPlan}
                onReproduce={reproduceProductionPlan}
                drugTypes={drugTypes}
                dealers={dealers}
                dailySales={dailySales}
                setDailySales={setDailySales}
                dealerTransactions={dealerTransactions}
                setDealerTransactions={setDealerTransactions}
                effectColors={effectColors}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductionPlanningTab;
