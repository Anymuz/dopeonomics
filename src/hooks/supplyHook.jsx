// src/hooks/supplyHook.jsx
import useGameStore from '@/stores/GameStore';

const useSupply = () => {
  const supply = useGameStore((state) => state.supply);
  const setSupply = useGameStore((state) => state.setSupply);
  const resetSupply = useGameStore((state) => state.resetSupply);
  return { supply, setSupply, resetSupply };
};

export default useSupply;