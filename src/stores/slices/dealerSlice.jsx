// src/stores/slices/dealersSlice.jsx
export const createDealersSlice = (set) => ({
    dealers: [],
    setDealers: (newDealers) => set({ dealers: newDealers }),
    resetDealers: () => set({ dealers: [] }),
  });