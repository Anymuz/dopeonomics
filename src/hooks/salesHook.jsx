// src/hooks/salesHook.jsx
import useGameStore from '@stores/GameStore';

const useSales = () => {
    const dailySales = useGameStore((state) => state.dailySales || []);
    const getDailySales = useGameStore((state) => state.getDailySales);
    const setDailySales = useGameStore((state) => state.setDailySales);
    const addDailySale = useGameStore((state) => state.addDailySale);
    const resetDailySales = useGameStore((state) => state.resetDailySales);

    return { 
      dailySales, 
      getDailySales, 
      setDailySales, 
      addDailySale, 
      resetDailySales 
    };
};

export default useSales