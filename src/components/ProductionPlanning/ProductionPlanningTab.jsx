// src/components/ProductionPlanning/ProductionPlanningTab.jsx
import { useState } from 'react';
import ProductionPlanCard from './ProductionPlanCard';
import ProductionCreationModal from './ProductionCreationModal';
import { useStrains } from '@hooks';

const ProductionPlanningTab = ({ productionPlans }) => {
  const [showModal, setShowModal] = useState(false);
  const { strains } = useStrains();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Production Plans</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => setShowModal(true)}
        >
          Add New Plan
        </button>
      </div>

      {showModal && (
        <ProductionCreationModal strains={strains} onClose={() => setShowModal(false)} />
      )}

      {productionPlans.length === 0 ? (
        <p className="text-gray-500">No production plans created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productionPlans.map((plan) => (
            <ProductionPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionPlanningTab;
