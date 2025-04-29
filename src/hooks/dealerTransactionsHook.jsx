// src/hooks/dealerTransactionsHook.jsx
import useGameStore from '@stores/GameStore';

const useDealerTransactions = () => {
    const {
        getDealerTransactions, setDealerTransactions, addDealerTransaction, resetDealerTransactions,
    } = useGameStore((state) => ({
        getDealerTransactions: state.getDealerTransactions,
        setDealerTransactions: state.setDealerTransactions,
        addDealerTransaction: state.addDealerTransaction,
        resetDealerTransactions: state.resetDealerTransactions,
    }));

    return {
        getDealerTransactions,
        setDealerTransactions,
        addDealerTransaction,
        resetDealerTransactions,
    };
};
export default useDealerTransactions;
