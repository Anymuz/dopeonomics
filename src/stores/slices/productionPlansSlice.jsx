// src/stores/slices/productionPlansSlice.jsx
/* eslint-disable no-unused-vars */
import { calculateProductionCost, calculateRecommendedPrice } from '@/utils/pricing';

export const createProductionPlansSlice = (set, get) => ({
  productionPlans: [],

  setProductionPlans: (plans) =>
    set(() => ({
      productionPlans: plans,
    })),

  addPlan: (plan) => {
    const enrichedPlan = {
      ...plan,
      totalCost: calculateProductionCost(plan.ingredients, plan.batchSize),
      recommendedPrice: calculateRecommendedPrice(plan.ingredients, plan.batchSize),
    };
    set((state) => ({
      productionPlans: [...state.productionPlans, enrichedPlan],
    }));
  },

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