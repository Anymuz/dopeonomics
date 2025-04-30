// src/hooks/supplyHistoryHook.jsx
import useGameStore from '@/stores/GameStore';

const useSupplyHistory = () => {
  const supplyHistory = useGameStore((state) => state.supplyHistory);
  const setSupplyHistory = useGameStore((state) => state.setSupplyHistory);
  const resetSupplyHistory = useGameStore((state) => state.resetSupplyHistory);
  return { supplyHistory, setSupplyHistory, resetSupplyHistory };
};

export default useSupplyHistory;
