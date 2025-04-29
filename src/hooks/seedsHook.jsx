// src/hooks/seedsHook.jsx
import useGameStore from '@stores/GameStore';

const useSeeds = () => {
  const seeds = useGameStore((state) => state.seeds);
  const setSeeds = useGameStore((state) => state.setSeeds);
  const resetSeeds = useGameStore((state) => state.resetSeeds);

  return {
    seeds,
    setSeeds,
    resetSeeds,
  };
};

export default useSeeds;