// src/components/SalesHistory/SalesHistoryContainer.jsx
import SalesHistoryTab from './SalesHistoryTab';
import { useSalesHistory, useProductionPlans } from '@hooks';
import { calculateProfit } from '@/utils/pricing';

const SalesHistoryContainer = () => {
  const { salesHistory } = useSalesHistory();
  const { productionPlans } = useProductionPlans();

  // Simulate linkage of sale to a plan by index or strain name
  const enrichedSales = salesHistory.map((sale, index) => {
    const relatedPlan = productionPlans[index % productionPlans.length]; // naive mapping
    const productionCost = relatedPlan?.productionCost || 100; // fallback cost
    const profit = calculateProfit(sale.amount, productionCost);

    return { ...sale, profit };
  });

  return <SalesHistoryTab salesHistory={enrichedSales} />;
};

export default SalesHistoryContainer;