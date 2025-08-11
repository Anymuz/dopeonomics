// Buttons - Just eliminates CSS repetition
import React from 'react';

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className}`} {...props}>
      {children}
    </button>
  );
};

const SecondaryButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </button>
  );
};

const GrayButton = ({ children, className = "", ...props }) => {
  return (
    <button className={`px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 ${className}`} {...props}>
      {children}
    </button>
  );
};

const IconButton = ({ icon: Icon, children, className = "", title, ...props }) => {
  return (
    <button className={`transition-colors ${className}`} title={title} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export { PrimaryButton, SecondaryButton, GrayButton, IconButton };
