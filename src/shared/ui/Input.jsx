// Input - Just eliminates CSS repetition
import React from 'react';

const InputField = ({ label, type = "text", className = "", ...props }) => {
  const isFileInput = type === "file";
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${isFileInput ? className : `w-full p-2 border rounded-md ${className}`}`}
        {...props}
      />
    </div>
  );
};

const Select = ({ label, children, className = "", ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full p-2 border rounded-md ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export { InputField, Select };
