import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

// Importing modular components
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
  const [isLoaded, setIsLoaded] = useState(false);
  
  const patient = useSelector(state => state.patient.currentPatient);
  const prediction = useSelector(state => state.patient.predictionResult);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle the case when there's no data yet
  if (!patient || !prediction) {
    return <NoResults />;
  }

  // CSS for autofill styles (matching login page)
  const autofillStyle = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-text-fill-color: white;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
      background-color: transparent !important;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 p-6">
      <style>{autofillStyle}</style>
      
      {/* Background color blobs for visual interest - matching login page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header with glassmorphism effect - matching login page styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl shadow-2xl p-7"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
                  Patient Results
                </h1>
                <p className="text-gray-400 text-sm">
                  Patient ID: {patient.id} • Last Updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-blue-300 hover:bg-white/10 transition-colors text-sm font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Results
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg shadow-blue-600/20 flex items-center text-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Schedule Follow-up
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Patient stats cards */}
        <AnimatePresence>
          {isLoaded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                title="Readmission Risk" 
                value={`${prediction.riskPercentage}%`} 
                icon={<RiskIcon />}
                color={prediction.riskPercentage > 50 ? "red" : prediction.riskPercentage > 30 ? "amber" : "green"}
                delay={0.1}
                detail={`${prediction.riskPercentage > 50 ? "High" : prediction.riskPercentage > 30 ? "Medium" : "Low"} risk level`}
              />
              <StatsCard 
                title="Length of Stay" 
                value={`${patient.lastStayDays} days`} 
                icon={<CalendarIcon />}
                color="blue" 
                delay={0.2}
                detail={`${patient.lastStayDays > 7 ? "Above" : "Below"} average`}
              />
              <StatsCard 
                title="Comorbidities" 
                value={patient.comorbidities?.length || 0} 
                icon={<ClipboardIcon />}
                color="purple" 
                delay={0.3}
                detail="Critical factors"
              />
              <StatsCard 
                title="Readmission Timeline" 
                value={`${prediction.daysUntilRisk || 30} days`} 
                icon={<ClockIcon />}
                color="amber" 
                delay={0.4}
                detail="Monitoring window"
              />
            </div>
          )}
        </AnimatePresence>
        
        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="backdrop-blur-lg bg-white/4 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="backdrop-blur-sm bg-white/2 border-b border-white/6 px-6 py-3">
            <div className="flex flex-wrap space-x-1 md:space-x-4">
              <TabButton 
                label="Overview" 
                isActive={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')} 
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>}
              />
              <TabButton 
                label="Treatment Plan" 
                isActive={activeTab === 'treatment'} 
                onClick={() => setActiveTab('treatment')} 
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>}
              />
              <TabButton 
                label="Follow-up" 
                isActive={activeTab === 'followup'} 
                onClick={() => setActiveTab('followup')} 
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>}
              />
            </div>
          </div>
          
          {/* Tab content with enhanced transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-7"
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Patient summary in a glassmorphic container */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <IconWrapper color="blue">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </IconWrapper>
                      <SectionTitle>Patient Summary</SectionTitle>
                    </div>                  
                        <PatientSummary patient={patient} />
                  </div>
                  
                  {/* Risk Assesment visualization */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconWrapper color="red">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </IconWrapper>
                        <SectionTitle>Risk Assessment</SectionTitle>
                      </div>
                      
                    </div>
                    
                        <RiskFactors 
                          patient={patient} 
                          showDetails={showDetails} 
                          setShowDetails={setShowDetails} 
                        />
                  </div>
                  
                  {/* Recommendations section */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <IconWrapper color="green">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </IconWrapper>
                      <SectionTitle>Recommendations</SectionTitle>
                    </div>
                    <Recommendations prediction={prediction} />
                  </div>
                </div>
              )}
              
              {activeTab === 'treatment' && (
                    <TreatmentTimeline patient={patient} prediction={prediction} />
                
              )}
              
              {activeTab === 'followup' && (
                <FollowUpScheduler patient={patient} prediction={prediction} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Actions footer with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl shadow-2xl p-7"
        >
          <ActionFooter patient={patient} prediction={prediction} />
        </motion.div>
      </motion.div>
      
      {/* Page Footer with indicator dots - matching login page */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 text-center"
      >
        <div className="flex items-center justify-center space-x-5 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="text-gray-400 text-xs">Secure Portal</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="text-gray-400 text-xs">HIPAA Compliant</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="text-gray-400 text-xs">Encrypted</div>
          </div>
        </div>
        <div className="text-gray-500 text-xs pb-8">
          <p>© 2025 Hospital System • Readmission Prevention Platform • v2.5.0</p>
        </div>
      </motion.div>
    </div>
  );
};

// Consistent section title component
const SectionTitle = ({ children }) => (
  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
    {children}
  </h3>
);

// Consistent icon wrapper component
const IconWrapper = ({ children, color = "blue" }) => {
  const getColorClass = () => {
    const colors = {
      blue: "bg-blue-600/30",
      green: "bg-green-600/30",
      purple: "bg-purple-600/30",
      amber: "bg-amber-600/30",
      red: "bg-red-600/30"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`w-8 h-8 ${getColorClass()} rounded-lg flex items-center justify-center`}>
      {children}
    </div>
)};

// Tab button styling to match login page aesthetic
const TabButton = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all flex items-center ${
      isActive 
        ? 'bg-white/10 text-white shadow-lg border border-white/20' 
        : 'text-gray-400 hover:text-blue-300 hover:bg-white/5'
    }`}
  >
    {icon && (
      <span className={`mr-2 ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
        {icon}
      </span>
    )}
    {label}
  </button>
);

// StatsCard with style matching login page
const StatsCard = ({ title, value, icon, color, delay, detail }) => {
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-1 text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses.gradient} ${colorClasses.border} border border-white/10`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center text-xs">
          <span className={`${colorClasses.text} font-medium`}>{detail}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Icon Components
const RiskIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ResultsPage;