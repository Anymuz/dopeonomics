// Tab Header - Just eliminates CSS repetition
import React from 'react';

const TabHeader = ({ icon: Icon, children, className = "", ...props }) => {
  return (
    <h2 className={`text-2xl font-semibold text-gray-800 mb-6 flex items-center ${className}`} {...props}>
      {Icon && <Icon className="mr-2 w-6 h-6" />}
      {children}
    </h2>
  );
};

export default TabHeader;
