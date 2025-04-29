// src/hooks/supplyHistoryHook.jsx
import useGameStore from '@stores/GameStore';


const useSupplyHistory = () => {
    const {
        getSupplyHistory, setSupplyHistory, addSupplyHistoryEntry, resetSupplyHistory,
    } = useGameStore((state) => ({
        getSupplyHistory: state.getSupplyHistory,
        setSupplyHistory: state.setSupplyHistory,
        addSupplyHistoryEntry: state.addSupplyHistoryEntry,
        resetSupplyHistory: state.resetSupplyHistory,
    }));

    return {
        getSupplyHistory,
        setSupplyHistory,
        addSupplyHistoryEntry,
        resetSupplyHistory,
    };
};
export default useSupplyHistory;
