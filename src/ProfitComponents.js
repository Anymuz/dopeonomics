import React from 'react';
import { Package, Info } from 'lucide-react';

// Profit Info Display component
export const ProfitInfoDisplay = ({ 
  calculateProfit, 
  calculateProfitMargin, 
  calculateTotalBuddyProfit,
  calculatePackagingProfit,
  priceMultiplier,
  packagingType
}) => (
  <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
    <div className="flex justify-between items-center text-gray-700">
      <div>Profit per bud sold:</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        ${Math.round(calculateProfit())}
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700">
      <div>Profit margin:</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        {calculateProfitMargin()}%
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700">
      <div>Total profit from seed (12 buds):</div>
      <div className={calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600 font-medium'}>
        ${Math.round(calculateProfit() * 12)}
      </div>
    </div>
    <div className="flex justify-between items-center text-gray-700 pt-2 mt-2 border-t border-gray-200">
      <div>Total profit with {priceMultiplier}x multiplier:</div>
      <div className={calculateTotalBuddyProfit() >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
        ${Math.round(calculateTotalBuddyProfit())}
      </div>
    </div>
    
    <div className="pt-4 mt-4 border-t border-gray-200">
      <div className="font-medium mb-2 text-gray-800 flex items-center">
        <Package className="mr-2 w-4 h-4 text-blue-500" />
        Packaging Profit Analysis
      </div>
      <div className="flex justify-between items-center mb-1 text-gray-700">
        <div>Packaging type:</div>
        <div className="font-medium">{packagingType === 'baggies' ? 'Baggies ($1 each)' : 'Jars ($3 per 5 buds)'}</div>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <div>Profit after packaging costs:</div>
        <div className={calculatePackagingProfit() >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          ${Math.round(calculatePackagingProfit())}
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <div>Profit per bud including packaging:</div>
        <div className={calculatePackagingProfit() / 12 >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          ${Math.round(calculatePackagingProfit() / 12)}
        </div>
      </div>
    </div>
    
    <div className="text-sm mt-2 text-gray-500 flex items-center">
      <Info className="inline-block mr-1 w-4 h-4" />
      <span>Note:</span> Packaging costs affect overall profitability
    </div>
  </div>
);