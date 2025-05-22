// src/components/Production/ProductionPlanningTab.jsx
import React, { useState } from 'react';
import ProductionPlanCard from './ProductionPlanCard';
import ProductionCreationModal from './ProductionCreationModal';
import useStrains from '@hooks/strainsHook';
//import useProductionPlans from '@hooks/productionPlansHook';

const ProductionPlanningTab = ({ plans, onUpdate, addPlan, onAdvance, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const { strains } = useStrains();
 // const { addPlan } = useProductionPlans(); // Optional if not injected via props

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Production Plans</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <p className="text-gray-500 text-sm">No production plans yet.</p>
      ) : (
        plans.map((plan) => (
          <ProductionPlanCard
            key={plan.id}
            plan={plan}
            addPlan={addPlan}
            onUpdate={onUpdate}
            onAdvance={onAdvance}
            onDelete={onDelete}
          />
        ))
      )}

      {showModal && (
        <ProductionCreationModal
          onClose={() => setShowModal(false)}
          addPlan={addPlan}
          strains={strains}
        />
      )}
    </div>
  );
};

export default ProductionPlanningTab;
