// src/stores/slices/salesSlice.jsx
export const createSalesSlice = (set, get) => ({
    dailySales: [],
    getDailySales: () => get().dailySales,
    setDailySales: (sales) => set({ dailySales: sales }),
    addDailySale: (sale) => set((state) => ({ dailySales: [...state.dailySales, sale] })),
    resetDailySales: () => set({ dailySales: [] }),
});
