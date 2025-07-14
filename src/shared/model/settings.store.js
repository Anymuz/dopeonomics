// This file is redundent and here as a referece to be removed in later commits.
// There is no purpose to this persistent store.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSettings = {
  activeTab: 'creator', // Stored in NavStore now
  strainView: 'all', // Does nothing
  filterOptions: { name: '', seedType: '', drugType: '', effect: '' }, // Does nothing
  sortSettings: { column: 'name', direction: 'asc' }, // Does nothing
  currentMix: null, // Can be stored in mixes store?
  selectedDrugType: 'weed', /// drugselection store?
  selectedSeed: null, // DrugSelectionStore?
  priceSettings: { salePrice: 0, targetMargin: 0.5, priceMultiplier: 1, packagingType: 'baggies' },
  // Does nothing
};

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      settings: { ...defaultSettings },  // Useless

      getSettings: () => get().settings, // Useless

      setSettings: (settings) => set({ settings }), // Useless

      updateSettings: (path, value) => set((state) => {
        const newSettings = { ...state.settings };
        const keys = path.split('.');
        let obj = newSettings;
        while (keys.length > 1) obj = obj[keys.shift()];
        obj[keys[0]] = value;
        return { settings: newSettings };
      }), // Useless

      setActiveTab: (tab) => set((state) => ({
        settings: { ...state.settings, activeTab: tab },
      })), // used in NavStore

      setSelectedDrugType: (type) => set((state) => ({
        settings: { ...state.settings, selectedDrugType: type },
      })), // used in DrugSelectionStore

      setSelectedSeed: (seed) => set((state) => ({
        settings: { ...state.settings, selectedSeed: seed },
      })), // used in DrugSelectionStore

      resetSettings: () => set({ settings: { ...defaultSettings } }),
    }),
    {
      name: 'settings-store',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);