// components/Dashboard/ActivityItem.js
import React from 'react';
import { motion } from 'framer-motion';

const ActivityItem = ({ type, patient, time, detail, avatar }) => {
  const typeConfig = {
    assessment: {
      color: "blue",
      icon: <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    },
    upload: {
      color: "green",
      icon: <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    },
    prediction: {
      color: "purple",
      icon: <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    }
  };

  const config = typeConfig[type] || typeConfig.assessment;

  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/8 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className={`bg-${config.color}-600/30 p-3 rounded-lg`}>
          {config.icon}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0"></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{patient}</p>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">{detail}</span>
            <span className="text-gray-500">{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityItem;