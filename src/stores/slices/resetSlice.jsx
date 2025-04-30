// src/stores/slices/resetSlice.js
export const createResetSlice = (set) => ({
    resetGame: () => set({
        seeds: [],
        ingredients: [],
        mixes: [],
        productionPlans: [],
        dailySales: [],
        dealerTransactions: [],
        supply: { seeds: {}, ingredients: {}, packaging: { baggies: 0, jars: 0 } },
        supplyHistory: [],
        dealers: [],
        crewMembers: { botanist: 0, cleaner: 0, handler: 0, chemist: 0 },
        collapseState: {},
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
