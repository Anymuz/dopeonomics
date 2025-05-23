// src/components/StrainCreator/StrainCreatorContainer.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import StrainCreatorTab from './StrainCreatorTab';
import NamePromptModal from './NamePromptModal';
import { useMixes, useSettings } from '@hooks';
import { drugTypes, seedTypes, ingredients as staticIngredients } from '@data/straindata';
import {
  calculateRecommendedPrice,
  calculateProfit,
  calculateProfitMargin,
  calculateTotalBatchProfit,
  calculatePackagingProfit
} from '@utils/pricing';

const StrainCreatorContainer = () => {
  const { selectedDrugType, setSelectedDrugType, selectedSeed, setSelectedSeed } = useSettings();
  const { mixes, addMix } = useMixes();

  const [ingredients] = useState(staticIngredients);
  const [currentMix, setCurrentMix] = useState([]);
  const [mixingHistory, setMixingHistory] = useState([]);
  const [currentEffects, setCurrentEffects] = useState([]);
  const [packagingType, setPackagingType] = useState('baggies');
  const [priceMultiplier, setPriceMultiplier] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [targetMargin, setTargetMargin] = useState(0.5);
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [pendingMix, setPendingMix] = useState(null);

  // Seed selection initializes base effects and step 0
  useEffect(() => {
    if (selectedSeed) {
      const baseEffect = [selectedSeed.effect];
      setCurrentEffects(baseEffect);
      setMixingHistory([[...baseEffect]]); // Always reset with Step 0
      setCurrentMix([]);
    }
  }, [selectedSeed]);

  // Update price when effects or seed change
  useEffect(() => {
    if (selectedDrugType && selectedSeed && currentEffects.length) {
      const recommended = calculateRecommendedPrice(currentEffects, selectedDrugType);
      if (recommended !== salePrice) {
        setSalePrice(recommended);
      }
    }
  }, [currentEffects, selectedDrugType, selectedSeed]);

  // Update margin when price changes
  useEffect(() => {
    if (salePrice > 0 && selectedSeed) {
      const margin = calculateProfitMargin(salePrice, selectedSeed, currentMix);
      setTargetMargin(parseFloat(margin));
    }
  }, [salePrice, selectedSeed, currentMix]);

  const addIngredient = (ingredient) => {
    const newMix = [...currentMix, ingredient];
    const prevEffects = [...currentEffects];
    const interactions = ingredient.interactions || [];
    let newEffects = [...prevEffects];

    // Apply interactions
    interactions.forEach(({ if: triggerEffect, replaceWith }) => {
      const index = newEffects.indexOf(triggerEffect);
      if (index !== -1) {
        newEffects[index] = replaceWith;
      }
    });

    // Add default effect only if not present and within limit
    if (!newEffects.includes(ingredient.defaultEffect)) {
      newEffects.push(ingredient.defaultEffect);
    }

    // Cap at 8 effects
    if (newEffects.length > 8) {
      newEffects = newEffects.slice(0, 8);
    }

    setCurrentMix(newMix);
    setMixingHistory([...mixingHistory, [...newEffects]]); // FIXED LINE
    setCurrentEffects(newEffects);
  };

  const removeLastIngredient = () => {
    const updatedMix = currentMix.slice(0, -1);
    const updatedHistory = mixingHistory.slice(0, -1);
    const restoredEffects = updatedHistory[updatedHistory.length - 1] || [];

    setCurrentMix(updatedMix);
    setMixingHistory(updatedHistory);
    setCurrentEffects(restoredEffects);
  };

  const resetMix = () => {
    if (selectedSeed) {
      const base = [selectedSeed.effect];
      setCurrentEffects(base);
      setMixingHistory([[...base]]);
    } else {
      setCurrentEffects([]);
      setMixingHistory([]);
    }

    setCurrentMix([]);
  };

  const finalizeMix = () => {
  if (!selectedSeed || currentMix.length === 0 || salePrice <= 0) return;
    setPendingMix({
      id: Date.now(),
      seed: selectedSeed,
      drugType: selectedDrugType,
      ingredients: currentMix,
      effects: currentEffects,
      packagingType,
      salePrice,
      totalCost: getTotalCost(),
    });
    setIsNamingModalOpen(true);
  };

  const handleConfirmName = (name) => {
    const mixToSave = { ...pendingMix, name };
    addMix(mixToSave);
    setIsNamingModalOpen(false);
    setPendingMix(null);
    resetMix();
    setSelectedSeed(null);
  };

  const getTotalCost = () => {
    const baseCost = selectedSeed ? selectedSeed.cost : 0;
    const ingredientCost = currentMix.reduce((sum, i) => sum + (i.cost || 0), 0);
    return baseCost + ingredientCost;
  };

  const getProfit = () => calculateProfit(salePrice, selectedSeed, currentMix);
  const getProfitMargin = () => calculateProfitMargin(salePrice, selectedSeed, currentMix);
  const getTotalBatchProfit = () => calculateTotalBatchProfit(salePrice, selectedSeed, currentMix, priceMultiplier);
  const getPackagingProfit = () => calculatePackagingProfit(salePrice, selectedSeed, currentMix, packagingType);

  return (
    <>
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

      <NamePromptModal
        isOpen={isNamingModalOpen}
        onClose={() => setIsNamingModalOpen(false)}
        onConfirm={handleConfirmName}
      />
    </>
  );
};

export default StrainCreatorContainer;
