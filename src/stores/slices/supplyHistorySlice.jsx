// src/stores/slices/supplyHistorySlice.js
export const createSupplyHistorySlice = (set) => ({
    supplyHistory: [],
    setSupplyHistory: (newHistory) => set({ supplyHistory: newHistory }),
    resetSupplyHistory: () => set({ supplyHistory: [] }),
  });