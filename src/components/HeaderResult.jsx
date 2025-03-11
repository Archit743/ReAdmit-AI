import React from 'react';
import { motion } from 'framer-motion';
import { getRiskLevelStyle } from '../components/utils/styleHelper';

const Header = ({ patient, prediction }) => {
  const riskStyle = getRiskLevelStyle(prediction.readmissionRisk);
  const riskPercentage = prediction.probability ? Math.round(prediction.probability * 100) : null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Readmission Risk Assessment</h2>
          <p className="text-blue-200 mt-1">Results for {patient.firstName} {patient.lastName}</p>
          <p className="text-blue-200 text-sm opacity-75">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`mt-4 md:mt-0 ${riskStyle.bg} px-4 py-3 rounded-lg shadow-lg`}
        >
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-300">Risk Level</div>
          <div className={`text-xl font-bold ${riskStyle.color}`}>{prediction.readmissionRisk || "Unknown"}</div>
          {riskPercentage && (
            <div className="flex items-center">
              <div className="text-sm opacity-80">{riskPercentage}% probability</div>
              <div className="ml-2 w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white bg-opacity-50" 
                  style={{ width: `${riskPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;