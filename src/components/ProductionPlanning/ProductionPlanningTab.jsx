// src/components/ProductionPlanning/ProductionPlanningTab.jsx
const ProductionPlanningTab = ({ productionPlans }) => {
  if (!productionPlans.length) {
    return <div className="text-gray-500">No production plans available.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Production Planning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productionPlans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 border-2 rounded-lg bg-white shadow-sm hover:border-indigo-400 transition-all duration-150"
          >
            <div className="font-semibold text-lg">{plan.strainName}</div>
            <div className="text-sm text-gray-600">Quantity: {plan.quantity}, Quality: {plan.quality}</div>
            <div className="text-sm text-green-700 font-medium mt-1">
              Production Cost: ${plan.productionCost}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionPlanningTab;