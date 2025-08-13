// ProfitInfoDisplay - Comprehensive profit analysis display component.
// Shows profit calculations, margins, packaging analysis, and total profit metrics.

// Importing icons from lucide-react for UI representation.
import { Package, Info } from 'lucide-react';

// Importing shared UI components.
import Alert from '@shared/ui/Alert';

// Importing utility functions for display formatting.
import { formatPackagingDisplay } from '@features/strain-creator/utils/profitDisplayUtils';
import { formatDisplayValue } from '@shared/utils/displayUtils';

// Importing data and primitive components.
import { drugTypes } from '@features/strain-creator/data/strainData';
import { ProfitRow } from '@features/strain-creator/ui/primitives/ProfitRow';

// Main component - keeps related logic together
const ProfitInfoDisplay = ({ 
  calculateProfit, 
  calculateProfitMargin, 
  calculateTotalBuddyProfit,
  calculatePackagingProfit,
  priceMultiplier,
  packagingType,
  drugType = 'weed' // Default to weed for backward compatibility
}) => {
  const profit = calculateProfit();
  const profitMargin = calculateProfitMargin();
  const totalSeedProfit = profit * 12;
  const totalBuddyProfit = calculateTotalBuddyProfit();
  const packagingProfit = calculatePackagingProfit();
  const profitPerBudWithPackaging = packagingProfit / 12;
  
  const unit = drugTypes[drugType]?.unit || 'units';
  const packagingTypeDisplay = formatPackagingDisplay(packagingType, unit);

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      {/* Basic Profit Metrics */}
      <ProfitRow label="Profit per bud sold:" value={profit} />
      <ProfitRow label="Profit margin:" value={formatDisplayValue(profitMargin, { type: 'percentage' })} isProfit={false} />
      <ProfitRow label="Total profit from seed (12 buds):" value={totalSeedProfit} />
      <ProfitRow 
        label={`Total profit per ${priceMultiplier}x stack:`}
        value={totalBuddyProfit}
        isBold={true}
        hasBorder={true}
      />
      
      {/* Packaging Analysis */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="font-medium mb-2 text-gray-800 flex items-center">
          <Package className="mr-2 w-4 h-4 text-blue-500" />
          Packaging Profit Analysis
        </div>
        
        <ProfitRow 
          label="Packaging type:"
          value={packagingTypeDisplay}
          isProfit={false}
        />
        <ProfitRow label="Profit after packaging costs:" value={packagingProfit} />
        <ProfitRow label="Profit per bud including packaging:" value={profitPerBudWithPackaging} />
      </div>
      
      {/* Info Alert */}
      <Alert 
        type="info" 
        icon={Info}
        className="mt-4 text-sm"
      >
        Packaging costs affect overall profitability
      </Alert>
    </div>
  );
};
export default ProfitInfoDisplay;