import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Importing modular components
import Header from '../components/HeaderResult';
import PatientSummary from '../components/PatientSummary';
import RiskFactors from '../components/RiskFactors';
import Recommendations from '../components/Recommendations';
import ActionFooter from '../components/ActionFooter';
import NoResults from '../components/NoResults';
import TreatmentTimeline from '../components/TreatmentTimeline';
import FollowUpScheduler from '../components/FollowUpScheduler';

const ResultsPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const patient = useSelector(state => state.patient.currentPatient);
  const prediction = useSelector(state => state.patient.predictionResult);

  // Handle the case when there's no data yet
  if (!patient || !prediction) {
    return <NoResults />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-0 sm:p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-gray-700 rounded-none sm:rounded-xl"
      >
        {/* Visual accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
        
        {/* Header section with enhanced styling */}
        <Header patient={patient} prediction={prediction} />
        
        {/* Tab navigation with improved styling */}
        <div className="bg-gray-850 px-6 py-3 border-b border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
          <div className="flex flex-wrap space-x-1 md:space-x-4">
            <TabButton 
              label="Overview" 
              isActive={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
              icon="chart-pie"
            />
            <TabButton 
              label="Treatment Plan" 
              isActive={activeTab === 'treatment'} 
              onClick={() => setActiveTab('treatment')} 
              icon="calendar-days"
            />
            <TabButton 
              label="Follow-up" 
              isActive={activeTab === 'followup'} 
              onClick={() => setActiveTab('followup')} 
              icon="clipboard-check"
            />
          </div>
        </div>
        
        {/* Tab content with enhanced transitions */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-850 min-h-[70vh]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div>
                {/* Patient summary */}
                <PatientSummary patient={patient} />
                
                {/* Risk factors visualization */}
                <RiskFactors 
                  patient={patient} 
                  showDetails={showDetails} 
                  setShowDetails={setShowDetails} 
                />
                
                {/* Recommendations section */}
                <Recommendations prediction={prediction} />
              </div>
            )}
            
            {activeTab === 'treatment' && (
              <TreatmentTimeline patient={patient} prediction={prediction} />
            )}
            
            {activeTab === 'followup' && (
              <FollowUpScheduler patient={patient} prediction={prediction} />
            )}
          </motion.div>
        </div>
        
        {/* Actions footer with enhanced styling */}
        <ActionFooter patient={patient} prediction={prediction} />
      </motion.div>
      
      {/* Page Footer */}
      <div className="mt-6 text-center text-gray-500 text-xs pb-8">
        <p>© 2025 Hospital System • Readmission Prevention Platform • v2.5.0</p>
      </div>
    </div>
  );
};

const TabButton = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-all flex items-center ${
      isActive 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg' 
        : 'text-gray-400 hover:text-blue-300 hover:bg-gray-800 hover:bg-opacity-50'
    }`}
  >
    {icon && (
      <span className="mr-2">
        <TabIcon name={icon} isActive={isActive} />
      </span>
    )}
    {label}
  </button>
);

// Simple icon component
const TabIcon = ({ name, isActive }) => {
  const iconComponents = {
    'chart-pie': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    'calendar-days': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    'clipboard-check': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  };

  return (
    <div className={`transition-all ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
      {iconComponents[name] || null}
    </div>
  );
};

export default ResultsPage;