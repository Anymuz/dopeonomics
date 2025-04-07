// StorageService.js
// A centralized service for handling local storage operations

const STORAGE_KEYS = {
  MIXES: 'dopey_strainMixes',
  PRODUCTION_PLANS: 'dopey_productionPlans',
  SALES_HISTORY: 'dopey_salesHistory',
  ACTIVE_TAB: 'dopey_activeTab',
  STRAIN_VIEW: 'dopey_strainView',
  FILTER_OPTIONS: 'dopey_filterOptions',
  SORT_SETTINGS: 'dopey_sortSettings',
  CURRENT_MIX: 'dopey_currentMix',
  SELECTED_DRUG_TYPE: 'dopey_selectedDrugType',
  SELECTED_SEED: 'dopey_selectedSeed',
  PRICE_SETTINGS: 'dopey_priceSettings',
  SUPPLIES: 'dopey_supplies',
  SUPPLY_HISTORY: 'dopey_supplyHistory',
  DEALERS: 'dopey_dealers',
  CREW_MEMBERS: 'dopey_crewMembers',
  DEALER_TRANSACTIONS: 'dopey_dealerTransactions',
  DAILY_SALES: 'dopey_dailySales'
};
  
  // Save data to localStorage
  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      return false;
    }
  };
  
  const saveSupplies = (supplies) => saveData(STORAGE_KEYS.SUPPLIES, supplies);
  const loadSupplies = () => loadData(STORAGE_KEYS.SUPPLIES, {
    seeds: {},
    ingredients: {},
    packaging: { baggies: 0, jars: 0 }
  });
  
  const saveSupplyHistory = (history) => saveData(STORAGE_KEYS.SUPPLY_HISTORY, history);
  const loadSupplyHistory = () => loadData(STORAGE_KEYS.SUPPLY_HISTORY, []);
  
  const saveDealers = (dealers) => saveData(STORAGE_KEYS.DEALERS, dealers);
  const loadDealers = () => loadData(STORAGE_KEYS.DEALERS, []);
  
  const saveCrewMembers = (crew) => saveData(STORAGE_KEYS.CREW_MEMBERS, crew);
  const loadCrewMembers = () => loadData(STORAGE_KEYS.CREW_MEMBERS, {
    botanist: 0,
    cleaner: 0,
    handler: 0,
    chemist: 0
  });
  
  const saveDealerTransactions = (transactions) => saveData(STORAGE_KEYS.DEALER_TRANSACTIONS, transactions);
  const loadDealerTransactions = () => loadData(STORAGE_KEYS.DEALER_TRANSACTIONS, []);
  
  const saveDailySales = (sales) => saveData(STORAGE_KEYS.DAILY_SALES, sales);
  const loadDailySales = () => loadData(STORAGE_KEYS.DAILY_SALES, []);

  // Load data from localStorage
  const loadData = (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error);
      return defaultValue;
    }
  };
  
  // Clear specific data
  const clearData = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error clearing data for key ${key}:`, error);
      return false;
    }
  };
  
  // Clear all app data
  const clearAllData = () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing all app data:', error);
      return false;
    }
  };
  
  // Dedicated functions for specific data types
  const saveMixes = (mixes) => saveData(STORAGE_KEYS.MIXES, mixes);
  const loadMixes = () => loadData(STORAGE_KEYS.MIXES, []);
  
  const saveProductionPlans = (plans) => saveData(STORAGE_KEYS.PRODUCTION_PLANS, plans);
  const loadProductionPlans = () => loadData(STORAGE_KEYS.PRODUCTION_PLANS, []);
  
  const saveSalesHistory = (history) => saveData(STORAGE_KEYS.SALES_HISTORY, history);
  const loadSalesHistory = () => loadData(STORAGE_KEYS.SALES_HISTORY, []);
  
  const saveActiveTab = (tab) => saveData(STORAGE_KEYS.ACTIVE_TAB, tab);
  const loadActiveTab = () => loadData(STORAGE_KEYS.ACTIVE_TAB, 'creator');
  
  const saveStrainView = (view) => saveData(STORAGE_KEYS.STRAIN_VIEW, view);
  const loadStrainView = () => loadData(STORAGE_KEYS.STRAIN_VIEW, 'all');
  
  const saveFilterOptions = (options) => saveData(STORAGE_KEYS.FILTER_OPTIONS, options);
  const loadFilterOptions = () => loadData(STORAGE_KEYS.FILTER_OPTIONS, {
    name: '',
    seedType: '',
    drugType: '',
    effect: ''
  });
  
  const saveSortSettings = (settings) => saveData(STORAGE_KEYS.SORT_SETTINGS, settings);
  const loadSortSettings = () => loadData(STORAGE_KEYS.SORT_SETTINGS, {
    column: 'name',
    direction: 'asc'
  });
  
  const saveCurrentMix = (mix) => saveData(STORAGE_KEYS.CURRENT_MIX, mix);
  const loadCurrentMix = () => loadData(STORAGE_KEYS.CURRENT_MIX, []);
  
  const saveSelectedDrugType = (type) => saveData(STORAGE_KEYS.SELECTED_DRUG_TYPE, type);
  const loadSelectedDrugType = () => loadData(STORAGE_KEYS.SELECTED_DRUG_TYPE, 'weed');
  
  const saveSelectedSeed = (seed) => saveData(STORAGE_KEYS.SELECTED_SEED, seed);
  const loadSelectedSeed = () => loadData(STORAGE_KEYS.SELECTED_SEED, null);
  
  const savePriceSettings = (settings) => saveData(STORAGE_KEYS.PRICE_SETTINGS, settings);
  const loadPriceSettings = () => loadData(STORAGE_KEYS.PRICE_SETTINGS, {
    salePrice: 0,
    targetMargin: '',
    priceMultiplier: 1,
    packagingType: 'baggies'
  });
  
  // Export all functions
  const StorageService = {
    STORAGE_KEYS,
    saveData,
    loadData,
    clearData,
    clearAllData,
    saveMixes,
    loadMixes,
    saveProductionPlans,
    loadProductionPlans,
    saveSalesHistory,
    loadSalesHistory,
    saveActiveTab,
    loadActiveTab,
    saveStrainView,
    loadStrainView,
    saveFilterOptions,
    loadFilterOptions,
    saveSortSettings,
    loadSortSettings,
    saveCurrentMix,
    loadCurrentMix,
    saveSelectedDrugType,
    loadSelectedDrugType,
    saveSelectedSeed,
    loadSelectedSeed,
    savePriceSettings,
    loadPriceSettings,
    saveSupplyHistory,
    loadSupplyHistory,
    saveSupplies,
    loadSupplies,
    saveSupplyHistory,
    loadSupplyHistory,
    saveDealers,
    loadDealers,
    saveCrewMembers,
    loadCrewMembers,
    saveDealerTransactions,
    loadDealerTransactions,
    saveDailySales,
    loadDailySales

  };
  
  export default StorageService;