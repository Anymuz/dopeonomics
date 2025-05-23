// src/stores/slices/settingsSlice.jsx
export const createSettingsSlice = (set, get) => ({
  settings: {
    activeTab: 'creator',
    strainView: 'all',
    filterOptions: { name: '', seedType: '', drugType: '', effect: '' },
    sortSettings: { column: 'name', direction: 'asc' },
    currentMix: null,
    selectedDrugType: 'weed',
    selectedSeed: null,
    priceSettings: { salePrice: 0, targetMargin: '', priceMultiplier: 1, packagingType: 'baggies' },
  },

  // Retrieve full settings object
  getSettings: () => get().settings,

  // Replace full settings object
  setSettings: (settings) => set({ settings }),

  // Deep path updater
  updateSettings: (path, value) => set((state) => {
    const newSettings = { ...state.settings };
    const keys = path.split('.');
    let obj = newSettings;
    while (keys.length > 1) obj = obj[keys.shift()];
    obj[keys[0]] = value;
    return { settings: newSettings };
  }),

  // Individual field setters
  setActiveTab: (tab) => set((state) => ({
    settings: { ...state.settings, activeTab: tab },
  })),

  setSelectedDrugType: (type) => set((state) => ({
    settings: { ...state.settings, selectedDrugType: type },
  })),

  setSelectedSeed: (seed) => set((state) => ({
    settings: { ...state.settings, selectedSeed: seed },
  })),

  // Reset all settings to default
  resetSettings: () => set({
    settings: {
      activeTab: 'creator',
      strainView: 'all',
      filterOptions: { name: '', seedType: '', drugType: '', effect: '' },
      sortSettings: { column: 'name', direction: 'asc' },
      currentMix: null,
      selectedDrugType: 'weed',
      selectedSeed: null,
      priceSettings: { salePrice: 0, targetMargin: '', priceMultiplier: 1, packagingType: 'baggies' },
    },
  }),
});
