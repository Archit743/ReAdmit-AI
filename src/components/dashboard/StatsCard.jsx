// components/Dashboard/StatsCard.js
import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color, delay, changePercentage = null }) => {
  // Default to 0% change if not provided
  const percentage = changePercentage || 0;
  const isPositive = percentage >= 0;
  
  const colorMappings = {
    blue: {
      gradient: "from-blue-600/20 to-blue-700/20",
      text: "text-blue-400",
      border: "border-blue-500/30"
    },
    amber: {
      gradient: "from-amber-600/20 to-amber-700/20",
      text: "text-amber-400",
      border: "border-amber-500/30"
    },
    purple: {
      gradient: "from-purple-600/20 to-purple-700/20",
      text: "text-purple-400",
      border: "border-purple-500/30"
    },
    red: {
      gradient: "from-red-600/20 to-red-700/20",
      text: "text-red-400",
      border: "border-red-500/30"
    },
    green: {
      gradient: "from-green-600/20 to-green-700/20",
      text: "text-green-400",
      border: "border-green-500/30"
    }
  };

  const colorClasses = colorMappings[color] || colorMappings.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-1 text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {value !== undefined && value !== null ? value : '-'}
          </h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses.gradient} ${colorClasses.text} ${colorClasses.border}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center text-xs">
          <svg 
            className={`w-4 h-4 mr-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
            />
          </svg>
          <span className={isPositive ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
            {Math.abs(percentage).toFixed(1)}%
          </span>
          <span className="text-gray-400 ml-1">from last week</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;