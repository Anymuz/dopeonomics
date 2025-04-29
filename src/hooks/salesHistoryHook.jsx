// src/hooks/salesHistoryHook.jsx
import useGameStore from '@/stores/GameStore';

const useSalesHistory = () => {
  const salesHistory = useGameStore((state) => state.salesHistory);
  const setSalesHistory = useGameStore((state) => state.setSalesHistory);
  const resetSalesHistory = useGameStore((state) => state.resetSalesHistory);
  return { salesHistory, setSalesHistory, resetSalesHistory };
};

export default useSalesHistory;