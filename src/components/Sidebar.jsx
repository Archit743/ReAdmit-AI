import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HospitalProfile from './HospitalProfile';
import RecordsList from './RecordsList';

const Sidebar = ({ hospitalInfo }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <aside className="w-100 h-full bg-transparent border-r border-white/10 flex flex-col backdrop-blur-lg shadow-xl pt-3 rounded-2xl mt-6">
      {/* Logo area */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">MediTrack</h1>
            <p className="text-xs text-gray-400">Healthcare Platform</p>
          </div>
        </div>
      </div>

      {/* Decorative elements to match homepage */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-40 -right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Tabs */}
      <div className="flex p-2 my-4 mx-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
        <motion.button
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'profile' ? 'active' : 'inactive'}
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'profile' 
              ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-800/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </div>
        </motion.button>
        <motion.button
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'records' ? 'active' : 'inactive'}
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'records' 
              ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-800/30' 
              : 'text-gray-300 hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('records')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Records</span>
          </div>
        </motion.button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 relative z-10">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="h-full"
        >
          {activeTab === 'profile' ? (
            <div className="bg-white/8 border border-white/10 rounded-xl shadow-lg p-4">
              <HospitalProfile hospitalInfo={hospitalInfo} />
            </div>
          ) : (
            <div className="bg-white/2 border border-white/10 rounded-xl shadow-lg p-4">
              <RecordsList />
            </div>
          )}
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;