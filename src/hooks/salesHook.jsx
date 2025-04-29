// src/hooks/salesHook.jsx
import useGameStore from '@stores/GameStore';

const useSales = () => {
    const {
        getDailySales, setDailySales, addDailySale, resetDailySales,
    } = useGameStore((state) => ({
        getDailySales: state.getDailySales,
        setDailySales: state.setDailySales,
        addDailySale: state.addDailySale,
        resetDailySales: state.resetDailySales,
    }));

    return {
        getDailySales,
        setDailySales,
        addDailySale,
        resetDailySales,
    };
};
export default useSales;
