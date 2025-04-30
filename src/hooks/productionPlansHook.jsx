// src/hooks/productionPlansHook.jsx
import useGameStore from '@/stores/GameStore';

const useProductionPlans = () => {
  const productionPlans = useGameStore((state) => state.productionPlans);
  const setProductionPlans = useGameStore((state) => state.setProductionPlans);
  const resetProductionPlans = useGameStore((state) => state.resetProductionPlans);
  return { productionPlans, setProductionPlans, resetProductionPlans };
};

export default useProductionPlans;
