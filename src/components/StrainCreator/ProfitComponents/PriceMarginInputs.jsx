// src/components/StrainCreator/ProfitComponents/PriceMarginInputs.jsx
import React, { useEffect, useState } from 'react';

const PriceMarginInputs = ({
  salePrice,
  targetMargin,
  setSalePrice,
  setTargetMargin,
}) => {
  const [localMargin, setLocalMargin] = useState(targetMargin);

  useEffect(() => {
    setLocalMargin(targetMargin);
  }, [targetMargin]);

  const handleMarginChange = (e) => {
    const val = parseFloat(e.target.value);
    setLocalMargin(val);
    setTargetMargin(val);
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Price and Margin</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label>Sale Price</label>
          <input
            type="number"
            step="0.01"
            value={salePrice}
            onChange={(e) => setSalePrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Target Margin</label>
          <input
            type="number"
            step="0.01"
            value={localMargin}
            onChange={handleMarginChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceMarginInputs;
