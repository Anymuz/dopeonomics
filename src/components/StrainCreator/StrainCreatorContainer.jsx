// src/components/StrainCreator/StrainCreatorContainer.jsx
import React, { useState, useEffect } from 'react';
import StrainCreatorTab from './StrainCreatorTab';
import { useIngredients, useMixes, useSettings } from '@hooks';
import { drugTypes, seedTypes } from '@data/straindata';
import { calculateRecommendedPrice, calculateProfit, calculateProfitMargin } from '@utils/pricing';

const StrainCreatorContainer = () => {
  const { selectedDrugType, setSelectedDrugType, selectedSeed, setSelectedSeed } = useSettings();
  //const { seeds } = useSeeds();
  const { ingredients } = useIngredients();
  const { addMix } = useMixes();

  const [currentMix, setCurrentMix] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [currentEffects, setCurrentEffects] = useState([]);
  const [packagingType, setPackagingType] = useState('baggies');
  const [priceMultiplier, setPriceMultiplier] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [targetMargin, setTargetMargin] = useState(0.5);

  useEffect(() => {
    if (selectedDrugType && selectedSeed) {
      const recommended = calculateRecommendedPrice(selectedDrugType, currentEffects, packagingType);
      setSalePrice(recommended);
    }
  }, [selectedDrugType, selectedSeed, currentEffects, packagingType]);

  const addIngredient = (ingredient) => {
    setCurrentMix([...currentMix, ingredient]);
    setMixingHistory([...mixingHistory, currentEffects]);
    const newEffects = [...currentEffects, ingredient.defaultEffect]; // Add effect logic later
    setCurrentEffects(newEffects);
  };

  const removeLastIngredient = () => {
    const last = [...currentMix];
    last.pop();
    setCurrentMix(last);

    const history = [...mixingHistory];
    const prevEffects = history.pop();
    setMixingHistory(history);
    setCurrentEffects(prevEffects || []);
  };

  const resetMix = () => {
    setCurrentMix([]);
    setMixingHistory([]);
    setCurrentEffects([]);
  };

  const finalizeMix = () => {
    if (!selectedSeed || currentMix.length === 0 || salePrice <= 0) return;
    const mix = {
      id: Date.now(),
      name: selectedSeed.name,
      seed: selectedSeed.name,
      drugType: selectedDrugType,
      ingredients: currentMix,
      effects: currentEffects,
      packaging: packagingType,
      salePrice,
      totalCost: currentMix.reduce((sum, i) => sum + i.cost, selectedSeed.cost),
    };
    addMix(mix);
    resetMix();
    setSelectedSeed(null);
  };

  const getTotalCost = () => currentMix.reduce((sum, i) => sum + i.cost, selectedSeed?.cost || 0);
  const getProfit = () => calculateProfit(getTotalCost(), salePrice);
  const getProfitMargin = () => calculateProfitMargin(getTotalCost(), salePrice);

  const getPackagingProfit = () => getProfit() * (packagingType === 'jars' ? 1.1 : 1.0);
  const getTotalBatchProfit = () => getProfit() * (drugTypes[selectedDrugType]?.yieldAmount || 1);

  return (
    <StrainCreatorTab
      drugTypes={drugTypes}
      seedTypes={seedTypes}
      selectedDrugType={selectedDrugType}
      onSelectDrugType={setSelectedDrugType}
      selectedSeed={selectedSeed}
      setSelectedSeed={setSelectedSeed}
      ingredients={ingredients}
      currentMix={currentMix}
      mixingHistory={mixingHistory}
      currentEffects={currentEffects}
      packagingType={packagingType}
      setPackagingType={setPackagingType}
      salePrice={salePrice}
      setSalePrice={setSalePrice}
      priceMultiplier={priceMultiplier}
      setPriceMultiplier={setPriceMultiplier}
      targetMargin={targetMargin}
      setTargetMargin={setTargetMargin}
      addIngredient={addIngredient}
      removeLastIngredient={removeLastIngredient}
      resetMix={resetMix}
      finalizeMix={finalizeMix}
      getTotalCost={getTotalCost}
      getProfit={getProfit}
      getProfitMargin={getProfitMargin}
      getTotalBatchProfit={getTotalBatchProfit}
      getPackagingProfit={getPackagingProfit}
    />
  );
};

export default StrainCreatorContainer;
