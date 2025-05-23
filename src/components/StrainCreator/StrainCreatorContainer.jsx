// src/components/StrainCreator/StrainCreatorContainer.jsx
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import StrainCreatorTab from './StrainCreatorTab';
import { useIngredients, useMixes, useSettings } from '@hooks';
import { drugTypes, seedTypes } from '@data/straindata';
import {
  calculateRecommendedPrice,
  calculateProfit,
  calculateProfitMargin,
  calculateTotalBatchProfit,
  calculatePackagingProfit
} from '@utils/pricing';

const StrainCreatorContainer = () => {
  const { selectedDrugType, setSelectedDrugType, selectedSeed, setSelectedSeed } = useSettings();
  const { ingredients } = useIngredients();
  const { mixes, setMixes } = useMixes();

  const [currentMix, setCurrentMix] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [currentEffects, setCurrentEffects] = useState([]);
  const [packagingType, setPackagingType] = useState('baggies');
  const [priceMultiplier, setPriceMultiplier] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [targetMargin, setTargetMargin] = useState(0.5);

  // Initialize seed effect only on seed select
  useEffect(() => {
    if (selectedSeed && currentMix.length === 0) {
      console.log('[INIT EFFECT FROM SEED]', selectedSeed.effect);
      setCurrentEffects([selectedSeed.effect]);
    }
  }, [selectedSeed]);

  // Recalculate recommended price when effects change
  useEffect(() => {
    if (selectedDrugType && selectedSeed) {
      const recommended = calculateRecommendedPrice(currentEffects, selectedDrugType);
      if (recommended !== salePrice) {
        console.log('[RECOMMENDED PRICE]', { drugType: selectedDrugType, effects: currentEffects, result: recommended });
        setSalePrice(recommended);
      }
    }
  }, [currentEffects, selectedDrugType, selectedSeed]);

  // Recalculate margin on price change
  useEffect(() => {
    if (salePrice > 0 && selectedSeed) {
      const margin = calculateProfitMargin(salePrice, selectedSeed, currentMix);
      console.log('[MARGIN UPDATE]', margin);
      setTargetMargin(parseFloat(margin));
    }
  }, [salePrice, selectedSeed, currentMix]);

  const addIngredient = (ingredient) => {
    const newMix = [...currentMix, ingredient];
    const prevEffects = [...currentEffects];
    const interactions = ingredient.interactions || [];
    const newEffects = [...prevEffects];

    interactions.forEach(({ if: triggerEffect, replaceWith }) => {
      const index = newEffects.indexOf(triggerEffect);
      if (index !== -1) newEffects[index] = replaceWith;
    });

    if (!newEffects.includes(ingredient.defaultEffect)) {
      newEffects.push(ingredient.defaultEffect);
    }

    setCurrentMix(newMix);
    setMixingHistory([...mixingHistory, prevEffects]);
    setCurrentEffects(newEffects);
  };

  const removeLastIngredient = () => {
    setCurrentMix(currentMix.slice(0, -1));
    const previousEffects = mixingHistory[mixingHistory.length - 1] || [];
    setMixingHistory(mixingHistory.slice(0, -1));
    setCurrentEffects(previousEffects);
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
      seed: selectedSeed,
      drugType: selectedDrugType,
      ingredients: currentMix,
      effects: currentEffects,
      packagingType,
      salePrice,
      totalCost: getTotalCost(),
    };

    setMixes([...mixes, mix]);
    resetMix();
    setSelectedSeed(null);
  };

  const getTotalCost = () => {
    const cost = selectedSeed ? selectedSeed.cost : 0;
    const total = currentMix.reduce((sum, i) => sum + (i.cost || 0), 0);
    const totalCost = cost + total;
    console.log('[TOTAL COST]', totalCost, currentMix, selectedSeed);
    return totalCost;
  };

  const getProfit = () => calculateProfit(salePrice, selectedSeed, currentMix);
  const getProfitMargin = () => calculateProfitMargin(salePrice, selectedSeed, currentMix);
  const getTotalBatchProfit = () => calculateTotalBatchProfit(salePrice, selectedSeed, currentMix, priceMultiplier);
  const getPackagingProfit = () => calculatePackagingProfit(salePrice, selectedSeed, currentMix, packagingType);

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
