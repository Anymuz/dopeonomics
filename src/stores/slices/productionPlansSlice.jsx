// src/stores/slices/productionPlansSlice.jsx
/* eslint-disable no-unused-vars */
export const createProductionPlansSlice = (set, get) => ({
  productionPlans: [],

  setProductionPlans: (plans) =>
    set(() => ({
    productionPlans: plans,
    })),

  addPlan: (plan) =>
    set((state) => ({
      productionPlans: [...state.productionPlans, plan],
    })),

  updatePlanStatus: (id, status) =>
    set((state) => ({
      productionPlans: state.productionPlans.map((plan) =>
        plan.id === id ? { ...plan, status } : plan
      ),
    })),

  deletePlan: (id) =>
    set((state) => ({
      productionPlans: state.productionPlans.filter((plan) => plan.id !== id),
    })),
});