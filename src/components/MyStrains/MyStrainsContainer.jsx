// src/components/MyStrains/MyStrainsContainer.jsx
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useMixes from '@hooks/mixesHook';
import { useSettings } from '@hooks';
import useProductionPlans from '@hooks/productionPlansHook';
import MyStrainsTab from './MyStrainsTab';
import { calculateProductionCost, calculateRecommendedPrice } from '@/utils/pricing';

const MyStrainsContainer = () => {
  const { mixes, setMixes } = useMixes();
  const { addPlan } = useProductionPlans();
  const { activeTab, setActiveTab } = useSettings();

  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [modalStrain, setModalStrain] = useState(null);

  const toggleFavorite = (mixId) => {
    const updatedMixes = mixes.map((mix) =>
      mix.id === mixId ? { ...mix, favorite: !mix.favorite } : mix
    );
    setMixes(updatedMixes);
  };

  const deleteMix = (mixId) => {
    const updatedMixes = mixes.filter((mix) => mix.id !== mixId);
    setMixes(updatedMixes);
  };

  const createPlannedProduction = (mix) => {
    const batchSize = mix.drugType === 'weed' ? 12 : 10
    const totalCost = calculateProductionCost(mix.ingredients) * batchSize;
    const unitPrice = calculateRecommendedPrice({ effects: mix.effects, quality: mix.quality });
    const salePrice = unitPrice * batchSize;
    
    const newPlan = {
      id: Date.now(), // Temporary unique ID
      name: mix.name,
      strainId: mix.id,
      drugType: mix.drugType,
      effects: mix.effects,
      ingredients: mix.ingredients,
      plannedQuantity: batchSize,
      totalCost,
      salePrice,
      status: 'Planned',
    };
    
    addPlan(newPlan);
    setActiveTab('Production');
  }

  // const openPlanModal = (mix) => {
  //   setModalStrain(mix);
  //   setIsModalOpen(true);
  // };

  return (
    <>
      <MyStrainsTab
        mixes={mixes}
        onFavorite={toggleFavorite}
        onDelete={deleteMix}
        onCreatePlan={createPlannedProduction}
      />
    </>
  );
};

export default MyStrainsContainer;
