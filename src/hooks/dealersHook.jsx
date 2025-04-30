// src/hooks/dealersHook.jsx
import useGameStore from '@/stores/GameStore';

const useDealers = () => {
  const dealers = useGameStore((state) => state.dealers);
  const setDealers = useGameStore((state) => state.setDealers);
  const resetDealers = useGameStore((state) => state.resetDealers);
  return { dealers, setDealers, resetDealers };
};

export default useDealers;