// src/components/Production/ProductionPlanCard.jsx
import React from 'react';

const ProductionPlanCard = ({ plan, onStart, onComplete, onDelete }) => {
  return (
    <div className="border p-4 rounded bg-white shadow-sm mb-4">
      <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
      <p className="text-sm text-gray-600 mb-1">Drug Type: {plan.drugType}</p>
      <p className="text-sm text-gray-600 mb-1">Effects: {plan.effects?.join(', ') || 'None'}</p>
      <p className="text-sm text-gray-600 mb-1">Quantity: {plan.plannedQuantity}</p>
      <p className="text-sm text-gray-600 mb-1">
        Total Cost: {typeof plan.totalCost === 'number' ? `$${plan.totalCost.toFixed(2)}` : 'N/A'}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        Expected Sale: {typeof plan.salePrice === 'number' ? `$${plan.salePrice.toFixed(2)}` : 'N/A'}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Status: {plan.status}</span>
        <div className="flex gap-2">
          {plan.status === 'Planned' && (
            <button
              onClick={() => onStart(plan.id)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Start
            </button>
          )}
          {plan.status === 'In Progress' && (
            <button
              onClick={() => onComplete(plan.id)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Complete
            </button>
          )}
          <button
            onClick={() => onDelete(plan.id)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlanCard;
