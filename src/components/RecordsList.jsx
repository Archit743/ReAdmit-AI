// components/RecordsList.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removePatientRecord, fetchPatientRecords, deletePatientRecord } from '../features/patientSlice';
import { motion, AnimatePresence } from 'framer-motion';

const RecordsList = () => {
  const dispatch = useDispatch();
  const [patientRecords, setPatientRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterRisk, setFilterRisk] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'risk', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patientId: '',
    diagnosis: '',
    readmissionRisk: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await dispatch(fetchPatientRecords()).unwrap(); // Fetch records
        setPatientRecords(records); // Update local state
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Filter by search term and risk level
  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch = (record.firstName + " " + record.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.patientId && record.patientId.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
      const nameA = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
      const nameB = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
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

  // Get current records based on pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDeleteRecord = (recordId) => {
    setShowDeleteConfirm(recordId);
  };

  const confirmDelete = async (recordId) => {
    try {
      // Use the Redux thunk for deletion instead of the local action
      await dispatch(deletePatientRecord(recordId)).unwrap();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
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

  // Copy patient info to clipboard
  const handleCopyRecord = (record) => {
    const info = `
      Patient: ${record.firstName} ${record.lastName}
      ID: ${record.patientId || "N/A"}
      Diagnosis: ${record.diagnosis || "Not Provided"}
      Readmission Risk: ${record.readmissionRisk || "N/A"}%
      Date: ${new Date(record.date || "").toLocaleDateString() || "N/A"}
    `;
    
    navigator.clipboard.writeText(info.trim())
      .then(() => {
        // Add a toast notification here if you have one
        alert("Patient information copied to clipboard");
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  // Edit record
  const handleEditRecord = (record) => {
    setCurrentRecord(record);
    setFormData({
      firstName: record.firstName || '',
      lastName: record.lastName || '',
      patientId: record.patientId || '',
      diagnosis: record.diagnosis || '',
      readmissionRisk: record.readmissionRisk || '',
      date: record.date ? new Date(record.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowEditModal(true);
  };

  // Handle add new record
  const handleAddRecord = () => {
    setCurrentRecord(null);
    setFormData({
      firstName: '',
      lastName: '',
      patientId: '',
      diagnosis: '',
      readmissionRisk: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form for add/edit
  const handleSubmitForm = async () => {
    try {
      if (currentRecord) {
        // This would be your update action in the slice
        // For now we'll just update the local state
        const updatedRecords = patientRecords.map(record => 
          record._id === currentRecord._id ? { ...record, ...formData } : record
        );
        setPatientRecords(updatedRecords);
        setShowEditModal(false);
        // In real implementation, you would dispatch an update action:
        // await dispatch(updatePatientRecord({ id: currentRecord._id, ...formData })).unwrap();
      } else {
        // This would be your add action in the slice
        // For now we'll just update the local state
        const newRecord = {
          _id: `temp-${Date.now()}`, // Temporary ID until server assigns one
          ...formData,
          date: formData.date || new Date().toISOString()
        };
        setPatientRecords([...patientRecords, newRecord]);
        setShowAddModal(false);
        // In real implementation, you would dispatch an add action:
        // await dispatch(addPatientRecord(formData)).unwrap();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl max-h-60vh"
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
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddRecord}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button> */}
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
        {currentRecords.length > 0 ? (
          <div className="space-y-3">
            {currentRecords.map((record, index) => (
              <motion.div 
                key={record._id || index} 
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
                    {record.readmissionRisk ? parseFloat(record.readmissionRisk).toFixed(2) : "N/A"}%
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteRecord(record._id)}
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
                    <p className="text-sm text-gray-300">{record.diagnosis || "Not Provided"}</p>
                  </div>
                  <div className="flex space-x-2 pb-6">
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditRecord(record)}
                      className="p-2 bg-blue-900/30 rounded-lg text-blue-400 hover:bg-blue-900/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </motion.button> */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopyRecord(record)}
                      className="p-2 bg-purple-900/30 rounded-lg text-purple-400 hover:bg-purple-900/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                  {new Date(record.date || "").toLocaleDateString() || "N/A"}
                </div>
                
                {/* Delete confirmation overlay */}
                <AnimatePresence>
                  {showDeleteConfirm === record._id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 backdrop-blur-md bg-gray-700/90 rounded-xl flex flex-col items-center justify-center p-4 z-10"
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
                            onClick={() => confirmDelete(record._id)}
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
            ))}
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
            Showing <span className="text-white">{Math.min(currentRecords.length, recordsPerPage)}</span> of <span className="text-white">{sortedRecords.length}</span> records
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-900 text-gray-600' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'} transition-colors`}
            >
              Previous
            </motion.button>
            <div className="flex space-x-1">
              {[...Array(Math.min(totalPages, 3))].map((_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'} transition-colors`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 3 && <span className="px-3 py-1 text-gray-400">...</span>}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded-lg ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-900 text-gray-600' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'} transition-colors`}
            >
              Next
            </motion.button>
          </div>
        </div>
      )}
      
      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-4">Add New Patient</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Readmission Risk (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="readmissionRisk"
                      value={formData.readmissionRisk}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitForm}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  Update Patient
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(false)}
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
  );
};

export default RecordsList;