// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import ProductionPlanningTab from './ProductionPlanningTab';
import { useProductionPlans } from '@hooks';

const ProductionPlanningContainer = () => {
  const { productionPlans } = useProductionPlans();

  return <ProductionPlanningTab productionPlans={productionPlans} />;
};

export default ProductionPlanningContainer;