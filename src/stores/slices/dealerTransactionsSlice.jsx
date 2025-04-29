// src/stores/slices/dealerTransactionsSlice.js

export const createDealerTransactionsSlice = (set, get) => ({
    dealerTransactions: [],
    getDealerTransactions: () => get().dealerTransactions,
    setDealerTransactions: (tx) => set({ dealerTransactions: tx }),
    addDealerTransaction: (tx) => set((state) => ({ dealerTransactions: [...state.dealerTransactions, tx] })),
    resetDealerTransactions: () => set({ dealerTransactions: [] }),
});
