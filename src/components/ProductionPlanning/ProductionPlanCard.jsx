// src/components/ProductionPlanning/ProductionPlanCard.jsx
import { useProductionPlans } from '@hooks';

const ProductionPlanCard = ({ plan }) => {
  const { updatePlanStatus, deletePlan } = useProductionPlans();

  const handleStart = () => updatePlanStatus(plan.id, 'In Progress');
  const handleComplete = () => updatePlanStatus(plan.id, 'Completed');
  const handleDelete = () => deletePlan(plan.id);

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
      <div className="font-bold text-lg mb-1">{plan.name}</div>
      <div className="text-sm text-gray-600 mb-2">{plan.description || 'No description provided.'}</div>

      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div><strong>Type:</strong> {plan.drugType}</div>
        <div><strong>Batch Size:</strong> {plan.batchSize}</div>
        <div><strong>Status:</strong> {plan.status}</div>
      </div>

      <div className="flex gap-2">
        {plan.status === 'Planned' && (
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleStart}
          >
            Start
          </button>
        )}
        {plan.status === 'In Progress' && (
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleComplete}
          >
            Complete
          </button>
        )}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductionPlanCard;
