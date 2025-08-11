// Alert - Just eliminates CSS repetition
import React from 'react';

const Alert = ({ type = "info", icon: Icon, title, children, className = "" }) => {
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700", 
    error: "bg-red-50 border-red-200 text-red-700",
    info: "bg-blue-50 border-blue-200 text-blue-700"
  };

  const textStyles = {
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600", 
    info: "text-blue-700"
  };

  return (
    <div className={`p-4 rounded-lg border ${typeStyles[type]} ${className}`}>
      {(Icon || title) && (
        <div className="flex items-center font-medium mb-2">
          {Icon && <Icon className="mr-2 w-5 h-5" />}
          {title}
        </div>
      )}
      {children && (
        <p className={`text-sm ${textStyles[type]}`}>
          {children}
        </p>
      )}
    </div>
  );
};

export default Alert;
