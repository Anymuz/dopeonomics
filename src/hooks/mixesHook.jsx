// src/hooks/mixesHook.jsx
import useGameStore from '@stores/GameStore';

const useMixes = () => {
  const mixes = useGameStore((state) => state.mixes);
  const setMixes = useGameStore((state) => state.setMixes);
  const resetMixes = useGameStore((state) => state.resetMixes);
  const addMix = useGameStore((state) => state.addMix); // ✅ Injected function

  return {
    mixes,
    setMixes,
    resetMixes,
    addMix,
  };
};

export default useMixes;

