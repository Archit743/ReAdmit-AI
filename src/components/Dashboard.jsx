// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = ({ onGenerateEntry }) => {
  // Stats could come from Redux or API calls
  const stats = {
    totalPatients: 248,
    pendingAssessments: 12,
    avgReadmissionRisk: '23%',
    highRiskPatients: 37
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header with glassmorphism effect */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Medical Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGenerateEntry}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20 flex items-center text-sm font-medium"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
              Generate New Entry
            </motion.button>
          </div>
        </div>

        {/* Stats Cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {isLoaded && (
              <>
                <StatsCard 
                  title="Total Patients" 
                  value={stats.totalPatients} 
                  icon={<UsersIcon />}
                  color="blue" 
                  delay={0.1}
                />
                <StatsCard 
                  title="Pending Assessments" 
                  value={stats.pendingAssessments} 
                  icon={<ClipboardIcon />}
                  color="yellow" 
                  delay={0.2}
                />
                <StatsCard 
                  title="Avg. Readmission Risk" 
                  value={stats.avgReadmissionRisk} 
                  icon={<ChartIcon />}
                  color="purple" 
                  delay={0.3}
                />
                <StatsCard 
                  title="High Risk Patients" 
                  value={stats.highRiskPatients} 
                  icon={<AlertIcon />}
                  color="red" 
                  delay={0.4}
                />
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Recent Activity section with elegant card design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <ActivityItem 
              type="assessment" 
              patient="Sarah Williams" 
              time="10 minutes ago" 
              detail="Readmission risk: 21%" 
              avatar="/avatars/sarah.jpg"
            />
            <ActivityItem 
              type="upload" 
              patient="Michael Davis" 
              time="2 hours ago" 
              detail="Added 3 documents" 
              avatar="/avatars/michael.jpg"
            />
            <ActivityItem 
              type="prediction" 
              patient="Emma Johnson" 
              time="4 hours ago" 
              detail="Updated risk: 38% → 32%" 
              avatar="/avatars/emma.jpg"
            />
          </div>
        </motion.div>

        {/* Additional helpful section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-white mb-4">Risk Trend</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-gray-400 text-sm">
                Chart visualization would appear here
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <QuickAction 
                title="Schedule Assessment" 
                icon={<CalendarIcon />} 
                color="blue"
              />
              <QuickAction 
                title="Upload Medical Records" 
                icon={<UploadIcon />} 
                color="green"
              />
              <QuickAction 
                title="Generate Report" 
                icon={<DocumentIcon />} 
                color="purple"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced helper components
const StatsCard = ({ title, value, icon, color, delay }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'from-blue-600/20 to-blue-800/20 text-blue-400 border-blue-500/20';
      case 'yellow': return 'from-amber-600/20 to-amber-800/20 text-amber-400 border-amber-500/20';
      case 'purple': return 'from-purple-600/20 to-purple-800/20 text-purple-400 border-purple-500/20';
      case 'red': return 'from-red-600/20 to-red-800/20 text-red-400 border-red-500/20';
      default: return 'from-gray-700/50 to-gray-800/50 text-gray-300 border-gray-600/50';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl p-6 border bg-gradient-to-br ${getColorClasses()} backdrop-blur-lg shadow-xl`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-1 opacity-80">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className="p-3 rounded-xl bg-white/10">
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center text-xs">
          <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-green-400 font-medium">4.2%</span>
          <span className="text-gray-400 ml-1">from last week</span>
        </div>
      </div>
    </motion.div>
  );
};

const ActivityItem = ({ type, patient, time, detail, avatar }) => {
  const getIcon = () => {
    switch (type) {
      case 'assessment':
        return (
          <div className="bg-blue-600/30 p-3 rounded-full">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'upload':
        return (
          <div className="bg-green-600/30 p-3 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
        );
      case 'prediction':
        return (
          <div className="bg-purple-600/30 p-3 rounded-full">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
    >
      {getIcon()}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{patient}</p>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">{detail}</span>
          <span className="text-gray-500">{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

const QuickAction = ({ title, icon, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'from-blue-600/20 to-blue-700/20 text-blue-400 hover:from-blue-600/30 hover:to-blue-700/30';
      case 'green': return 'from-green-600/20 to-green-700/20 text-green-400 hover:from-green-600/30 hover:to-green-700/30';
      case 'purple': return 'from-purple-600/20 to-purple-700/20 text-purple-400 hover:from-purple-600/30 hover:to-purple-700/30';
      default: return 'from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700';
    }
  };

  return (
    <motion.button 
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-3 w-full p-4 rounded-xl bg-gradient-to-r ${getColorClasses()} transition-all`}
    >
      <div className="p-2 bg-white/10 rounded-lg">
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </motion.button>
  );
};

// Icon Components
const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default Dashboard;


// // components/Dashboard.js
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';

// const Dashboard = ({ onGenerateEntry }) => {
//   // Stats could come from Redux or API calls
//   const stats = {
//     totalPatients: 248,
//     pendingAssessments: 12,
//     avgReadmissionRisk: '23%',
//     highRiskPatients: 37
//   };

//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 p-6">
//       {/* Background color blobs similar to login page */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
//         <div className="absolute top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
//         <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
//       </div>
      
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto space-y-8 relative z-10"
//       >
//         {/* Header with glassmorphism effect matching login page */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
//         >
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <motion.div 
//                 className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
//                 whileHover={{ rotate: 5, scale: 1.05 }}
//               >
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </motion.div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                   Medical Dashboard
//                 </h1>
//                 <p className="text-gray-400 mt-1">
//                   {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                 </p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onGenerateEntry}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20 flex items-center text-sm font-medium"
//             >
//               <svg 
//                 className="w-5 h-5 mr-2" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
//                 />
//               </svg>
//               Generate New Entry
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Stats Cards with staggered animation */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <AnimatePresence>
//             {isLoaded && (
//               <>
//                 <StatsCard 
//                   title="Total Patients" 
//                   value={stats.totalPatients} 
//                   icon={<UsersIcon />}
//                   color="blue" 
//                   delay={0.1}
//                 />
//                 <StatsCard 
//                   title="Pending Assessments" 
//                   value={stats.pendingAssessments} 
//                   icon={<ClipboardIcon />}
//                   color="yellow" 
//                   delay={0.2}
//                 />
//                 <StatsCard 
//                   title="Avg. Readmission Risk" 
//                   value={stats.avgReadmissionRisk} 
//                   icon={<ChartIcon />}
//                   color="purple" 
//                   delay={0.3}
//                 />
//                 <StatsCard 
//                   title="High Risk Patients" 
//                   value={stats.highRiskPatients} 
//                   icon={<AlertIcon />}
//                   color="red" 
//                   delay={0.4}
//                 />
//               </>
//             )}
//           </AnimatePresence>
//         </div>
        
//         {/* Recent Activity section with login-like card design */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Recent Activity</h3>
//             </div>
//             <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
//               View All
//             </button>
//           </div>
//           <div className="space-y-4">
//             <ActivityItem 
//               type="assessment" 
//               patient="Sarah Williams" 
//               time="10 minutes ago" 
//               detail="Readmission risk: 21%" 
//               avatar="/avatars/sarah.jpg"
//             />
//             <ActivityItem 
//               type="upload" 
//               patient="Michael Davis" 
//               time="2 hours ago" 
//               detail="Added 3 documents" 
//               avatar="/avatars/michael.jpg"
//             />
//             <ActivityItem 
//               type="prediction" 
//               patient="Emma Johnson" 
//               time="4 hours ago" 
//               detail="Updated risk: 38% → 32%" 
//               avatar="/avatars/emma.jpg"
//             />
//           </div>
//         </motion.div>

//         {/* Additional sections with login-style design */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl lg:col-span-2"
//           >
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="w-8 h-8 bg-purple-600/30 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Risk Trend</h3>
//             </div>
//             <div className="h-64 flex items-center justify-center backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
//               <div className="text-gray-400 text-sm">
//                 Chart visualization would appear here
//               </div>
//             </div>
//           </motion.div>
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
//           >
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="w-8 h-8 bg-green-600/30 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Quick Actions</h3>
//             </div>
//             <div className="space-y-3">
//               <QuickAction 
//                 title="Schedule Assessment" 
//                 icon={<CalendarIcon />} 
//                 color="blue"
//               />
//               <QuickAction 
//                 title="Upload Medical Records" 
//                 icon={<UploadIcon />} 
//                 color="green"
//               />
//               <QuickAction 
//                 title="Generate Report" 
//                 icon={<DocumentIcon />} 
//                 color="purple"
//               />
//             </div>
//           </motion.div>
//         </div>
        
      
//       </motion.div>
//     </div>
//   );
// };

// // Enhanced helper components with design matching login page
// const StatsCard = ({ title, value, icon, color, delay }) => {
//   const getColorClasses = () => {
//     switch (color) {
//       case 'blue': return 'from-blue-600/20 to-blue-700/20 text-blue-400 border-blue-500/30';
//       case 'yellow': return 'from-amber-600/20 to-amber-700/20 text-amber-400 border-amber-500/30';
//       case 'purple': return 'from-purple-600/20 to-purple-700/20 text-purple-400 border-purple-500/30';
//       case 'red': return 'from-red-600/20 to-red-700/20 text-red-400 border-red-500/30';
//       default: return 'from-gray-700/50 to-gray-800/50 text-gray-300 border-gray-600/50';
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay }}
//       className={`backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl`}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-sm font-medium mb-1 text-gray-400">{title}</p>
//           <h3 className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{value}</h3>
//         </div>
//         <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses()}`}>
//           {icon}
//         </div>
//       </div>
//       <div className="mt-4 pt-4 border-t border-white/10">
//         <div className="flex items-center text-xs">
//           <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//           </svg>
//           <span className="text-green-400 font-medium">4.2%</span>
//           <span className="text-gray-400 ml-1">from last week</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const ActivityItem = ({ type, patient, time, detail, avatar }) => {
//   const getIcon = () => {
//     switch (type) {
//       case 'assessment':
//         return (
//           <div className="bg-blue-600/30 p-3 rounded-lg">
//             <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//           </div>
//         );
//       case 'upload':
//         return (
//           <div className="bg-green-600/30 p-3 rounded-lg">
//             <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//             </svg>
//           </div>
//         );
//       case 'prediction':
//         return (
//           <div className="bg-purple-600/30 p-3 rounded-lg">
//             <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <motion.div 
//       whileHover={{ x: 5 }}
//       className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/8 transition-colors"
//     >
//       <div className="flex items-center space-x-4">
//         {getIcon()}
//         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0"></div>
//         <div className="flex-1">
//           <p className="text-sm font-medium text-white">{patient}</p>
//           <div className="flex justify-between text-xs">
//             <span className="text-gray-400">{detail}</span>
//             <span className="text-gray-500">{time}</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const QuickAction = ({ title, icon, color }) => {
//   const getColorClasses = () => {
//     switch (color) {
//       case 'blue': return 'from-blue-600/20 to-blue-700/20 text-blue-400 hover:from-blue-600/30 hover:to-blue-700/30';
//       case 'green': return 'from-green-600/20 to-green-700/20 text-green-400 hover:from-green-600/30 hover:to-green-700/30';
//       case 'purple': return 'from-purple-600/20 to-purple-700/20 text-purple-400 hover:from-purple-600/30 hover:to-purple-700/30';
//       default: return 'from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700';
//     }
//   };

//   return (
//     <motion.button 
//       whileHover={{ x: 5 }}
//       whileTap={{ scale: 0.98 }}
//       className={`backdrop-blur-sm bg-white/5 border border-white/10 flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-white/8 transition-all ${getColorClasses()}`}
//     >
//       <div className="p-2 bg-white/10 rounded-lg">
//         {icon}
//       </div>
//       <span className="font-medium">{title}</span>
//     </motion.button>
//   );
// };

// // Icon Components
// const UsersIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const ClipboardIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//   </svg>
// );

// const ChartIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//   </svg>
// );

// const AlertIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );

// const UploadIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//   </svg>
// );

// const DocumentIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// export default Dashboard;