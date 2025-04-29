// src/stores/slices/productionPlansSlice.js

export const createProductionPlansSlice = (set, get) => ({
    productionPlans: [],
    getProductionPlans: () => get().productionPlans,
    setProductionPlans: (plans) => set({ productionPlans: plans }),
    addProductionPlan: (plan) => set((state) => ({ productionPlans: [...state.productionPlans, plan] })),
    updateProductionPlan: (id, updates) => set((state) => ({ productionPlans: state.productionPlans.map(p => p.id === id ? { ...p, ...updates } : p) })),
    removeProductionPlan: (id) => set((state) => ({ productionPlans: state.productionPlans.filter(p => p.id !== id) })),
    resetProductionPlans: () => set({ productionPlans: [] }),
});
