// src/hooks/strainsHook.jsx
import useGameStore from '@/stores/GameStore';

const useStrains = () => {
  const strains = useGameStore((state) => state.strains);
  const setStrains = useGameStore((state) => state.setStrains);
  const resetStrains = useGameStore((state) => state.resetStrains);
  return { strains, setStrains, resetStrains };
};

export default useStrains;