// src/stores/slices/dealersSlice.js
export const createDealersSlice = (set, get) => ({
    dealers: [],
    getDealers: () => get().dealers,
    setDealers: (dealers) => set({ dealers }),
    updateDealer: (id, updates) => set((state) => ({ dealers: state.dealers.map(d => d.id === id ? { ...d, ...updates } : d) })),
    resetDealers: () => set({ dealers: [] }),
});
