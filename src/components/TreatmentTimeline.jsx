import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getTreatmentEventStyle } from '../components/utils/styleHelper.js';

const TreatmentTimeline = ({ patient, prediction }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Example treatment events - in a real app, these would come from the patient or prediction data
  const treatmentEvents = [
    {
      id: 1,
      date: new Date('2025-02-15'),
      title: 'Initial Assessment',
      description: 'Complete initial evaluation and risk assessment',
      provider: 'Dr. Sarah Johnson',
      status: 'completed',
      notes: 'Patient showed signs of improved mobility'
    },
    {
      id: 2,
      date: new Date('2025-02-28'),
      title: 'Medication Review',
      description: 'Evaluate current medication regimen for effectiveness',
      provider: 'Dr. Michael Chen',
      status: 'completed',
      notes: 'Adjusted dosage of blood pressure medication'
    },
    {
      id: 3,
      date: new Date('2025-03-10'),
      title: 'Follow-up Appointment',
      description: 'Check progress and adjust treatment plan if necessary',
      provider: 'Dr. Sarah Johnson',
      status: 'scheduled',
      notes: ''
    },
    {
      id: 4,
      date: new Date('2025-03-05'),
      title: 'Physical Therapy Session',
      description: 'Strength training and mobility exercises',
      provider: 'Alex Rodriguez, PT',
      status: 'missed',
      notes: 'Patient did not attend, rescheduled for next week'
    },
    {
      id: 5,
      date: new Date('2025-03-20'),
      title: 'Lab Work',
      description: 'Comprehensive blood panel and kidney function test',
      provider: 'Central Medical Lab',
      status: 'pending',
      notes: ''
    }
  ];

  // Filter events based on selected status
  const filteredEvents = filterStatus === 'all' 
    ? treatmentEvents 
    : treatmentEvents.filter(event => event.status === filterStatus);
  
  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => b.date - a.date);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl text-white font-bold mb-4">Treatment Timeline</h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <FilterButton 
            label="All Events" 
            isActive={filterStatus === 'all'} 
            onClick={() => setFilterStatus('all')} 
          />
          <FilterButton 
            label="Completed" 
            isActive={filterStatus === 'completed'} 
            onClick={() => setFilterStatus('completed')} 
          />
          <FilterButton 
            label="Scheduled" 
            isActive={filterStatus === 'scheduled'} 
            onClick={() => setFilterStatus('scheduled')} 
          />
          <FilterButton 
            label="Pending" 
            isActive={filterStatus === 'pending'} 
            onClick={() => setFilterStatus('pending')} 
          />
          <FilterButton 
            label="Missed" 
            isActive={filterStatus === 'missed'} 
            onClick={() => setFilterStatus('missed')} 
          />
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative pl-8 border-l border-gray-700">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <TimelineEvent key={event.id} event={event} index={index} />
          ))
        ) : (
          <div className="text-gray-400 py-6">No events found with the selected filter.</div>
        )}
      </div>
      
      {/* Add new event button */}
      <div className="mt-8 text-center">
        <button className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg">
          Add Treatment Event
        </button>
      </div>
    </div>
  );
};

const FilterButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded-full transition-colors ${
      isActive 
        ? 'bg-indigo-700 text-white' 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const TimelineEvent = ({ event, index }) => {
  const [expanded, setExpanded] = useState(false);
  const styles = getTreatmentEventStyle(event.status);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`mb-6 relative ${styles.bg} rounded-lg p-4 border border-opacity-50 ${styles.border}`}
    >
      {/* Timeline dot */}
      <div className={`absolute -left-12 w-6 h-6 rounded-full ${styles.bg} border-2 ${styles.border} flex items-center justify-center`}>
        <div className={`w-3 h-3 rounded-full ${styles.iconColor}`}></div>
      </div>
      
      {/* Date */}
      <div className="text-sm text-gray-400 mb-1">
        {event.date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </div>
      
      {/* Title & Status */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full uppercase font-semibold ${styles.iconColor}`}>
          {event.status}
        </span>
      </div>
      
      {/* Provider */}
      <div className="text-sm text-gray-300 mb-2">Provider: {event.provider}</div>
      
      {/* Description */}
      <p className="text-gray-400 mb-2">{event.description}</p>
      
      {/* Expandable notes section */}
      {event.notes && (
        <div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-indigo-400 hover:text-indigo-300 focus:outline-none flex items-center"
          >
            {expanded ? 'Hide notes' : 'Show notes'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 p-3 bg-gray-800 bg-opacity-50 rounded text-gray-300 text-sm"
            >
              {event.notes}
            </motion.div>
          )}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="mt-3 flex justify-end space-x-2">
        <button className="text-sm text-gray-400 hover:text-white px-2 py-1">Edit</button>
        {event.status === 'scheduled' && (
          <button className="text-sm text-red-400 hover:text-red-300 px-2 py-1">Cancel</button>
        )}
      </div>
    </motion.div>
  );
};

export default TreatmentTimeline;