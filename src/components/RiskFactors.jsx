import React from 'react';
import { motion } from 'framer-motion';

const RiskFactors = ({ patient, showDetails, setShowDetails }) => {
  const riskFactors = [
    {
      title: 'Age',
      value: patient.age,
      unit: 'years',
      percentage: Math.min(100, patient.age),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: 'Previous Admissions',
      value: patient.previousAdmissions,
      unit: '',
      percentage: Math.min(100, patient.previousAdmissions * 20),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "purple"
    },
    {
      title: 'Comorbidities',
      value: patient.comorbidities || 2,
      unit: '',
      percentage: Math.min(100, (patient.comorbidities || 2) * 25),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "amber"
    }
  ];

  // Function to get the color classes based on color name
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
        icon: "bg-gradient-to-br from-blue-500 to-blue-600",
        progress: "from-blue-500 to-blue-600"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-400",
        icon: "bg-gradient-to-br from-purple-500 to-purple-600",
        progress: "from-purple-500 to-purple-600"
      },
      amber: {
        bg: "bg-amber-600/20",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: "bg-gradient-to-br from-amber-500 to-amber-600",
        progress: "from-amber-500 to-amber-600"
      },
      green: {
        bg: "bg-green-600/20",
        border: "border-green-500/30",
        text: "text-green-400",
        icon: "bg-gradient-to-br from-green-500 to-green-600",
        progress: "from-green-500 to-green-600"
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Background effects */}
      <div className="relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Risk Factors
          </h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)} 
            className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-blue-400 hover:text-blue-300 flex items-center transition-colors"
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
          </motion.button>
        </div>
        
        {/* Risk Factors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {riskFactors.map((factor, index) => {
            const colorClasses = getColorClasses(factor.color);
            
            return (
              <motion.div 
                key={factor.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-xl p-4 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`p-2 ${colorClasses.icon} rounded-lg text-white flex-shrink-0 shadow-lg`}>
                    {factor.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium mb-1">{factor.title}</div>
                    <div className="text-white font-semibold">
                      {factor.value} {factor.unit}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Risk Level</span>
                    <span className={colorClasses.text}>{factor.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-gradient-to-r ${colorClasses.progress}`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Expandable Details Section */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Medical History */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white shadow-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-300">Medical History</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {patient.medicalHistory || "Patient has a history of hypertension and type 2 diabetes. Previously treated for pneumonia in 2022. Family history of cardiovascular disease."}
              </p>
            </div>
            
            {/* Current Medications */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-purple-300">Current Medications</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(patient.medications || ["Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg", "Aspirin 81mg"]).map((med, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="backdrop-blur-sm bg-white/10 border border-purple-500/20 rounded-lg px-4 py-3 text-white text-sm shadow-lg"
                  >
                    {med}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Overall Risk Assessment */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white shadow-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-amber-300">Overall Risk Assessment</h4>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Combined Risk Score</span>
                  <span className="text-amber-300 font-bold text-lg">
                    {Math.round((riskFactors.reduce((sum, factor) => sum + factor.percentage, 0) / riskFactors.length))}%
                  </span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((riskFactors.reduce((sum, factor) => sum + factor.percentage, 0) / riskFactors.length))}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  ></motion.div>
                </div>
                <p className="mt-4 text-gray-300 text-sm">
                  Based on age, previous admissions history, and number of comorbidities, this patient is at 
                  <span className="text-amber-300 font-medium mx-1">
                    {Math.round((riskFactors.reduce((sum, factor) => sum + factor.percentage, 0) / riskFactors.length)) < 30 ? 'low' : 
                     Math.round((riskFactors.reduce((sum, factor) => sum + factor.percentage, 0) / riskFactors.length)) < 60 ? 'moderate' : 'high'}
                  </span>
                  risk for readmission within 30 days. Recommend close follow-up and comprehensive discharge planning.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskFactors;