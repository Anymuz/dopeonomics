// src/hooks/productionPlansHook.jsx
import useGameStore from '@stores/GameStore';

const useProductionPlans = () => {
    const {
        getProductionPlans, setProductionPlans, addProductionPlan, updateProductionPlan, removeProductionPlan, resetProductionPlans,
    } = useGameStore((state) => ({
        getProductionPlans: state.getProductionPlans,
        setProductionPlans: state.setProductionPlans,
        addProductionPlan: state.addProductionPlan,
        updateProductionPlan: state.updateProductionPlan,
        removeProductionPlan: state.removeProductionPlan,
        resetProductionPlans: state.resetProductionPlans,
    }));

    return {
        getProductionPlans,
        setProductionPlans,
        addProductionPlan,
        updateProductionPlan,
        removeProductionPlan,
        resetProductionPlans,
    };
};
export default useProductionPlans;
