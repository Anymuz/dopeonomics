// ProfitRow - Shared component for displaying profit information in a consistent format.
// Provides standardized row styling with label-value pairs and conditional formatting for profit/loss.

// Importing utility functions for profit color and value formatting.
import { getProfitColor} from '@features/strain-creator/utils/profitDisplayUtils';
import { formatDisplayValue } from '@shared/utils/displayUtils';

// Helper component for displaying profit information rows with consistent styling.
const ProfitRow = ({ label, value, isProfit = true, isBold = false, hasBorder = false }) => {
  const valueColor = getProfitColor(value, isProfit);
  const valueClasses = `${valueColor} ${isBold ? 'font-bold' : 'font-medium'}`;
  const containerClasses = `flex justify-between items-center text-gray-700 ${
    hasBorder ? 'pt-2 mt-2 border-t border-gray-200' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div>{label}</div>
      <div className={valueClasses}>
        {formatDisplayValue(value)}
      </div>
    </div>
  );
};
export default ProfitRow;