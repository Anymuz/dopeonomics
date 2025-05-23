// src/hooks/mixesHook.jsx
import useGameStore from '@stores/GameStore';

const useMixes = () => {
  const mixes = useGameStore((state) => state.mixes);
  const addMix = useGameStore((state) => state.addMix);
  const resetMixes = useGameStore((state) => state.resetMixes);

  return {
    mixes,
    addMix,
    resetMixes,
  };
};

export default useMixes;
