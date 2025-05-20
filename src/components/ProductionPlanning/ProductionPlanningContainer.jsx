// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import useProductionPlans from '@hooks/productionPlansHook';
import useStrains from '@hooks/strainsHook';
import ProductionPlanningTab from './ProductionPlanningTab';

const ProductionPlanningContainer = () => {
  const {
    productionPlans,
    addPlan,
    updatePlanStatus,
    deletePlan,
  } = useProductionPlans();

  const { strains } = useStrains();

  return (
    <ProductionPlanningTab
      productionPlans={productionPlans}
      addPlan={addPlan}
      updatePlanStatus={updatePlanStatus}
      deletePlan={deletePlan}
      strains={strains}
    />
  );
};

export default ProductionPlanningContainer;
