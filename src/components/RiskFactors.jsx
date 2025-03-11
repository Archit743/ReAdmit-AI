import React from 'react';
import { motion } from 'framer-motion';

const RiskFactors = ({ patient, showDetails, setShowDetails }) => {
  const riskFactors = [
    {
      title: 'Age',
      value: patient.age,
      unit: 'years',
      percentage: Math.min(100, patient.age)
    },
    {
      title: 'Previous Admissions',
      value: patient.previousAdmissions,
      unit: '',
      percentage: Math.min(100, patient.previousAdmissions * 20)
    },
    {
      title: 'Comorbidities',
      value: patient.comorbidities || 2,
      unit: '',
      percentage: Math.min(100, (patient.comorbidities || 2) * 25)
    }
  ];

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Risk Factors</h3>
        <button 
          onClick={() => setShowDetails(!showDetails)} 
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Details'} 
          <svg 
            className={`ml-1 h-4 w-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Factors visualization */}
      <div className="space-y-3">
        {riskFactors.map((factor, index) => (
          <motion.div 
            key={factor.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-750 rounded-lg p-3"
          >
            <div className="flex justify-between">
              <div className="font-medium text-white">{factor.title}</div>
              <div className="text-blue-300">{factor.value} {factor.unit}</div>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${factor.percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              ></motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Display more details conditionally */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div className="bg-gray-750 rounded-lg p-4">
              <h4 className="text-md font-medium text-white mb-3">Medical History</h4>
              <p className="text-gray-300">{patient.medicalHistory || "Patient has a history of hypertension and type 2 diabetes. Previously treated for pneumonia in 2022. Family history of cardiovascular disease."}</p>
            </div>
            
            <div className="bg-gray-750 rounded-lg p-4">
              <h4 className="text-md font-medium text-white mb-3">Current Medications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(patient.medications || ["Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg", "Aspirin 81mg"]).map((med, index) => (
                  <div key={index} className="bg-gray-700 rounded px-3 py-2 text-gray-300 text-sm">
                    {med}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskFactors;