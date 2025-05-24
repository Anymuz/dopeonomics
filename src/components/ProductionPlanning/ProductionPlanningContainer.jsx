// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import useProductionPlans from '@hooks/productionPlansHook';
import useMixes from '@hooks/mixesHook';
import ProductionPlanningTab from './ProductionPlanningTab';


const ProductionPlanningContainer = () => {
  const {
    productionPlans,
    addPlan,
    updatePlanStatus,
    deletePlan,
  } = useProductionPlans();

  const { mixes } = useMixes();

   const handleUpdate = (updatedPlan) => {
    updatePlanStatus(updatedPlan.id, updatedPlan.status || 'Planned', updatedPlan);
  };

  const handleAdvance = (id, status) => {
    updatePlanStatus(id, status);
  };

  return (
    <ProductionPlanningTab
      strains={mixes}
      addPlan={addPlan}
      plans={productionPlans}
      onUpdate={handleUpdate}
      onAdvance={handleAdvance}
      onDelete={deletePlan}
    />
  );
};

export default ProductionPlanningContainer;
