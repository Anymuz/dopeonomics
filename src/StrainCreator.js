import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CheckCircle,
  FlaskConical,
  Factory,
  Star,
  Home,
  Users,
  Package,
  BarChart2
} from 'lucide-react';

// Import existing components
import StorageService from './StorageService';
import AutoSave from './AutoSave';
import DopeyHeader from './DopeyHeader';

// Import components
import { ProductionPlanningTab } from './ProductionPlanningComponents';
import { SeedSelector } from './IngredientComponents';
import { CurrentMixDisplay } from './MixDisplayComponents';
import { SequentialIngredientsSelector } from './SequentialIngredientsSelector';
import { PackagingSelector, PriceMarginInputs} from './PackagingComponents';
import { ProfitInfoDisplay } from './ProfitComponents';
import { DrugTypeSelector } from './DrugTypeSelector';
import { NamePromptModal } from './NamePromptModal';
import { SavedStrainsTable } from './SavedStrainsTable';
import SalesHistoryTab from './SalesHistoryTab';
import CrewManagementTab from './CrewManagementTab';
import SupplyManagementTab from './SupplyManagementTab';

// Import data
import { 
  seedTypes, 
  ingredients, 
  additiveEffects, 
  effectColors,
  drugTypes,
  calculateStrainEffects
} from './straindata';

// Import pricing functions
import {
  calculateRecommendedPrice,
  calculateTotalUnits,
  calculateTotalCost,
  calculateProfit,
  calculateProfitMargin,
  calculateTotalBatchProfit,
  calculatePackagingProfit,
  calculateSalePriceFromMargin,
  calculateProductionPlan,
} from './pricing';

const StrainCreator = () => {
  // State for strain creation
  const [selectedSeed, setSelectedSeed] = useState(StorageService.loadSelectedSeed());
  const [selectedDrugType, setSelectedDrugType] = useState(StorageService.loadSelectedDrugType());
  const [currentMix, setCurrentMix] = useState(StorageService.loadCurrentMix() || []);
  const [currentEffects, setCurrentEffects] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [mixes, setMixes] = useState(StorageService.loadMixes() || []);
  
  // Pricing and display states
  const priceSettings = StorageService.loadPriceSettings() || {
    salePrice: 0,
    targetMargin: '',
    priceMultiplier: 1,
    packagingType: 'baggies'
  };
  const [salePrice, setSalePrice] = useState(priceSettings.salePrice);
  const [targetMargin, setTargetMargin] = useState(priceSettings.targetMargin);
  const [priceMultiplier, setPriceMultiplier] = useState(priceSettings.priceMultiplier);
  const [packagingType, setPackagingType] = useState(priceSettings.packagingType);
  
  // UI states
  const [activeTab, setActiveTab] = useState(StorageService.loadActiveTab() || 'creator');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [strainView, setStrainView] = useState(StorageService.loadStrainView() || 'all');
  
  // Supply management states
  const [supplies, setSupplies] = useState(StorageService.loadSupplies() || {
    seeds: {},
    ingredients: {},
    packaging: { baggies: 0, jars: 0 }
  });
  const [supplyHistory, setSupplyHistory] = useState(StorageService.loadSupplyHistory() || []);
  
  // Sort and filter states
  const sortSettings = StorageService.loadSortSettings() || { column: 'name', direction: 'asc' };
  const [sortColumn, setSortColumn] = useState(sortSettings.column);
  const [sortDirection, setSortDirection] = useState(sortSettings.direction);
  const [filterOptions, setFilterOptions] = useState(StorageService.loadFilterOptions() || {
    name: '',
    seedType: '',
    drugType: '',
    effect: ''
  });
  
  // Production and sales states
  const [productionPlans, setProductionPlans] = useState(StorageService.loadProductionPlans() || []);
  const [salesHistory, setSalesHistory] = useState(StorageService.loadSalesHistory() || []);

  // Crew management states
  const [dealers, setDealers] = useState(StorageService.loadDealers() || []);
  const [crewMembers, setCrewMembers] = useState(StorageService.loadCrewMembers() || {
    botanist: 0,
    cleaner: 0,
    handler: 0,
    chemist: 0
  });
  const [dealerTransactions, setDealerTransactions] = useState(StorageService.loadDealerTransactions() || []);
  const [dailySales, setDailySales] = useState(StorageService.loadDailySales() || []);

  // Reset everything when drug type changes
  useEffect(() => {
    setSelectedSeed(null);
    setCurrentMix([]);
    setCurrentEffects([]);
    setMixingHistory([]);
    StorageService.saveSelectedDrugType(selectedDrugType);
  }, [selectedDrugType]);

  // Update effects when seed changes
  useEffect(() => {
    if (selectedSeed) {
      // Reset mix when seed changes
      setCurrentMix([]);
      
      const seedEffect = selectedSeed.effect;
      setCurrentEffects([seedEffect]);
      
      // Initialize mixing history with just the seed
      setMixingHistory([{
        step: 0,
        ingredient: "Base Seed",
        effectsBefore: [],
        effectsAfter: [seedEffect],
        changes: [`Added ${seedEffect}`]
      }]);
      
      StorageService.saveSelectedSeed(selectedSeed);
      
      // Update recommended price based on the seed's effect
      const recommendedPrice = calculateRecommendedPrice([seedEffect], selectedDrugType);
      setSalePrice(recommendedPrice);
    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
    }
  }, [selectedSeed, selectedDrugType]);

  // Sequential ingredient addition method
  const addIngredient = (ingredient) => {
    // Add ingredient to the current mix
    const updatedMix = [...currentMix, ingredient];
    setCurrentMix(updatedMix);
    
    // Recalculate effects using the sequential approach
    if (selectedSeed) {
      const result = calculateStrainEffects(
        selectedSeed.effect, 
        updatedMix
      );
      
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      
      // Update recommended price
      const recommendedPrice = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      setSalePrice(recommendedPrice);
      
      // Save to storage
      StorageService.saveCurrentMix(updatedMix);
    }
  };
  
  // Method to remove the last ingredient added
  const removeLastIngredient = () => {
    if (currentMix.length === 0) return;
    
    const updatedMix = currentMix.slice(0, currentMix.length - 1);
    setCurrentMix(updatedMix);
    
    // Recalculate effects using the sequential approach
    if (selectedSeed) {
      const result = calculateStrainEffects(
        selectedSeed.effect, 
        updatedMix
      );
      
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      
      // Update recommended price
      const recommendedPrice = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      setSalePrice(recommendedPrice);
      
      // Save to storage
      StorageService.saveCurrentMix(updatedMix);
    }
  };
  
  // Method to reset the mix completely
  const resetMix = () => {
    setCurrentMix([]);
    
    if (selectedSeed) {
      setCurrentEffects([selectedSeed.effect]);
      setMixingHistory([{
        step: 0,
        ingredient: "Base Seed",
        effectsBefore: [],
        effectsAfter: [selectedSeed.effect],
        changes: [`Added ${selectedSeed.effect}`]
      }]);
      
      // Update recommended price
      const recommendedPrice = calculateRecommendedPrice([selectedSeed.effect], selectedDrugType);
      setSalePrice(recommendedPrice);
      
      // Save to storage
      StorageService.saveCurrentMix([]);
    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
    }
  };
  
  // Method to finalize the mix and proceed to pricing/saving
  const finalizeMix = () => {
    if (currentMix.length > 0 && selectedSeed) {
      // Activate the save prompt
      setShowNamePrompt(true);
    }
  };

  // Local wrapper functions for pricing calculations
  const getTotalCost = useCallback(() => {
    return calculateTotalCost(selectedSeed, currentMix);
  }, [selectedSeed, currentMix]);
  
  const getProfit = useCallback(() => {
    return calculateProfit(salePrice, selectedSeed, currentMix);
  }, [salePrice, selectedSeed, currentMix]);
  
  const getProfitMargin = useCallback(() => {
    return calculateProfitMargin(salePrice, selectedSeed, currentMix);
  }, [salePrice, selectedSeed, currentMix]);
  
  const getTotalBatchProfit = useCallback(() => {
    return calculateTotalBatchProfit(salePrice, selectedSeed, currentMix, priceMultiplier);
  }, [salePrice, selectedSeed, currentMix, priceMultiplier]);
  
  const getPackagingProfit = useCallback(() => {
    return calculatePackagingProfit(salePrice, selectedSeed, currentMix, packagingType);
  }, [salePrice, selectedSeed, currentMix, packagingType]);
  
  const getTotalUnits = useCallback(() => {
    return calculateTotalUnits(selectedSeed);
  }, [selectedSeed]);

  // Price/margin calculation handlers
  const handleCalculateSalePriceFromMargin = () => {
    if (targetMargin && getTotalCost() > 0) {
      const calculatedPrice = calculateSalePriceFromMargin(targetMargin, selectedSeed, currentMix);
      setSalePrice(calculatedPrice);
    }
  };

  const handleCalculateMarginFromSalePrice = () => {
    if (salePrice > 0 && getTotalCost() > 0) {
      const margin = ((salePrice - getTotalCost()) / salePrice) * 100;
      setTargetMargin(isNaN(margin) ? '' : margin.toFixed(2));
    }
  };

  // Save mix function
  const saveMix = (name) => {
    if (!name.trim()) return;

    const newMix = {
      id: Date.now(),
      name: name.trim(),
      seed: selectedSeed,
      drugType: selectedDrugType,
      totalUnits: getTotalUnits(),
      ingredients: [...currentMix],
      effects: [...currentEffects],
      mixingSequence: [...currentMix].map(ing => ing.name), // Store the exact sequence
      salePrice: Math.round(parseFloat(salePrice)),
      totalCost: getTotalCost(),
      profit: getProfit(),
      profitMargin: getProfitMargin(),
      priceMultiplier: priceMultiplier,
      packagingType: packagingType,
      favorite: false,
      dateCreated: new Date().toISOString()
    };

    setMixes(prev => [...prev, newMix]);
    resetMix();
    setSelectedSeed(null);
    setSalePrice(0);
  };

  // Mix management functions
  const removeMix = (id) => {
    setMixes(prev => prev.filter(mix => mix.id !== id));
  };
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    setMixes(prev => prev.map(mix => 
      mix.id === id ? { ...mix, favorite: !mix.favorite } : mix
    ));
  };
  
  // Production planning functions
  const addToProduction = (strainId) => {
    const strain = mixes.find(mix => mix.id === strainId);
    if (!strain) return;
    
    // Default to production based on drug type yield
    const defaultQuantity = calculateTotalUnits(strain.seed);
    const productionPlan = calculateProductionPlan(strain, defaultQuantity);
    
    setProductionPlans(prev => [...prev, productionPlan]);
    // Switch to production tab
    setActiveTab('production');
  };
  
  const updateProductionPlan = (planId, updates) => {
    setProductionPlans(prev => prev.map(plan => {
      if (plan.id !== planId) return plan;
      
      // If quantity changed, recalculate everything
      if (updates.plannedQuantity && updates.plannedQuantity !== plan.plannedQuantity) {
        const strain = mixes.find(mix => mix.id === plan.strainId);
        if (strain) {
          const updatedPlan = calculateProductionPlan(strain, updates.plannedQuantity);
          return { ...updatedPlan, id: plan.id, dateCreated: plan.dateCreated };
        }
      }
      
      return { ...plan, ...updates };
    }));
  };
  
  const markAsSold = (planId) => {
    const plan = productionPlans.find(p => p.id === planId);
    if (!plan || plan.status === 'sold') return;
    
    // Create a sale record
    const saleRecord = {
      id: Date.now(),
      productionId: plan.id,
      strainId: plan.strainId,
      strainName: plan.strainName,
      drugType: plan.drugType,
      quantitySold: plan.plannedQuantity,
      totalRevenue: plan.expectedRevenue,
      totalCost: plan.productionCost,
      profit: plan.expectedProfit,
      dateSold: new Date().toISOString()
    };
    
    // Update production plan status
    updateProductionPlan(planId, { 
      status: 'sold',
      dateSold: saleRecord.dateSold
    });
    
    // Add to sales history
    setSalesHistory(prev => [...prev, saleRecord]);
  };
  
  const removeProductionPlan = (planId) => {
    setProductionPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  const reproduceProductionPlan = (originalPlan, newQuantity, quality) => {
    // Get the original strain information
    const strain = mixes.find(mix => mix.id === originalPlan.strainId);
    
    if (!strain) {
      console.error("Unable to find strain for reproduction");
      return;
    }
    
    // Calculate a new production plan with the updated quantity
    const newPlan = calculateProductionPlan(strain, newQuantity, quality);
    
    // Add the new plan to production plans
    setProductionPlans(prev => [...prev, newPlan]);
    
    // Switch to the production tab
    setActiveTab('production');
  };

  // Sorting and filtering
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    StorageService.saveActiveTab(tab);
  };

  // Filter and sort mixes
  const filteredAndSortedMixes = useMemo(() => {
    // First filter by strain view (all or favorites)
    let filtered = strainView === 'favorites' 
      ? mixes.filter(mix => mix.favorite)
      : [...mixes];
    
    // Then apply additional filters
    filtered = filtered.filter(mix => {
      // Filter by strain name
      if (filterOptions.name && !mix.name.toLowerCase().includes(filterOptions.name.toLowerCase())) {
        return false;
      }
      
      // Filter by drug type
      if (filterOptions.drugType && mix.drugType !== filterOptions.drugType) {
        return false;
      }
      
      // Filter by seed type
      if (filterOptions.seedType && !mix.seed.name.toLowerCase().includes(filterOptions.seedType.toLowerCase())) {
        return false;
      }
      
      // Filter by effect
      if (filterOptions.effect) {
        const hasEffect = mix.effects.some(
          effect => effect.toLowerCase().includes(filterOptions.effect.toLowerCase())
        );
        if (!hasEffect) return false;
      }
      
      return true;
    });
    
    // Sort items
    return filtered.sort((a, b) => {
      if (!sortColumn) return 0;

      let aValue = sortColumn === 'seed' ? a.seed.name : a[sortColumn];
      let bValue = sortColumn === 'seed' ? b.seed.name : b[sortColumn];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [mixes, filterOptions, sortColumn, sortDirection, strainView]);

  // Manual save function for the AutoSave component
  const handleManualSave = useCallback(() => {
    // Save all current state to storage
    StorageService.saveSelectedDrugType(selectedDrugType);
    StorageService.saveCurrentMix(currentMix);
    StorageService.saveSelectedSeed(selectedSeed);
    StorageService.saveMixes(mixes);
    StorageService.saveProductionPlans(productionPlans);
    StorageService.saveSalesHistory(salesHistory);
    StorageService.saveActiveTab(activeTab);
    StorageService.saveStrainView(strainView);
    StorageService.saveFilterOptions(filterOptions);
    StorageService.saveSortSettings({ column: sortColumn, direction: sortDirection });
    StorageService.savePriceSettings({
      salePrice,
      targetMargin,
      priceMultiplier,
      packagingType
    });
    StorageService.saveSupplies(supplies);
    StorageService.saveSupplyHistory(supplyHistory);
    StorageService.saveDealers(dealers);
    StorageService.saveCrewMembers(crewMembers);
    StorageService.saveDealerTransactions(dealerTransactions);
    StorageService.saveDailySales(dailySales);
  }, [
    selectedDrugType, currentMix, selectedSeed, mixes, productionPlans, 
    salesHistory, activeTab, strainView, filterOptions, sortColumn, 
    sortDirection, salePrice, targetMargin, priceMultiplier, packagingType,
    supplies, supplyHistory, dealers, crewMembers, dealerTransactions, dailySales
  ]);

  // Create a game state object to pass to AutoSave
  const gameState = useMemo(() => ({
    mixes,
    productionPlans,
    salesHistory,
    activeTab,
    strainView,
    filterOptions,
    sortSettings: { column: sortColumn, direction: sortDirection },
    priceSettings: { salePrice, targetMargin, priceMultiplier, packagingType },
    currentMix,
    selectedSeed,
    selectedDrugType,
    supplies,
    supplyHistory,
    dealers,
    crewMembers,
    dealerTransactions,
    dailySales
  }), [
    mixes, productionPlans, salesHistory, activeTab, strainView, 
    filterOptions, sortColumn, sortDirection, salePrice, targetMargin, 
    priceMultiplier, packagingType, currentMix, selectedSeed, selectedDrugType,
    supplies, supplyHistory, dealers, crewMembers, dealerTransactions, dailySales
  ]);

  // Save data to storage when it changes
  useEffect(() => {
    StorageService.saveMixes(mixes);
  }, [mixes]);
  
  useEffect(() => {
    StorageService.saveProductionPlans(productionPlans);
  }, [productionPlans]);
  
  useEffect(() => {
    StorageService.saveSalesHistory(salesHistory);
  }, [salesHistory]);
  
  useEffect(() => {
    StorageService.saveActiveTab(activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    StorageService.saveStrainView(strainView);
  }, [strainView]);
  
  useEffect(() => {
    StorageService.saveFilterOptions(filterOptions);
  }, [filterOptions]);
  
  useEffect(() => {
    StorageService.saveSortSettings({ column: sortColumn, direction: sortDirection });
  }, [sortColumn, sortDirection]);
  
  useEffect(() => {
    StorageService.savePriceSettings({
      salePrice,
      targetMargin,
      priceMultiplier,
      packagingType
    });
  }, [salePrice, targetMargin, priceMultiplier, packagingType]);
  
  useEffect(() => {
    StorageService.saveCurrentMix(currentMix);
  }, [currentMix]);
  
  useEffect(() => {
    StorageService.saveSupplies(supplies);
  }, [supplies]);
  
  useEffect(() => {
    StorageService.saveSupplyHistory(supplyHistory);
  }, [supplyHistory]);
  
  useEffect(() => {
    StorageService.saveDealers(dealers);
  }, [dealers]);
  
  useEffect(() => {
    StorageService.saveCrewMembers(crewMembers);
  }, [crewMembers]);
  
  useEffect(() => {
    StorageService.saveDealerTransactions(dealerTransactions);
  }, [dealerTransactions]);
  
  useEffect(() => {
    StorageService.saveDailySales(dailySales);
  }, [dailySales]);

// Render the component
return (
  <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen flex justify-center items-start py-8">
    <div className="w-full max-w-5xl mx-auto p-4">
      <DopeyHeader />
      
      {/* Main Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'creator'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('creator')}
        >
          <FlaskConical className="inline-block mr-1 w-4 h-4" />
          Creator
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'saved' && strainView === 'all'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => {
            handleTabChange('saved');
            setStrainView('all');
          }}
        >
          <Home className="inline-block mr-1 w-4 h-4" />
          Saved Strains
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'saved' && strainView === 'favorites'
              ? 'text-yellow-600 border-b-2 border-yellow-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => {
            handleTabChange('saved');
            setStrainView('favorites');
          }}
        >
          <Star className="inline-block mr-1 w-4 h-4" />
          Favorites
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'production'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('production')}
        >
          <Factory className="inline-block mr-1 w-4 h-4" />
          Production
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'supply'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('supply')}
        >
          <Package className="inline-block mr-1 w-4 h-4" />
          Supplies
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'sales'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('sales')}
        >
          <BarChart2 className="inline-block mr-1 w-4 h-4" />
          Sales
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'crew'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('crew')}
        >
          <Users className="inline-block mr-1 w-4 h-4" />
          Crew
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'creator' ? (
        <div className="strain-card">
          {/* Drug Type Selection */}
          <DrugTypeSelector 
            selectedDrugType={selectedDrugType}
            onSelectDrugType={setSelectedDrugType}
          />

          {/* Seed Type Selection */}
          <SeedSelector 
            seedTypes={seedTypes} 
            selectedSeed={selectedSeed} 
            onSelectSeed={setSelectedSeed}
            selectedDrugType={selectedDrugType}
          />

          {/* Sequential Ingredients Selector */}
          <SequentialIngredientsSelector
            ingredients={ingredients}
            currentMix={currentMix}
            currentEffects={currentEffects}
            mixingHistory={mixingHistory}
            effectColors={effectColors}
            additiveEffects={additiveEffects}
            addIngredient={addIngredient}
            removeLastIngredient={removeLastIngredient}
            resetMix={resetMix}
            finalizeMix={finalizeMix}
            selectedDrugType={selectedDrugType}
          />

          {/* Current Mix Display */}
          <CurrentMixDisplay 
            selectedSeed={selectedSeed}
            currentMix={currentMix}
            currentEffects={currentEffects}
            effectColors={effectColors}
            additiveEffects={additiveEffects}
            calculateTotalCost={getTotalCost}
            drugTypes={drugTypes}
          />

          {/* Packaging Type Selection */}
          <PackagingSelector 
            packagingType={packagingType}
            setPackagingType={setPackagingType}
          />

          {/* Price and Margin Inputs */}
          <PriceMarginInputs 
            salePrice={salePrice} 
            targetMargin={targetMargin}
            priceMultiplier={priceMultiplier}
            setPriceMultiplier={setPriceMultiplier}
            setSalePrice={setSalePrice}
            setTargetMargin={setTargetMargin}
            calculateMarginFromSalePrice={handleCalculateMarginFromSalePrice}
            calculateSalePriceFromMargin={handleCalculateSalePriceFromMargin}
            currentEffects={currentEffects}
            productType={selectedDrugType}
          />

          {/* Profit Information Display */}
          {selectedSeed && salePrice > 0 && (
            <ProfitInfoDisplay 
              calculateProfit={getProfit}
              calculateProfitMargin={getProfitMargin}
              calculateTotalBuddyProfit={getTotalBatchProfit}
              calculatePackagingProfit={getPackagingProfit}
              priceMultiplier={priceMultiplier}
              packagingType={packagingType}
            />
          )}

          {/* Save Mix Button */}
          <button
            className="btn-primary"
            onClick={finalizeMix}
            disabled={!selectedSeed || currentMix.length === 0 || salePrice <= 0}
          >
            <CheckCircle className="mr-2 w-5 h-5" />
            Save Creation
          </button>
        </div>
      ) : activeTab === 'saved' ? (
        <SavedStrainsTable 
          mixes={filteredAndSortedMixes}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          removeMix={removeMix}
          addToProduction={addToProduction}
          toggleFavorite={toggleFavorite}
          effectColors={effectColors}
          drugTypes={drugTypes}
        />
      ) : activeTab === 'production' ? (
        <ProductionPlanningTab
          strains={mixes}
          productionPlans={productionPlans}
          updateProductionPlan={updateProductionPlan}
          markAsSold={markAsSold}
          removeProductionPlan={removeProductionPlan}
          reproduceProductionPlan={reproduceProductionPlan}
          drugTypes={drugTypes}
        />
      ) : activeTab === 'supply' ? (
        <SupplyManagementTab
          supplies={supplies}
          setSupplies={setSupplies}
          supplyHistory={supplyHistory}
          setSupplyHistory={setSupplyHistory}
          productionPlans={productionPlans}
          drugTypes={drugTypes}
          seedTypes={seedTypes}
          ingredients={ingredients}
        />
      ) : activeTab === 'sales' ? (
        <SalesHistoryTab
          salesHistory={salesHistory}
          reproduceProductionPlan={reproduceProductionPlan}
          drugTypes={drugTypes}
        />
      ) : activeTab === 'crew' ? (
        <CrewManagementTab
          dealers={dealers}
          setDealers={setDealers}
          crewMembers={crewMembers}
          setCrewMembers={setCrewMembers}
          dealerTransactions={dealerTransactions}
          setDealerTransactions={setDealerTransactions}
          dailySales={dailySales}
          setDailySales={setDailySales}
          drugTypes={drugTypes}
        />
      ) : null}

      {/* Name Prompt Modal */}
      <NamePromptModal
        isOpen={showNamePrompt}
        onClose={() => setShowNamePrompt(false)}
        onSave={saveMix}
        initialName={''}
      />
    </div>

    {/* AutoSave component */}
    <AutoSave 
      gameState={gameState}
      onManualSave={handleManualSave}
    />
  </div>
);
}

export default StrainCreator;