// src/hooks/useStartupSeeding.jsx
import { useEffect } from 'react';
import {
  useSeeds,
  useIngredients,
  useStrains,
  useProductionPlans,
  useCrew,
  useDealers,
  useSalesHistory,
  useSupply,
  useSupplyHistory,
  useMixes
} from '@hooks';
import { seedTypes, ingredients, defaultDealers } from '@data/straindata';

const useStartupSeeding = () => {
  const { setSeeds } = useSeeds();
  const { setIngredients } = useIngredients();
  const { setStrains } = useStrains();
  const { setProductionPlans } = useProductionPlans();
  const { setCrew } = useCrew();
  const { setDealers } = useDealers();
  const { setSalesHistory } = useSalesHistory();
  const { setSupply } = useSupply();
  const { setSupplyHistory } = useSupplyHistory();
  const { setMixes } = useMixes();

  useEffect(() => {
    const exampleStrains = [
      { id: 1, name: 'Purple Haze', effects: ['Relaxed', 'Happy'], quality: 'High', price: 400 },
      { id: 2, name: 'White Widow', effects: ['Energetic', 'Creative'], quality: 'Medium', price: 300 },
    ];

    const exampleProductionPlans = [
      { id: 1, strainName: 'Purple Haze', quantity: 100, quality: 'High' },
      { id: 2, strainName: 'White Widow', quantity: 50, quality: 'Medium' },
    ];

    const exampleCrew = [
      { id: 1, name: 'John', role: 'Breeder' },
      { id: 2, name: 'Jane', role: 'Grower' },
    ];

    const exampleSalesHistory = [
      { id: 1, dealer: 'Tommy', amount: 500, date: '2025-04-28' },
      { id: 2, dealer: 'Sara', amount: 750, date: '2025-04-29' },
    ];

    const exampleSupply = [
      { id: 1, item: 'THC Crystal', quantity: 20 },
      { id: 2, item: 'CBD Oil', quantity: 35 },
    ];

    const exampleSupplyHistory = [
      { id: 1, item: 'THC Crystal', quantityAdded: 10, date: '2025-04-27' },
      { id: 2, item: 'CBD Oil', quantityAdded: 15, date: '2025-04-28' },
    ];

    const exampleMixes = [
        {
          id: 1,
          name: 'Super Mix',
          description: 'A potent combination of THC and CBD.',
          ingredients: ['THC Crystal', 'CBD Oil'],
        },
        {
          id: 2,
          name: 'Relaxation Blend',
          description: 'Smooth blend promoting relaxation and stress relief.',
          ingredients: ['CBD Oil', 'Terpene Boost'],
        },
    ];

    setSeeds(seedTypes);
    setIngredients(ingredients);
    setStrains(exampleStrains);
    setProductionPlans(exampleProductionPlans);
    setCrew(exampleCrew);
    setDealers(defaultDealers);
    setSalesHistory(exampleSalesHistory);
    setSupply(exampleSupply);
    setSupplyHistory(exampleSupplyHistory);
    setMixes(exampleMixes);
  }, []);
};

export default useStartupSeeding;
