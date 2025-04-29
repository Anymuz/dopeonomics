// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import ProductionPlanningTab from './ProductionPlanningTab';
// (future) import { useProductionPlans } from '@hooks';

const ProductionPlanningContainer = () => {
  const productionPlans = [
    { id: 1, name: 'Batch A', quantity: 100, quality: 'High' },
    { id: 2, name: 'Batch B', quantity: 50, quality: 'Medium' },
  ];

  return <ProductionPlanningTab productionPlans={productionPlans} />;
};

export default ProductionPlanningContainer;