// Tab Container - Just eliminates CSS repetition  
import React from 'react';

const TabContainer = ({ className = "", withTopMargin = true, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${withTopMargin ? 'mt-8' : ''} ${className}`} 
      {...props} 
    />
  );
};

export default TabContainer;
