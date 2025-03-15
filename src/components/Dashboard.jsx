// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { fetchPatientRecords, fetchWeeklyStats } from '../features/patientSlice';
// import StatsCard from './dashboard/StatsCard';
// import ActivityItem from './dashboard/ActivityItem';
// import { UsersIcon, ClipboardListIcon, AlertTriangleIcon, ActivityIcon } from 'lucide-react'; // Make sure you import all icons you need

// const Dashboard = ({ onGenerateEntry }) => {
//   console.log('=================== DASHBOARD COMPONENT MOUNTED ===================');
//   const dispatch = useDispatch();
//   const { weeklyStats, loading, patientRecords } = useSelector((state) => state.patient);
//   const [isLoaded, setIsLoaded] = useState(false);

//   console.log('FULL WEEKLY STATS OBJECT:', JSON.stringify(weeklyStats));
  
//   // Load both data sets on mount
//   useEffect(() => {
//     console.log('Initializing dashboard data...');
    
//     // Load patient records first
//     dispatch(fetchPatientRecords()).then(() => {
//       // Then load stats after records are available
//       dispatch(fetchWeeklyStats());
//     });
//   }, [dispatch]);
  
//  // Debugging logs
//  useEffect(() => {
//   if (weeklyStats) {
//     console.log('Weekly stats loaded:', weeklyStats);
//     setIsLoaded(true);
//   }
// }, [weeklyStats]);

//   // Calculate percent changes
//   const calculateChanges = () => {
//     console.log('CALCULATE CHANGES - Input weeklyStats:', JSON.stringify(weeklyStats));
//     if (!weeklyStats?.currentWeek || !weeklyStats?.lastWeek) {
//       console.log('Missing data for change calculation');
//       return {
//         totalPatients: 0,
//         pendingAssesments: 0,
//         avgReadmissionRisk: 0,
//         highRiskPatients: 0
//       };
//     }
    
//     const changes = {
//       totalPatients: calculatePercentChange(
//         weeklyStats.currentWeek.totalPatients, 
//         weeklyStats.lastWeek.totalPatients
//       ),
//       pendingAssesments: calculatePercentChange(
//         weeklyStats.currentWeek.unapprovedAssessments, 
//         weeklyStats.lastWeek.unapprovedAssessments
//       ),
//       avgReadmissionRisk: calculatePercentChange(
//         weeklyStats.currentWeek.avgReadmissionRisk, 
//         weeklyStats.lastWeek.avgReadmissionRisk
//       ),
//       highRiskPatients: calculatePercentChange(
//         weeklyStats.currentWeek.highRiskPatients, 
//         weeklyStats.lastWeek.highRiskPatients
//       )
//     };

//     console.log('CALCULATE CHANGES - Output changes:', changes);
//     return changes;

//   };

//   const calculatePercentChange = (current, previous) => {
//     console.log(`CALCULATE PERCENT CHANGE - Current:', ${current}, 'Previous:', ${previous}`);
//     if (!previous) {
//       console.log('CALCULATE PERCENT CHANGE - previous is falsy, returning 0');
//       return 0;
//     }
    
//     const result = ((current - previous) / previous * 100);
//     console.log(`CALCULATE PERCENT CHANGE - calculated result: ${result}`);
//     return result;
//   };

//   const changes = calculateChanges();
//   console.log('FINAL CHANGES OBJECT:', JSON.stringify(changes));

//   // Safely access current week stats or provide defaults
//   const currentStats = weeklyStats?.currentWeek || {
//     totalPatients: 0,
//     pendingAssesments: 0,
//     avgReadmissionRisk: 0,
//     highRiskPatients: 0
//   };

//   // Add some additional debugging output to verify data at render time
//   console.log('Current stats at render time:', currentStats);
//   console.log('Changes at render time:', changes);


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl p-6">
//       {/* Background color blobs for visual interest */}
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
//         {/* Header with glassmorphism effect */}
//         <GlassmorphicCard
//           initialDelay={0}
//           className="p-6"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
//         </GlassmorphicCard>

//         {/* Stats Cards with staggered animation */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <AnimatePresence>
//             {isLoaded && (
//               <>
//                 <StatsCard 
//                   title="Total Patients" 
//                   value={currentStats.totalPatients} 
//                   icon={<UsersIcon />}
//                   color="blue" 
//                   delay={0.1}
//                   change={changes.totalPatients}
//                 />
//                 <StatsCard 
//                   title="Pending Assessments" 
//                   value={currentStats.pendingAssesments} 
//                   icon={<ClipboardListIcon />}
//                   color="amber" 
//                   delay={0.2}
//                   change={changes.unapprovedAssessments}
//                 />
//                 {console.log('PROPS PASSED TO PENDING ASSESSMENTS CARD:', { 
//   value: currentStats.pendingAssessments, 
//   change: changes.pendingAssessments 
// })}
//                 <StatsCard 
//                   title="Avg. Readmission Risk" 
//                   value={currentStats.avgReadmissionRisk ? `${currentStats.avgReadmissionRisk.toFixed(1)}%` : '0%'}  
//                   icon={<ActivityIcon />}
//                   color="purple" 
//                   delay={0.3}
//                   change={changes.avgReadmissionRisk}
//                 />
//                 <StatsCard 
//                   title="High Risk Patients" 
//                   value={currentStats.highRiskPatients} 
//                   icon={<AlertTriangleIcon />}
//                   color="red" 
//                   delay={0.4}
//                   change={changes.highRiskPatients}
//                 />
//               </>
//             )}
//           </AnimatePresence>
//         </div>
        
//         {/* Recent Activity section */}
//         <GlassmorphicCard initialDelay={0.3} className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-3">
//               <IconWrapper color="blue">
//                 <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </IconWrapper>
//               <SectionTitle>Recent Activity</SectionTitle>
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
//         </GlassmorphicCard>

//         {/* Additional sections with login-style design */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <GlassmorphicCard initialDelay={0.4} className="p-6 lg:col-span-2">
//             <div className="flex items-center space-x-3 mb-6">
//               <IconWrapper color="purple">
//                 <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </IconWrapper>
//               <SectionTitle>Risk Trend</SectionTitle>
//             </div>
//             <div className="h-64 flex items-center justify-center backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
//               <div className="text-gray-400 text-sm">
//                 Chart visualization would appear here
//               </div>
//             </div>
//           </GlassmorphicCard>
          
//           <GlassmorphicCard initialDelay={0.5} className="p-6">
//             <div className="flex items-center space-x-3 mb-6">
//               <IconWrapper color="green">
//                 <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </IconWrapper>
//               <SectionTitle>Quick Actions</SectionTitle>
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
//           </GlassmorphicCard>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Reusable glassmorphic card component for consistency
// const GlassmorphicCard = ({ children, className = "", initialDelay = 0 }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: initialDelay }}
//     className={`backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl shadow-2xl ${className}`}
//   >
//     {children}
//   </motion.div>
// );

// // Consistent section title component
// const SectionTitle = ({ children }) => (
//   <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//     {children}
//   </h3>
// );

// // Consistent icon wrapper component
// const IconWrapper = ({ children, color = "blue" }) => {
//   const getColorClass = () => {
//     const colors = {
//       blue: "bg-blue-600/30",
//       green: "bg-green-600/30",
//       purple: "bg-purple-600/30",
//       amber: "bg-amber-600/30",
//       red: "bg-red-600/30"
//     };
//     return colors[color] || colors.blue;
//   };

//   return (
//     <div className={`w-8 h-8 ${getColorClass()} rounded-lg flex items-center justify-center`}>
//       {children}
//     </div>
//   );
// };

// // Enhanced helper components with design matching login page
// const StatsCard = ({ title, value, icon, color, delay, change }) => {
//   const colorMappings = {
//     blue: {
//       gradient: "from-blue-600/20 to-blue-700/20",
//       text: "text-blue-400",
//       border: "border-blue-500/30"
//     },
//     amber: {
//       gradient: "from-amber-600/20 to-amber-700/20",
//       text: "text-amber-400",
//       border: "border-amber-500/30"
//     },
//     purple: {
//       gradient: "from-purple-600/20 to-purple-700/20",
//       text: "text-purple-400",
//       border: "border-purple-500/30"
//     },
//     red: {
//       gradient: "from-red-600/20 to-red-700/20",
//       text: "text-red-400",
//       border: "border-red-500/30"
//     },
//     green: {
//       gradient: "from-green-600/20 to-green-700/20",
//       text: "text-green-400",
//       border: "border-green-500/30"
//     }
//   };

//   const colorClasses = colorMappings[color] || colorMappings.blue;
//   const isPositiveChange = Number(change) >= 0;

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay }}
//       className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl p-6 shadow-2xl"
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-sm font-medium mb-1 text-gray-400">{title}</p>
//           <h3 className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{value}</h3>
//         </div>
//         <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses.gradient} ${colorClasses.text} ${colorClasses.border}`}>
//           {icon}
//         </div>
//       </div>
//       <div className="mt-4 pt-4 border-t border-white/10">
//         <div className="flex items-center text-xs">
//           <svg 
//             className={`w-4 h-4 mr-1 ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`} 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d={isPositiveChange 
//                 ? "M5 10l7-7m0 0l7 7m-7-7v18" 
//                 : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
//             />
//           </svg>
//           <span className={isPositiveChange ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
//             {Math.abs(change)}%
//           </span>
//           <span className="text-gray-400 ml-1">from last week</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const ActivityItem = ({ type, patient, time, detail, avatar }) => {
//   const typeConfig = {
//     assessment: {
//       color: "blue",
//       icon: <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//       </svg>
//     },
//     upload: {
//       color: "green",
//       icon: <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//       </svg>
//     },
//     prediction: {
//       color: "purple",
//       icon: <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//       </svg>
//     }
//   };

//   const config = typeConfig[type] || typeConfig.assessment;

//   return (
//     <motion.div 
//       whileHover={{ x: 5 }}
//       className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/8 transition-colors"
//     >
//       <div className="flex items-center space-x-4">
//         <div className={`bg-${config.color}-600/30 p-3 rounded-lg`}>
//           {config.icon}
//         </div>
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
//   const colorMappings = {
//     blue: {
//       gradient: "from-blue-600/20 to-blue-700/20",
//       text: "text-blue-400",
//       hover: "hover:from-blue-600/30 hover:to-blue-700/30"
//     },
//     green: {
//       gradient: "from-green-600/20 to-green-700/20",
//       text: "text-green-400",
//       hover: "hover:from-green-600/30 hover:to-green-700/30"
//     },
//     purple: {
//       gradient: "from-purple-600/20 to-purple-700/20",
//       text: "text-purple-400",
//       hover: "hover:from-purple-600/30 hover:to-purple-700/30"
//     }
//   };

//   const colorClass = colorMappings[color] || colorMappings.blue;

//   return (
//     <motion.button 
//       whileHover={{ x: 5 }}
//       whileTap={{ scale: 0.98 }}
//       className={`backdrop-blur-sm bg-white/5 border border-white/10 flex items-center space-x-3 w-full p-4 rounded-xl hover:bg-white/8 transition-all ${colorClass.gradient} ${colorClass.text} ${colorClass.hover}`}
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