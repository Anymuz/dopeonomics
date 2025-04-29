// src/hooks/dealersHook.jsx
import useGameStore from '@stores/GameStore';

const useDealers = () => {
    const {
        getDealers, setDealers, updateDealer, resetDealers,
    } = useGameStore((state) => ({
        getDealers: state.getDealers,
        setDealers: state.setDealers,
        updateDealer: state.updateDealer,
        resetDealers: state.resetDealers,
    }));

    return {
        getDealers,
        setDealers,
        updateDealer,
        resetDealers,
    };
};
export default useDealers;
