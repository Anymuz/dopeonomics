import React from 'react';

// Strain Name Input component
export const StrainNameInput = ({ value, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Strain Name:</label>
    <input
      type="text"
      className="w-full p-2 border rounded-md"
      placeholder="Enter a name for your strain"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);