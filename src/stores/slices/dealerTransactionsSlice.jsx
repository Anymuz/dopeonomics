// src/stores/slices/dealerTransactionsSlice.js

export const createDealerTransactionsSlice = (set, get) => ({
    transactions: [],
    getDealerTransactions: () => get().transactions,
    setDealerTransactions: (tx) => set({ transactions: tx }),
    addDealerTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),
    resetDealerTransactions: () => set({ transactions: [] }),
});
export default createDealerTransactionsSlice;