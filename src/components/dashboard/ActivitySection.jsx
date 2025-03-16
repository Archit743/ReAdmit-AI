// components/Dashboard/ActivitySection.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GlassmorphicCard } from './common/GlassmorphicCard';
import { IconWrapper } from './common/IconWrapper';
import { SectionTitle } from './common/SectionTitle';

const ActivitySection = () => {
  const { patientRecords } = useSelector((state) => state.patient);
  const [filter, setFilter] = useState('all');

  // Generate activity items from patient records
  const generateActivityItems = () => {
    if (!patientRecords || patientRecords.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          <p>No recent activity to display</p>
          <p className="text-sm mt-2">Patient data will appear here as it becomes available</p>
        </div>
      );
    }

    // Sort records by most recent (assuming there's a timestamp field)
    // If not, we can use the array index as a proxy
    const sortedRecords = [...patientRecords]
      .sort((a, b) => {
        // If you have timestamps, use them for sorting
        // return new Date(b.updatedAt) - new Date(a.updatedAt);
        return patientRecords.indexOf(b) - patientRecords.indexOf(a);
      })
      .slice(0, 5); // Only show the 5 most recent

    return sortedRecords.map((patient, index) => {
      // Determine the activity type based on patient data
      let activityType = "New Patient";
      let activityDetail = "";
      
      if (patient.readmissionRisk !== undefined && patient.readmissionRisk !== null) {
        activityType = "Risk Assessment";
        activityDetail = `Risk: ${patient.readmissionRisk}%`;
      } else if (patient.isApproved === false) {
        activityType = "Pending Approval";
        activityDetail = "Needs review";
      }
      
      // Calculate a relative time (this is a simple placeholder)
      const timeAgo = `${index + 1} hr ago`;
      
      return (
        <div key={patient._id || index} className="flex items-center p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
          <div className="bg-indigo-900/40 rounded-full h-10 w-10 flex items-center justify-center mr-4">
            {patient.firstName ? patient.firstName[0] + (patient.lastName ? patient.lastName[0] : '') : '??'}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-medium text-white">
                {patient.firstName} {patient.lastName || ''}
              </p>
              <span className="text-xs text-gray-400">{timeAgo}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">
                {activityType}
              </span>
              <span className="text-sm text-gray-300">{activityDetail}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <GlassmorphicCard initialDelay={0.3} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <IconWrapper color="blue">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </IconWrapper>
          <SectionTitle>Recent Activity</SectionTitle>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'all' ? 'bg-blue-900/50 text-blue-300' : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('assessments')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'assessments' ? 'bg-blue-900/50 text-blue-300' : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            Assessments
          </button>
          <button 
            onClick={() => setFilter('approvals')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'approvals' ? 'bg-blue-900/50 text-blue-300' : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            Approvals
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {generateActivityItems()}
      </div>
    </GlassmorphicCard>
  );
};

export default ActivitySection;