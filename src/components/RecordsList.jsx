// components/RecordsList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePatientRecord } from '../features/patientSlice';
import { motion, AnimatePresence } from 'framer-motion';

const RecordsList = () => {
  const dispatch = useDispatch();
  // This would come from your Redux store or an API call
  const patientRecords = useSelector(state => state.patient.patientRecords) || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterRisk, setFilterRisk] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'risk', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  
  // Filter by search term and risk level
  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch = (record.firstName + " " + record.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRisk === 'all') return matchesSearch;
    
    const riskValue = parseInt(record.readmissionRisk);
    if (filterRisk === 'high' && riskValue >= 30) return matchesSearch;
    if (filterRisk === 'medium' && riskValue >= 15 && riskValue < 30) return matchesSearch;
    if (filterRisk === 'low' && riskValue < 15) return matchesSearch;
    
    return false;
  });
  
  // Sort records
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortBy === 'risk') {
      const riskA = parseInt(a.readmissionRisk) || 0;
      const riskB = parseInt(b.readmissionRisk) || 0;
      return sortOrder === 'asc' ? riskA - riskB : riskB - riskA;
    } else if (sortBy === 'date') {
      const dateA = new Date(a.date || '1970-01-01');
      const dateB = new Date(b.date || '1970-01-01');
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleDeleteRecord = (recordId) => {
    setShowDeleteConfirm(recordId);
  };

  const confirmDelete = (recordId) => {
    dispatch(removePatientRecord(recordId));
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getRiskColorClass = (risk) => {
    const riskValue = parseInt(risk);
    if (riskValue >= 30) return 'bg-red-900 text-red-200';
    if (riskValue >= 15) return 'bg-amber-900 text-amber-200';
    return 'bg-green-900 text-green-200';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Patient Records
        </h2>
        <div className="flex space-x-2">
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Risks</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Enhanced Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white backdrop-blur-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      {/* Sorting options */}
      <div className="flex mb-4 space-x-4 border-b border-white/10 pb-3">
        <button 
          onClick={() => toggleSort('name')} 
          className={`text-sm font-medium flex items-center ${sortBy === 'name' ? 'text-blue-400' : 'text-gray-400'}`}
        >
          Name
          {sortBy === 'name' && (
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={sortOrder === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
              />
            </svg>
          )}
        </button>
        <button 
          onClick={() => toggleSort('risk')} 
          className={`text-sm font-medium flex items-center ${sortBy === 'risk' ? 'text-blue-400' : 'text-gray-400'}`}
        >
          Risk Level
          {sortBy === 'risk' && (
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={sortOrder === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
              />
            </svg>
          )}
        </button>
        <button 
          onClick={() => toggleSort('date')} 
          className={`text-sm font-medium flex items-center ${sortBy === 'date' ? 'text-blue-400' : 'text-gray-400'}`}
        >
          Date
          {sortBy === 'date' && (
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={sortOrder === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
              />
            </svg>
          )}
        </button>
      </div>
      
      {/* Records list with enhanced styling */}
      <AnimatePresence>
        {sortedRecords.length > 0 ? (
          <div className="space-y-3">
            {sortedRecords.map((record, index) =>
              record && record.id ? (
                <motion.div 
                  key={record.id || index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 relative hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-700 to-purple-800 flex items-center justify-center text-white font-bold mr-3">
                        {(record.firstName?.[0] || '') + (record.lastName?.[0] || '')}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{record.firstName || "Unknown"} {record.lastName || ""}</h3>
                        <p className="text-xs text-gray-400">ID: {record.patientId || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getRiskColorClass(record.readmissionRisk)}`}>
                        {record.readmissionRisk || "N/A"}%
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors focus:outline-none p-1"
                        aria-label="Delete record"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Diagnosis</span>
                      <p className="text-sm text-gray-300">{record.diagnosis || record.primaryDiagnosis || "Not Provided"}</p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-900/30 rounded-lg text-blue-400 hover:bg-blue-900/50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-purple-900/30 rounded-lg text-purple-400 hover:bg-purple-900/50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    {record.date || "N/A"}
                  </div>
                  
                  {/* Delete confirmation overlay */}
                  <AnimatePresence>
                    {showDeleteConfirm === record.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 backdrop-blur-md bg-gray-900/90 rounded-xl flex flex-col items-center justify-center p-4 z-10"
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.9 }}
                          className="bg-gray-800 p-6 rounded-xl border border-gray-700 w-full max-w-sm"
                        >
                          <h3 className="text-lg font-bold text-white mb-2">Confirm Deletion</h3>
                          <p className="text-gray-300 mb-4">Are you sure you want to delete this patient record? This action cannot be undone.</p>
                          <div className="flex space-x-3">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => confirmDelete(record.id)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-colors"
                            >
                              Delete
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={cancelDelete}
                              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : null
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/5 rounded-xl border border-white/10"
          >
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No patient records found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pagination */}
      {sortedRecords.length > 0 && (
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
          <div className="text-sm text-gray-500">
            Showing <span className="text-white">{sortedRecords.length}</span> of <span className="text-white">{patientRecords.length}</span> records
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
            >
              Previous
            </motion.button>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded-lg bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">2</button>
              <button className="px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">3</button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
            >
              Next
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RecordsList;