// src/stores/slices/supplySlice.jsx
export const createSupplySlice = (set) => ({
    supply: [],
    setSupply: (newSupply) => set({ supply: newSupply }),
    resetSupply: () => set({ supply: [] }),
  });