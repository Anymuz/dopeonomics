// src/stores/slices/salesHistorySlice.jsx
export const createSalesHistorySlice = (set) => ({
    salesHistory: [],
    setSalesHistory: (newSales) => set({ salesHistory: newSales }),
    resetSalesHistory: () => set({ salesHistory: [] }),
  });