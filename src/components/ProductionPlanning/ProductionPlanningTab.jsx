// src/components/Production/ProductionPlanningTab.jsx
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ProductionPlanCard from './ProductionPlanCard';
import useMixes from '@hooks/mixesHook';
//import useProductionPlans from '@hooks/productionPlansHook';

const ProductionPlanningTab = ({ plans, onUpdate, addPlan, onAdvance, onDelete }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Production Plans</h2>
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

    </div>
  );
};

export default ProductionPlanningTab;
