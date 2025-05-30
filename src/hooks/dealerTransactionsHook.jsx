// src/hooks/dealerTransactionsHook.jsx
import useGameStore from '@stores/GameStore';

const useDealerTransactions = () => {
  const transactions = useGameStore((state) => state.transactions || []);
  const setDealerTransactions = useGameStore((state) => state.setDealerTransactions);
  const addDealerTransaction = useGameStore((state) => state.addDealerTransaction);
  const resetDealerTransactions = useGameStore((state) => state.resetDealerTransactions);

  return {
    transactions,
    setDealerTransactions,
    addDealerTransaction,
    resetDealerTransactions,
  };
};

export default useDealerTransactions;
