import React from 'react';
import { motion } from 'framer-motion';

const Recommendations = ({ prediction }) => {
  const getRecommendations = () => {
    const risk = prediction.readmissionRisk?.toLowerCase() || '';
    
    if (risk.includes('high')) {
      return [
        "Schedule follow-up appointment within 2 weeks of discharge",
        "Connect patient with care coordinator for transition support",
        "Review medication adherence plan with patient and caregiver",
        "Consider home health services assessment",
        "Monitor vital signs daily for first week post-discharge"
      ];
    } else if (risk.includes('medium')) {
      return [
        "Schedule follow-up appointment within 30 days",
        "Medication adherence monitoring recommended",
        "Provide detailed discharge instructions with warning signs",
        "Consider telehealth check-in at 2 weeks post-discharge"
      ];
    } else {
      return [
        "Standard follow-up protocols recommended",
        "Provide routine discharge instructions",
        "Patient education on healthy lifestyle maintenance"
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-gradient-to-r from-gray-850 to-gray-900 px-6 py-4">
      <h3 className="text-lg font-medium text-white mb-3">Recommendations</h3>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border-l-4 border-blue-600"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-300">{recommendation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;