// src/stores/slices/supplyHistorySlice.jsx
export const createSupplyHistorySlice = (set, get) => ({
    supplyHistory: [],
    getSupplyHistory: () => get().supplyHistory,
    setSupplyHistory: (history) => set({ supplyHistory: history }),
    addSupplyHistoryEntry: (entry) => set((state) => ({ supplyHistory: [...state.supplyHistory, entry] })),
    resetSupplyHistory: () => set({ supplyHistory: [] }),
});