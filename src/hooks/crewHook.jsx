// src/hooks/crewHook.jsx
import useGameStore from '@/stores/GameStore';

const useCrew = () => {
  const crew = useGameStore((state) => state.crew);
  const setCrew = useGameStore((state) => state.setCrew);
  const resetCrew = useGameStore((state) => state.resetCrew);
  return { crew, setCrew, resetCrew };
};

export default useCrew;