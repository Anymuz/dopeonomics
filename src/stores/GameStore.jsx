// src/stores/GameStore.jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createSeedsSlice,
  createIngredientsSlice,
  createMixesSlice,
  createProductionPlansSlice,
  createSalesSlice,
  createDealerTransactionsSlice,
  createSupplySlice,
  createSupplyHistorySlice,
  createDealersSlice,
  createCrewSlice,
  createSettingsSlice,
  createCollapseStateSlice,
  createResetSlice,
  createStrainsSlice, 
  createSalesHistorySlice, 
} from './slices';

const useGameStore = create(
  persist(
    (set, get) => ({
      ...createSeedsSlice(set, get),
      ...createIngredientsSlice(set, get),
      ...createMixesSlice(set, get),
      ...createProductionPlansSlice(set, get),
      ...createSalesSlice(set, get),
      ...createDealerTransactionsSlice(set, get),
      ...createSupplySlice(set, get),
      ...createSupplyHistorySlice(set, get),
      ...createDealersSlice(set, get),
      ...createCrewSlice(set, get),
      ...createSettingsSlice(set, get),
      ...createCollapseStateSlice(set, get),
      ...createResetSlice(set, get),
      ...createStrainsSlice(set, get), 
      ...createSalesHistorySlice(set, get),
    }),
    {
      name: 'dopey_game_store',
      getStorage: () => localStorage,
      partialize: (state) => ({
        seeds: state.seeds,
        ingredients: state.ingredients,
        mixes: state.mixes,
        productionPlans: state.productionPlans,
        dailySales: state.dailySales,
        dealerTransactions: state.dealerTransactions,
        supply: state.supply,
        supplyHistory: state.supplyHistory,
        dealers: state.dealers,
        crewMembers: state.crewMembers,
        collapseState: state.collapseState,
        settings: state.settings,
      }),
    }
  )
);

export default useGameStore;
