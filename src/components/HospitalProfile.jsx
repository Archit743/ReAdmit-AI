// components/HospitalProfile.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HospitalProfile = ({ hospitalInfo }) => {
  // Sample data if none provided
  const defaultHospitalInfo = {
    name: "General Memorial Hospital",
    address: "1234 Medical Center Blvd",
    city: "San Francisco, CA 94143",
    phone: "(415) 555-7890",
    email: "info@generalmemorial.org",
    type: "Level I Trauma Center",
    beds: "450",
    staff: "2,500+",
    ...hospitalInfo // Merge provided info
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(defaultHospitalInfo);

  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Hospital Info:", editedInfo);
    setIsEditing(false);
  };
  

  // Define groups for better organization
  const profileGroups = [
    {
      title: "Contact Information",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      fields: ['phone', 'email', 'address', 'city']
    },
    {
      title: "Facility Information",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      fields: ['type', 'beds', 'staff']
    }
  ];

  // Format field names for display
  const formatFieldName = (field) => {
    return field
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    
    <div className="space-y-6">
      {/* Hospital Card with Logo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-white/5 backdrop-blur-sm"
      >
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{defaultHospitalInfo.name}</h2>
            <p className="text-sm text-gray-400">{defaultHospitalInfo.type}</p>
            <div className="flex items-center mt-3 space-x-1 text-blue-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">{defaultHospitalInfo.address}, {defaultHospitalInfo.city}</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Capacity</p>
                <p className="text-sm font-medium text-white">{defaultHospitalInfo.beds} Beds</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Personnel</p>
                <p className="text-sm font-medium text-white">{defaultHospitalInfo.staff}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Information Groups */}
      {profileGroups.map((group, index) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 shadow-lg border border-white/5 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400">
              {group.icon}
            </div>
            <h3 className="text-md font-medium text-white">{group.title}</h3>
          </div>
          <div className="space-y-3">
          {group.fields.map(field => {
  console.log(`Checking field: ${field}, Value:`, defaultHospitalInfo[field]); // Debugging output

  return  (
    <div key={field} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-400">{formatFieldName(field)}</span>
      <span className="text-sm text-white font-medium">{defaultHospitalInfo[field] || "N/A"}</span>
    </div>
  );
})}
          </div>
        </motion.div>
      ))}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex space-x-3 mt-4"
      >
        <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2.5 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2" onClick={() => setIsEditing(!isEditing)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Edit Profile</span>
        </button>
        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export Data</span>
        </button>
      </motion.div>
    </div>
  );
};

export default HospitalProfile;