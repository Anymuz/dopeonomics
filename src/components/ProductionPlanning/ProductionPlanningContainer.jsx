// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import { useProductionPlans } from '@hooks';
import ProductionPlanningTab from './ProductionPlanningTab';

const ProductionPlanningContainer = () => {
  const { productionPlans } = useProductionPlans();

  return (
    <ProductionPlanningTab productionPlans={productionPlans} />
  );
};

export default ProductionPlanningContainer;