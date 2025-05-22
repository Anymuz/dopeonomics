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

   const handleUpdate = (updatedPlan) => {
    updatePlanStatus(updatedPlan.id, updatedPlan.status || 'Planned', updatedPlan);
  };

  const handleAdvance = (id, status) => {
    updatePlanStatus(id, status);
  };

  return (
    <ProductionPlanningTab
      strains={strains}
      addPlan={addPlan}
      plans={productionPlans}
      onUpdate={handleUpdate}
      onAdvance={handleAdvance}
      onDelete={deletePlan}
    />
  );
//   (
//     <ProductionPlanningTab
//       productionPlans={productionPlans}
//       addPlan={addPlan}
//       // updatePlanStatus={updatePlanStatus}
//       //deletePlan={deletePlan}
//       strains={strains}
//       plans={productionPlans}
//       onStart={updatePlanStatus}
//       onComplete={(id) => updatePlanStatus(id, 'Completed')}
//       onDelete={deletePlan}
// />
//   )
};

export default ProductionPlanningContainer;
