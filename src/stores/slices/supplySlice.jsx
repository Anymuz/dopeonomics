// src/stores/slices/supplySlice.jsx
export const createSupplySlice = (set, get) => ({
    supply: { seeds: {}, ingredients: {}, packaging: { baggies: 0, jars: 0 } },
    getSupply: () => get().supply,
    setSupply: (supply) => set({ supply }),
    updateSupplyItem: (category, itemId, quantity) => set((state) => ({
        supply: { ...state.supply, [category]: { ...state.supply[category], [itemId]: quantity } },
    })),
    resetSupply: () => set({ supply: { seeds: {}, ingredients: {}, packaging: { baggies: 0, jars: 0 } } }),
});