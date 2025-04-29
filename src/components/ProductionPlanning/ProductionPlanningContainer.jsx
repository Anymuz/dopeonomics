// src/components/ProductionPlanning/ProductionPlanningContainer.jsx
import ProductionPlanningTab from './ProductionPlanningTab';
import { useProductionPlans, useIngredients } from '@hooks';
import { calculateProductionCost } from '@utils/pricing';

const ProductionPlanningContainer = () => {
  const { productionPlans } = useProductionPlans();
  const { ingredients } = useIngredients();

  // Simulate ingredient mapping per strain (real logic should link plans to ingredient sets)
  const enrichedPlans = productionPlans.map((plan) => {
    const relatedIngredients = ingredients.filter((ing) => ing.strain === plan.strainName);
    const productionCost = calculateProductionCost(relatedIngredients);
    return { ...plan, productionCost };
  });

  return <ProductionPlanningTab productionPlans={enrichedPlans} />;
};

export default ProductionPlanningContainer;