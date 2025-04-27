// File: src/components/StrainCreator.jsx
import '../styles/StrainCreator.css';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useGameStore from '../stores/GameStore.jsx';
import {
  CheckCircle,
  FlaskConical,
  Factory,
  Heart,
  Users,
  Package,
  Beaker,
  BarChart2
} from 'lucide-react';

// Components
import AutoSave from './AutoSave.jsx';
import DopeyHeader from './DopeyHeader.jsx';
import CombinedStrainsTab from './CombinedStrainsTab.jsx';
import EffectBuilderTab from './EffectBuilderTab.jsx';
import ProductionPlanningTab from './ProductionPlanningTab.jsx';
import SalesHistoryTab from './SalesHistoryTab.jsx';
import CrewManagementTab from './CrewManagementTab.jsx';
import SupplyManagementTab from './SupplyManagementTab.jsx';
import { SeedSelector } from './IngredientComponents.jsx';
import { CurrentMixDisplay } from './MixDisplayComponents.jsx';
import { SequentialIngredientsSelector } from './SequentialIngredientsSelector.jsx';
import { PackagingSelector, PriceMarginInputs } from './PackagingComponents.jsx';
import { ProfitInfoDisplay } from './ProfitComponents.jsx';
import { DrugTypeSelector } from './DrugTypeSelector.jsx';
import { NamePromptModal } from './NamePromptModal.jsx';

// Data & pricing
import {
  seedTypes,
  ingredients,
  additiveEffects,
  effectColors,
  drugTypes,
  calculateStrainEffects
} from '../data/straindata.jsx';
/* eslint-disable no-unused-vars */
import {
  calculateRecommendedPrice,
  calculateTotalUnits,
  calculateTotalCost,
  calculateProfit,
  calculateProfitMargin,
  calculateTotalBatchProfit,
  calculatePackagingProfit,
  calculateSalePriceFromMargin,
  calculateProductionPlan
} from '../data/pricing.jsx';

const StrainCreator = () => {
  // Pull everything from global store
  const {
    settings,
    settings:{
        selectedSeed,
        selectedDrugType,
        currentMix,
        priceSettings: { salePrice, targetMargin, priceMultiplier, packagingType },
        sortSettings: { column: sortColumn, direction: sortDirection },
        filterOptions,
        activeTab
      },
    addProductionPlan,
    updateProductionPlan,
    removeProductionPlan,
    mixes,
    productionPlans,
    salesHistory,
    addDailySale,
    dealers,
    crewMembers,
    dealerTransactions,
    supplies,
    supplyHistory,
    updateSettings,
    setMixes,
    setProductionPlans,
    setSalesHistory,
    setDealers,
    setCrewMembers,
    setDealerTransactions,
    setSupplies,
    setSupplyHistory,
    resetGame
  } = useGameStore();

  // local Price state (prevent endless loop)
  const {
    salePrice: savedSalePrice,
    targetMargin: savedTargetMargin,
    priceMultiplier: savedMultiplier,
    packagingType: savedPackagingType
  } = settings.priceSettings;

  // local copies
  const [localSalePrice, setLocalSalePrice] = useState(savedSalePrice);
  const [localTargetMargin, setLocalTargetMargin] = useState(savedTargetMargin);
  const [localMultiplier, setLocalMultiplier] = useState(savedMultiplier);
  const [localPackagingType, setLocalPackagingType] = useState(savedPackagingType);

  // local UI state
  const [currentEffects, setCurrentEffects] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // effect: reset mix when seed or drugType changes
  useEffect(() => {
    updateSettings('currentMix', []);
    if (selectedSeed) {
      setCurrentEffects([selectedSeed.effect]);
      setMixingHistory([
        {
          step: 0,
          ingredient: 'Base Seed',
          effectsBefore: [],
          effectsAfter: [selectedSeed.effect],
          changes: [`Added ${selectedSeed.effect}`]
        }
      ]);
      const rec = calculateRecommendedPrice([selectedSeed.effect], selectedDrugType);
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: rec });
    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeed, selectedDrugType, updateSettings]);

  // ingredient management
  const addIngredient = ingredient => {
    const updated = [...currentMix, ingredient];
    updateSettings('currentMix', updated);
    if (selectedSeed) {
      const result = calculateStrainEffects(selectedSeed.effect, updated);
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      const rec = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: rec });
    }
  };

  const removeLastIngredient = () => {
    const updated = currentMix.slice(0, -1);
    updateSettings('currentMix', updated);
    if (selectedSeed) {
      const result = calculateStrainEffects(selectedSeed.effect, updated);
      setCurrentEffects(result.finalEffects);
      setMixingHistory(result.mixingHistory);
      const rec = calculateRecommendedPrice(result.finalEffects, selectedDrugType);
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: rec });
    }
  };

  const resetMix = () => {
    updateSettings('currentMix', []);
    if (selectedSeed) {
      setCurrentEffects([selectedSeed.effect]);
      setMixingHistory([
        {
          step: 0,
          ingredient: 'Base Seed',
          effectsBefore: [],
          effectsAfter: [selectedSeed.effect],
          changes: [`Added ${selectedSeed.effect}`]
        }
      ]);
      const rec = calculateRecommendedPrice([selectedSeed.effect], selectedDrugType);
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: rec });
    }
  };
  const finalizeMix = () => {
    if (selectedSeed && currentMix.length) {
      setShowNamePrompt(true);
    }
  };

  // pricing calculations
  const getTotalCost = useCallback(() => calculateTotalCost(selectedSeed, currentMix), [selectedSeed, currentMix]);
  const getProfit = useCallback(() => calculateProfit(salePrice, selectedSeed, currentMix), [salePrice, selectedSeed, currentMix]);
  const getProfitMargin = useCallback(() => calculateProfitMargin(salePrice, selectedSeed, currentMix), [salePrice, selectedSeed, currentMix]);
  const getTotalBatchProfit = useCallback(() => calculateTotalBatchProfit(salePrice, selectedSeed, currentMix, priceMultiplier), [salePrice, selectedSeed, currentMix, priceMultiplier]);
  const getPackagingProfit = useCallback(() => calculatePackagingProfit(salePrice, selectedSeed, currentMix, packagingType), [salePrice, selectedSeed, currentMix, packagingType]);
  const getTotalUnits = useCallback(() => calculateTotalUnits(selectedSeed), [selectedSeed]);

  const handleSalePriceFromMargin = () => {
    if (targetMargin && getTotalCost() > 0) {
      const p = calculateSalePriceFromMargin(targetMargin, selectedSeed, currentMix);
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: p });
    }
  };

  const handleMarginFromSalePrice = () => {
    if (salePrice > 0 && getTotalCost() > 0) {
      const m = ((salePrice - getTotalCost()) / salePrice) * 100;
      updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, targetMargin: m.toFixed(2) });
    }
  };

  // save mix
  const saveMix = name => {
    if (!name.trim()) return;
    const nm = name.trim();
    const mixObj = {
      id: Date.now(),
      name: nm,
      seed: selectedSeed,
      drugType: selectedDrugType,
      totalUnits: getTotalUnits(),
      ingredients: [...currentMix],
      effects: [...currentEffects],
      mixingSequence: currentMix.map(i => i.name),
      salePrice: Math.round(salePrice),
      totalCost: getTotalCost(),
      profit: getProfit(),
      profitMargin: getProfitMargin(),
      priceMultiplier,
      packagingType,
      favorite: false,
      dateCreated: new Date().toISOString()
    };
    setMixes([...mixes, mixObj]);
    resetMix();
    updateSettings('selectedSeed', null);
    updateSettings('priceSettings', { ...{ salePrice, targetMargin, priceMultiplier, packagingType }, salePrice: 0 });
  };
  
  // Enhanced production plan creation with proper ingredient calculations
  const createEnhancedProductionPlan = (strain, quantity) => {
    // Count how many times each ingredient appears in the mix sequence
    const ingredientCounts = {};
    if (strain.mixingSequence) {
      strain.mixingSequence.forEach(name => {
        ingredientCounts[name] = (ingredientCounts[name] || 0) + 1;
      });
    } else if (strain.ingredients) {
      strain.ingredients.forEach(ing => {
        const qty = ing.quantity || 1;
        ingredientCounts[ing.name] = (ingredientCounts[ing.name] || 0) + qty;
      });
    }

    // Build the ingredient list
    const needs = [];
    const seedsNeeded = Math.ceil(quantity / calculateTotalUnits(strain.seed));
    needs.push({
      name: strain.seed.name,
      quantity: seedsNeeded,
      totalCost: strain.seed.cost * seedsNeeded
    });

    // Drug-specific extras
    if (strain.drugType === 'meth') {
      needs.push(
        { name: 'Acid', quantity: seedsNeeded, totalCost: 40 * seedsNeeded },
        { name: 'Red Phosphorus', quantity: seedsNeeded, totalCost: 40 * seedsNeeded }
      );
    } else if (strain.drugType === 'cocaine') {
      needs.push({
        name: 'Coca Leaves',
        quantity: 20 * seedsNeeded,
        totalCost: (strain.seed.cost / 10) * 20 * seedsNeeded
      });
      if (!ingredientCounts['Gasoline']) {
        needs.push({ name: 'Gasoline', quantity: seedsNeeded, totalCost: 30 * seedsNeeded });
      }
    }

    // Add the rest
    Object.entries(ingredientCounts).forEach(([name, count]) => {
      const ing = strain.ingredients.find(i => i.name === name);
      if (ing) {
        needs.push({
          name,
          quantity: count * quantity,
          totalCost: ing.cost * count * quantity
        });
      }
    });

    // Packaging
    const packagingNeeded = packagingType === 'baggies'
      ? { type: 'baggies', quantity, cost: quantity }
      : { type: 'jars', quantity: Math.ceil(quantity / 5), cost: Math.ceil(quantity / 5) * 3 };

    // Totals
    const productionCost = needs.reduce((sum, i) => sum + i.totalCost, 0) + packagingNeeded.cost;
    const expectedRevenue = strain.salePrice * quantity;
    const expectedProfit = expectedRevenue - productionCost;

    return {
      id: Date.now(),
      strainId: strain.id,
      strainName: strain.name,
      drugType: strain.drugType || 'weed',
      plannedQuantity: quantity,
      status: 'planned',
      dateCreated: new Date().toISOString(),
      dateSold: null,
      totalIngredientNeeds: needs,
      packagingNeeded,
      productionCost,
      salePrice: strain.salePrice,
      expectedRevenue,
      expectedProfit,
      effects: strain.effects,
      productionStage: 'plan'
    };
  };

    // production planning
  const addToProduction = strainId => {
    const strain = mixes.find(m => m.id === strainId);
    if (!strain) return;
    const qty = calculateTotalUnits(strain.seed);
    const plan = createEnhancedProductionPlan(strain, qty);
    addProductionPlan(plan);
    updateSettings('activeTab', 'production');
  };

  const storeUpdateProductionPlan = (planId, updates) => {
    updateProductionPlan(planId, updates);
  };

  const markAsSold = planId => {
    const plan = productionPlans.find(p => p.id === planId);
    if (!plan || plan.status === 'sold') return;
    const sale = {
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
  }
    // update status in store
    updateProductionPlan(planId, { status: 'sold', dateSold: sale.dateSold });
    // add to daily sales
    addDailySale(sale);
  };

  const storeRemoveProductionPlan = planId => {
    removeProductionPlan(planId);
  };

  const reproduceProductionPlan = (originalPlan, qty, quality) => {
    const strain = mixes.find(m => m.id === originalPlan.strainId);
    if (!strain) return;
    const newPlan = calculateProductionPlan(strain, qty, quality);
    addProductionPlan(newPlan);
    updateSettings('activeTab', 'production');
  };

  // filtering & sorting
  const filteredAndSortedMixes = useMemo(() => {
    let list = mixes.filter(mix => {
      if (filterOptions.name && !mix.name.toLowerCase().includes(filterOptions.name.toLowerCase())) return false;
      if (filterOptions.drugType && mix.drugType !== filterOptions.drugType) return false;
      if (filterOptions.seedType && !mix.seed.name.toLowerCase().includes(filterOptions.seedType.toLowerCase())) return false;
      if (filterOptions.effect && !mix.effects.some(e => e.toLowerCase().includes(filterOptions.effect.toLowerCase()))) return false;
      return true;
    });
    const { column, direction } = { column: sortColumn, direction: sortDirection };
    return list.sort((a, b) => {
      let av = column === 'seed' ? a.seed.name : a[column];
      let bv = column === 'seed' ? b.seed.name : b[column];
      if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      if (av < bv) return direction === 'asc' ? -1 : 1;
      if (av > bv) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [mixes, filterOptions, sortColumn, sortDirection]);

  const handleSort   = col => updateSettings('sortSettings', { column: col, direction: sortColumn === col && sortDirection === 'asc' ? 'desc' : 'asc' });
  const handleFilter = opts => updateSettings('filterOptions', opts);
  const handleTab    = tab  => updateSettings('activeTab', tab);
  const handleManualSave = () => {/* stub for AutoSave */};

  // Render Contennt
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-5xl mx-auto p-4">
        <DopeyHeader />

        {/* tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {['creator','effects','saved','production','sales','crew','supply'].map(t => (
            <button
              key={t}
              onClick={() => handleTab(t)}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab===t
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab==='creator' && (
          <div className="strain-card">
            <DrugTypeSelector selectedDrugType={selectedDrugType} onSelectDrugType={dt=>updateSettings('selectedDrugType',dt)} />
            <SeedSelector seedTypes={seedTypes} selectedSeed={selectedSeed} onSelectSeed={s=>updateSettings('selectedSeed',s)} selectedDrugType={selectedDrugType}/>
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
            <CurrentMixDisplay
              selectedSeed={selectedSeed}
              currentMix={currentMix}
              currentEffects={currentEffects}
              effectColors={effectColors}
              additiveEffects={additiveEffects}
              calculateTotalCost={getTotalCost}
              drugTypes={drugTypes}
            />
            <PackagingSelector packagingType={localPackagingType} setPackagingType={setLocalPackagingType} />
            <PriceMarginInputs
              salePrice={localSalePrice}
              targetMargin={localTargetMargin}
              priceMultiplier={localMultiplier}
              setPriceMultiplier={setLocalMultiplier}
              setSalePrice={setLocalSalePrice}
              setTargetMargin={setLocalTargetMargin}
              calculateMarginFromSalePrice={handleMarginFromSalePrice}
              calculateSalePriceFromMargin={handleSalePriceFromMargin}
              currentEffects={currentEffects}
              productType={selectedDrugType}
            />
            {selectedSeed && salePrice>0 && (
              <ProfitInfoDisplay
                calculateProfit={getProfit}
                calculateProfitMargin={getProfitMargin}
                calculateTotalBuddyProfit={getTotalBatchProfit}
                calculatePackagingProfit={getPackagingProfit}
                priceMultiplier={localMultiplier}
                packagingType={localPackagingType}
              />
            )}
            <button className="btn-primary mt-4" onClick={finalizeMix} disabled={!selectedSeed||!currentMix.length||salePrice<=0}>
              <CheckCircle className="mr-2 w-5 h-5"/>Save Creation
            </button>
          </div>
        )}

        {activeTab==='effects' && (
          <EffectBuilderTab
            seedTypes={seedTypes}
            ingredients={ingredients}
            effectColors={effectColors}
            drugTypes={drugTypes}
            calculateStrainEffects={calculateStrainEffects}
          />
        )}

        {activeTab==='saved' && (
          <CombinedStrainsTab
            mixes={filteredAndSortedMixes}
            filterOptions={filterOptions}
            setFilterOptions={handleFilter}
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            removeMix={id=>setMixes(mixes.filter(m=>m.id!==id))}
            addToProduction={addToProduction}
            toggleFavorite={id=>setMixes(mixes.map(m=>m.id===id?{...m,favorite:!m.favorite}:m))}
            effectColors={effectColors}
            drugTypes={drugTypes}
          />
        )}

        {activeTab==='production' && (
          <ProductionPlanningTab
            strains={mixes}
            productionPlans={productionPlans}
            updateProductionPlan={updateProductionPlan}
            markAsSold={markAsSold}
            removeProductionPlan={removeProductionPlan}
            reproduceProductionPlan={reproduceProductionPlan}
            drugTypes={drugTypes}
            dealers={dealers}
            dailySales={salesHistory}
            setDailySales={setSalesHistory}
            dealerTransactions={dealerTransactions}
            setDealerTransactions={setDealerTransactions}
          />
        )}

        {activeTab==='sales' && (
          <SalesHistoryTab
            salesHistory={salesHistory}
            reproduceProductionPlan={reproduceProductionPlan}
            drugTypes={drugTypes}
          />
        )}

        {activeTab==='crew' && (
          <CrewManagementTab
            dealers={dealers}
            setDealers={setDealers}
            crewMembers={crewMembers}
            setCrewMembers={setCrewMembers}
            dealerTransactions={dealerTransactions}
            setDealerTransactions={setDealerTransactions}
            dailySales={salesHistory}
            setDailySales={setSalesHistory}
            drugTypes={drugTypes}
          />
        )}

        {activeTab==='supply' && (
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
        )}

        <NamePromptModal
          isOpen={showNamePrompt}
          onClose={()=>setShowNamePrompt(false)}
          onSave={saveMix}
          initialName=""
        />

        <AutoSave
          gameState={{
            mixes,
            productionPlans,
            salesHistory,
            activeTab,
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
            dealerTransactions
          }}
          onManualSave={handleManualSave}
        />
      </div>
    </div>
  );
};

export default StrainCreator;
