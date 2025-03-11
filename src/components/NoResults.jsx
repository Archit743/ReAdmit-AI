import React from 'react';
import { motion } from 'framer-motion';

const NoResults = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-7xl mx-auto p-8 text-center"
    >
      <div className="py-16 px-4">
        <div className="rounded-full bg-gray-700 w-20 h-20 mx-auto flex items-center justify-center mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16v-4" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">No Results Available</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-6">
          There are no prediction results available for this patient yet. Please run a risk assessment or select a different patient.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
          >
            Run Assessment
          </button>
          <button
            className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Select Patient
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoResults;