// src/hooks/supplyHook.jsx
import useGameStore from '@stores/GameStore';

const useSupply = () => {
    const {
        getSupply, setSupply, updateSupplyItem, resetSupply,
    } = useGameStore((state) => ({
        getSupply: state.getSupply,
        setSupply: state.setSupply,
        updateSupplyItem: state.updateSupplyItem,
        resetSupply: state.resetSupply,
    }));

    return {
        getSupply,
        setSupply,
        updateSupplyItem,
        resetSupply,
    };
};
export default useSupply;
