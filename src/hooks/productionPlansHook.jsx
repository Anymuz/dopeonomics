// src/hooks/productionPlansHook.jsx
import useGameStore from '@/stores/GameStore';

const useProductionPlans = () => {
  const productionPlans = useGameStore((state) => state.productionPlans)
  const setProductionPlans = useGameStore((state) => state.setProductionPlans)
  const addPlan = useGameStore((state) => state.addPlan)
  const updatePlanStatus = useGameStore((state) => state.updatePlanStatus)
  const deletePlan = useGameStore((state) => state.deletePlan)

  return {
    productionPlans, 
    setProductionPlans, 
    addPlan,
    updatePlanStatus, 
    deletePlan
  };
};

export default useProductionPlans;
