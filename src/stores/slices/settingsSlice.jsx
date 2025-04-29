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
    setActiveTab: (tab) => set((state) => ({
        settings: {
          ...state.settings,
          activeTab: tab,
        },
    })),
    getSettings: () => get().settings,
    setSettings: (settings) => set({ settings }),
    updateSettings: (path, value) => set((state) => {
        const newSettings = { ...state.settings };
        const keys = path.split('.');
        let obj = newSettings;
        while (keys.length > 1) obj = obj[keys.shift()];
        obj[keys[0]] = value;
        return { settings: newSettings };
    }),
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
