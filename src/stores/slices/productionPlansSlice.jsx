// src/stores/slices/productionPlansSlice.jsx
export const createProductionPlansSlice = (set) => ({
    productionPlans: [],
    setProductionPlans: (newPlans) => set({ productionPlans: newPlans }),
    resetProductionPlans: () => set({ productionPlans: [] }),
  });
