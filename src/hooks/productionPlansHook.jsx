// src/hooks/productionPlansHook.jsx
import useGameStore from '@/stores/GameStore';

const useProductionPlans = () => {
  return {
    productionPlans: useGameStore((s) => s.productionPlans),
    setProductionPlans: useGameStore((s) => s.setProductionPlans),
    addPlan: useGameStore((s) => s.addPlan),
    updatePlanStatus: useGameStore((s) => s.updatePlanStatus),
    deletePlan: useGameStore((s) => s.deletePlan),
  };
};

export default useProductionPlans;
