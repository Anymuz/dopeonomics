// src/components/StrainCreator/ProfitComponents/PriceMarginInputs.jsx
import React from 'react';

const PriceMarginInputs = ({
  salePrice,
  targetMargin,
  //priceMultiplier,
  //setPriceMultiplier,
  setSalePrice,
  setTargetMargin,
  //calculateMarginFromSalePrice,
  //calculateSalePriceFromMargin,
  //currentEffects,
  //productType
}) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Price and Margin</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label>Sale Price</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Target Margin</label>
          <input
            type="number"
            value={targetMargin}
            onChange={(e) => setTargetMargin(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceMarginInputs;
