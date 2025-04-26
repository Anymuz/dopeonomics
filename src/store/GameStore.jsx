// File: src/stores/GameStore.jsz
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Initial constants (to move into /constants as needed)
const initialSeeds = [];
const initialIngredients = [];
const initialMixes = [];
const initialProductionPlans = [];
const initialDailySales = [];
const initialDealerTransactions = [];
const initialSupply = { seeds: {}, ingredients: {}, packaging: { baggies: 0, jars: 0 } };
const initialSupplyHistory = [];
const initialDealers = [];
const initialCrewMembers = { botanist: 0, cleaner: 0, handler: 0, chemist: 0 };
const initialSettings = {
  activeTab: 'creator',
  strainView: 'all',
  filterOptions: { name: '', seedType: '', drugType: '', effect: '' },
  sortSettings: { column: 'name', direction: 'asc' },
  currentMix: null,
  selectedDrugType: 'weed',
  selectedSeed: null,
  priceSettings: { salePrice: 0, targetMargin: '', priceMultiplier: 1, packagingType: 'baggies' }
};

const useGameStore = create(
  persist(
    (set, get) => ({
      // State slices
      seeds: initialSeeds,
      ingredients: initialIngredients,
      mixes: initialMixes,
      productionPlans: initialProductionPlans,
      dailySales: initialDailySales,
      dealerTransactions: initialDealerTransactions,
      supply: initialSupply,
      supplyHistory: initialSupplyHistory,
      dealers: initialDealers,
      crewMembers: initialCrewMembers,
      collapseState: {},
      settings: initialSettings,

      // Getters
      getSeeds: () => get().seeds,
      getIngredients: () => get().ingredients,
      getMixes: () => get().mixes,
      getProductionPlans: () => get().productionPlans,
      getDailySales: () => get().dailySales,
      getDealerTransactions: () => get().dealerTransactions,
      getSupply: () => get().supply,
      getSupplyHistory: () => get().supplyHistory,
      getDealers: () => get().dealers,
      getCrewMembers: () => get().crewMembers,
      getCollapseState: () => get().collapseState,
      getSettings: () => get().settings,

      // Seeds & Ingredients
      setSeeds: (seeds) => set({ seeds }),
      setIngredients: (ingredients) => set({ ingredients }),

      // Mixes
      setMixes: (mixes) => set({ mixes }),
      addMix: (mix) => set((state) => ({ mixes: [...state.mixes, mix] })),
      updateMix: (id, updates) => set((state) => ({ mixes: state.mixes.map(m => m.id === id ? { ...m, ...updates } : m) })),
      removeMix: (id) => set((state) => ({ mixes: state.mixes.filter(m => m.id !== id) })),
      resetMixes: () => set({ mixes: initialMixes }),

      // Production Plans
      setProductionPlans: (plans) => set({ productionPlans: plans }),
      addProductionPlan: (plan) => set((state) => ({ productionPlans: [...state.productionPlans, plan] })),
      updateProductionPlan: (id, updates) => set((state) => ({ productionPlans: state.productionPlans.map(p => p.id === id ? { ...p, ...updates } : p) })),
      removeProductionPlan: (id) => set((state) => ({ productionPlans: state.productionPlans.filter(p => p.id !== id) })),
      resetProductionPlans: () => set({ productionPlans: initialProductionPlans }),

      // Sales
      setDailySales: (sales) => set({ dailySales: sales }),
      addDailySale: (sale) => set((state) => ({ dailySales: [...state.dailySales, sale] })),
      resetDailySales: () => set({ dailySales: initialDailySales }),

      // Dealer Transactions
      setDealerTransactions: (tx) => set({ dealerTransactions: tx }),
      addDealerTransaction: (tx) => set((state) => ({ dealerTransactions: [...state.dealerTransactions, tx] })),
      resetDealerTransactions: () => set({ dealerTransactions: initialDealerTransactions }),

      // Supply
      setSupply: (supply) => set({ supply }),
      updateSupplyItem: (category, itemId, quantity) => set((state) => ({ supply: { ...state.supply, [category]: { ...state.supply[category], [itemId]: quantity } } })),
      resetSupply: () => set({ supply: initialSupply }),

      // Supply History
      setSupplyHistory: (history) => set({ supplyHistory: history }),
      addSupplyHistoryEntry: (entry) => set((state) => ({ supplyHistory: [...state.supplyHistory, entry] })),
      resetSupplyHistory: () => set({ supplyHistory: initialSupplyHistory }),

      // Dealers & Crew
      setDealers: (dealers) => set({ dealers }),
      updateDealer: (id, updates) => set((state) => ({ dealers: state.dealers.map(d => d.id === id ? { ...d, ...updates } : d) })),
      resetDealers: () => set({ dealers: initialDealers }),

      setCrewMembers: (crew) => set({ crewMembers: crew }),
      updateCrewMember: (role, count) => set((state) => ({ crewMembers: { ...state.crewMembers, [role]: count } })),
      resetCrewMembers: () => set({ crewMembers: initialCrewMembers }),

      // UI & Settings
      setCollapseState: (key, collapsed) => set((state) => ({ collapseState: { ...state.collapseState, [key]: collapsed } })),

      setSettings: (settings) => set({ settings }),
      updateSettings: (path, value) => set((state) => {
        const newSettings = { ...state.settings };
        const keys = path.split('.');
        let obj = newSettings;
        while (keys.length > 1) obj = obj[keys.shift()];
        obj[keys[0]] = value;
        return { settings: newSettings };
      }),
      resetSettings: () => set({ settings: initialSettings }),

      // Reset entire game
      resetGame: () => set({
        seeds: initialSeeds,
        ingredients: initialIngredients,
        mixes: initialMixes,
        productionPlans: initialProductionPlans,
        dailySales: initialDailySales,
        dealerTransactions: initialDealerTransactions,
        supply: initialSupply,
        supplyHistory: initialSupplyHistory,
        dealers: initialDealers,
        crewMembers: initialCrewMembers,
        collapseState: {},
        settings: initialSettings
      })
    }),
    {
      name: 'dopey_game_store', // storage key in localStorage
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
        settings: state.settings
      })
    }
  )
);

export default useGameStore;
