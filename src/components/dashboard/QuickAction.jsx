// components/Dashboard/QuickAction.js
import React from 'react';
import { motion } from 'framer-motion';

const QuickAction = ({ title, description, icon, color, onClick }) => {
  const colorMappings = {
    blue: {
      gradient: "from-blue-600/20 to-blue-700/20",
      text: "text-blue-400",
      hover: "hover:from-blue-600/30 hover:to-blue-700/30"
    },
    green: {
      gradient: "from-green-600/20 to-green-700/20",
      text: "text-green-400",
      hover: "hover:from-green-600/30 hover:to-green-700/30"
    },
    purple: {
      gradient: "from-purple-600/20 to-purple-700/20",
      text: "text-purple-400",
      hover: "hover:from-purple-600/30 hover:to-purple-700/30"
    },
    amber: {
      gradient: "from-amber-600/20 to-amber-700/20",
      text: "text-amber-400",
      hover: "hover:from-amber-600/30 hover:to-amber-700/30"
    },
    indigo: {
      gradient: "from-indigo-600/20 to-indigo-700/20",
      text: "text-indigo-400",
      hover: "hover:from-indigo-600/30 hover:to-indigo-700/30"
    },
    emerald: {
      gradient: "from-emerald-600/20 to-emerald-700/20",
      text: "text-emerald-400",
      hover: "hover:from-emerald-600/30 hover:to-emerald-700/30"
    }
  };

  const colorClass = colorMappings[color] || colorMappings.blue;

  return (
    <motion.button 
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`backdrop-blur-sm bg-gradient-to-r ${colorClass.gradient} border border-white/10 flex items-center w-full p-4 rounded-xl transition-all ${colorClass.hover}`}
    >
      <div className="p-2 bg-white/10 rounded-lg mr-3">
        <div className={colorClass.text}>{icon}</div>
      </div>
      <div className="text-left">
        <div className="font-medium text-white">{title}</div>
        {description && (
          <div className="text-xs text-slate-400">{description}</div>
        )}
      </div>
    </motion.button>
  );
};

export default QuickAction;