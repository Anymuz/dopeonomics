// src/hooks/salesHook.jsx
import useGameStore from '@stores/GameStore';

// const useSales = () => {
//     const {
//         getDailySales, setDailySales, addDailySale, resetDailySales,
//     } = useGameStore((state) => ({
//         getDailySales: state.getDailySales,
//         setDailySales: state.setDailySales,
//         addDailySale: state.addDailySale,
//         resetDailySales: state.resetDailySales,
//     }));

//     return {
//         getDailySales,
//         setDailySales,
//         addDailySale,
//         resetDailySales,
//     };
// };
// export default useSales;

const useSales = () => {
    const dailySales = useGameStore((state) => state.dailySales || []);
    const getDailySales = useGameStore((state) => state.getDailySales);
    const setDailySales = useGameStore((state) => state.setDailySales);
    const addDailySale = useGameStore((state) => state.addDailySale);
    const resetDailySales = useGameStore((state) => state.resetDailySales);

    return { dailySales, getDailySales, setDailySales, addDailySale, resetDailySales };
};

export default useSales

/*

const useSalesHistory = () => {
  const salesHistory = useGameStore((state) => state.salesHistory);
  const setSalesHistory = useGameStore((state) => state.setSalesHistory);
  const resetSalesHistory = useGameStore((state) => state.resetSalesHistory);
  return { salesHistory, setSalesHistory, resetSalesHistory };
};

export default useSalesHistory;
*/