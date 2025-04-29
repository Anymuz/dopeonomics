// src/hooks/mixesHook.jsx
import useGameStore from '@stores/GameStore';

const useMixes = () => {
  const mixes = useGameStore((state) => state.mixes);
  const setMixes = useGameStore((state) => state.setMixes);
  const resetMixes = useGameStore((state) => state.resetMixes);

  return {
    mixes,
    setMixes,
    resetMixes,
  };
};

export default useMixes;
