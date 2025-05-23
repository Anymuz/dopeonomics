// src/components/StrainCreator/ProfitComponents/ProfitInfoDisplay.jsx
import React from 'react';

const ProfitInfoDisplay = ({
  calculateProfit,
  calculateProfitMargin,
  calculateTotalBuddyProfit,
  calculatePackagingProfit,
  //priceMultiplier,
  packagingType
}) => {
  return (
    <div className="mb-4 p-3 bg-green-50 rounded border">
      <h4 className="font-semibold mb-2">Profit Summary</h4>
      <p>Profit: ${calculateProfit().toFixed(2)}</p>
      <p>Margin: {(calculateProfitMargin() * 100).toFixed(1)}%</p>
      <p>Total Batch Profit: ${calculateTotalBuddyProfit().toFixed(2)}</p>
      <p>Packaging Profit Boost ({packagingType}): ${calculatePackagingProfit().toFixed(2)}</p>
    </div>
  );
};

export default ProfitInfoDisplay;
