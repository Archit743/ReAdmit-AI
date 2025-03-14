// components/Dashboard/common/IconWrapper.js
import React from 'react';

export const IconWrapper = ({ children, color = "blue" }) => {
  const getColorClass = () => {
    const colors = {
      blue: "bg-blue-600/30",
      green: "bg-green-600/30",
      purple: "bg-purple-600/30",
      amber: "bg-amber-600/30",
      red: "bg-red-600/30"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`w-8 h-8 ${getColorClass()} rounded-lg flex items-center justify-center`}>
      {children}
    </div>
  );
};