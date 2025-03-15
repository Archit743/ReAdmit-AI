import React from 'react';
import { motion } from 'framer-motion';

const PatientSummary = ({ patient }) => {
  // Check if patient exists before accessing properties
  if (!patient) return <div>No patient data available</div>;

  const summaryItems = [
    {
      label: 'Patient ID',
      value: patient.id || patient.patientId || 'N/A',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      color: "blue"
    },
    {
      label: 'Primary Diagnosis',
      value: patient.primaryDiagnosis || "Not specified",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "purple"
    },
    {
      label: 'Length of Stay',
      value: `${patient.lastStayDays || patient.lengthOfStay || 0} days`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "amber"
    },
    {
      label: 'Age',
      value: `${patient.age || 'N/A'} years`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "green"
    }
  ];

  // Function to get the color classes based on color name
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
        icon: "bg-gradient-to-br from-blue-500 to-blue-600"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-400",
        icon: "bg-gradient-to-br from-purple-500 to-purple-600"
      },
      amber: {
        bg: "bg-amber-600/20",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: "bg-gradient-to-br from-amber-500 to-amber-600"
      },
      green: {
        bg: "bg-green-600/20",
        border: "border-green-500/30",
        text: "text-green-400",
        icon: "bg-gradient-to-br from-green-500 to-green-600"
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Apply similar background effects as login page */}
      <div className="relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Patient Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryItems.map((item, index) => {
            const colorClasses = getColorClasses(item.color);
            
            return (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-xl p-4 flex items-start space-x-3 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`p-2 ${colorClasses.icon} rounded-lg text-white flex-shrink-0 shadow-lg`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-medium mb-1">{item.label}</div>
                  <div className="text-white font-semibold">{item.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Additional details section with better styling */}
        <div className="mt-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Admissions</h4>
              <div className="text-blue-400 font-semibold">
                {patient.recentAdmissions ? 
                  patient.recentAdmissions.length : 
                  patient.previousAdmissions || '0'} in the last 12 months
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Insurance Status</h4>
              <div className="text-purple-400 font-semibold">
                {patient.insuranceStatus || patient.insurance || 'Not specified'}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Discharge Date</h4>
              <div className="text-green-400 font-semibold">
                {patient.dischargeDate || 'Not available'}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Admitting Provider</h4>
              <div className="text-amber-400 font-semibold">
                {patient.admittingProvider || patient.provider || 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;