import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreatmentTimeline = ({ patient, prediction }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addingEvent, setAddingEvent] = useState(false);
  
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
  const filteredEvents = useMemo(() => {
    const filtered = filterStatus === 'all' 
      ? treatmentEvents 
      : treatmentEvents.filter(event => event.status === filterStatus);
    
    // Sort events by date (most recent first)
    return [...filtered].sort((a, b) => b.date - a.date);
  }, [filterStatus, treatmentEvents]);
  
  // Function to get the color scheme based on status - memoized
  const getStatusColorScheme = useCallback((status) => {
    const colorMap = {
      completed: {
        bg: "bg-green-600/20",
        border: "border-green-500/30",
        text: "text-green-400",
        icon: "bg-gradient-to-br from-green-500 to-green-600",
        progress: "from-green-500 to-green-600"
      },
      scheduled: {
        bg: "bg-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
        icon: "bg-gradient-to-br from-blue-500 to-blue-600",
        progress: "from-blue-500 to-blue-600"
      },
      pending: {
        bg: "bg-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-400",
        icon: "bg-gradient-to-br from-purple-500 to-purple-600",
        progress: "from-purple-500 to-purple-600"
      },
      missed: {
        bg: "bg-amber-600/20",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: "bg-gradient-to-br from-amber-500 to-amber-600",
        progress: "from-amber-500 to-amber-600"
      }
    };
    
    return colorMap[status] || colorMap.scheduled;
  }, []);

  // Handler for marking event as completed
  const handleMarkComplete = useCallback((eventId) => {
    // In a real app, this would update the backend
    console.log(`Marked event ${eventId} as completed`);
    // For demo purposes, we'd update the state here
  }, []);

  // Handler for rescheduling missed events
  const handleReschedule = useCallback((eventId) => {
    // In a real app, this would open a date picker
    console.log(`Rescheduling event ${eventId}`);
    // For demo purposes, we'd update the state here
  }, []);

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Background effects */}
      <div className="relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Treatment Timeline
          </h3>
          
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6 backdrop-blur-lg bg-white/5 p-3 border border-white/10 rounded-xl shadow-lg">
          <FilterButton 
            label="All Events" 
            isActive={filterStatus === 'all'} 
            onClick={() => setFilterStatus('all')} 
          />
          <FilterButton 
            label="Completed" 
            isActive={filterStatus === 'completed'} 
            onClick={() => setFilterStatus('completed')} 
            colorScheme="green"
          />
          <FilterButton 
            label="Scheduled" 
            isActive={filterStatus === 'scheduled'} 
            onClick={() => setFilterStatus('scheduled')} 
            colorScheme="blue"
          />
          <FilterButton 
            label="Pending" 
            isActive={filterStatus === 'pending'} 
            onClick={() => setFilterStatus('pending')} 
            colorScheme="purple"
          />
          <FilterButton 
            label="Missed" 
            isActive={filterStatus === 'missed'} 
            onClick={() => setFilterStatus('missed')} 
            colorScheme="amber"
          />
        </div>
      
        {/* Timeline */}
        <div className="relative pl-8 border-l border-gray-700/50">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <TimelineEvent 
                key={event.id} 
                event={event} 
                index={index} 
                colorScheme={getStatusColorScheme(event.status)}
                isSelected={selectedEvent === event.id}
                onSelect={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                onMarkComplete={() => handleMarkComplete(event.id)}
                onReschedule={() => handleReschedule(event.id)}
              />
            ))
          ) : (
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 text-gray-400 py-6">
              No events found with the selected filter.
            </div>
          )}
        </div>
        
        {/* Add new event button */}
        <div className="mt-8 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddingEvent(true)}
            className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg border border-white/10"
          >
            Add Treatment Event
          </motion.button>
        </div>
      </div>
      
      {/* Add Event Modal */}
      <AnimatePresence>
        {addingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setAddingEvent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl p-6 max-w-lg w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Add New Treatment Event</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                      <option value="scheduled">Scheduled</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Provider</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-20"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-20"></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAddingEvent(false)}
                  className="px-4 py-2 bg-white/5 text-gray-300 hover:bg-white/10 rounded-lg"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                >
                  Add Event
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterButton = ({ label, isActive, onClick, colorScheme = "blue" }) => {
  const getColors = () => {
    if (isActive) {
      switch (colorScheme) {
        case "green": return "bg-gradient-to-r from-green-600 to-green-500 text-white";
        case "purple": return "bg-gradient-to-r from-purple-600 to-purple-500 text-white";
        case "amber": return "bg-gradient-to-r from-amber-600 to-amber-500 text-white";
        default: return "bg-gradient-to-r from-blue-600 to-blue-500 text-white";
      }
    }
    return "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white";
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors shadow border border-white/10 ${getColors()}`}
    >
      {label}
    </motion.button>
  );
};

const TimelineEvent = ({ 
  event, 
  index, 
  colorScheme, 
  isSelected, 
  onSelect, 
  onMarkComplete, 
  onReschedule 
}) => {
  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'scheduled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'missed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Optimized animations config
  const notesAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }} // Reduced delay for faster rendering
      className={`mb-6 relative backdrop-blur-lg ${colorScheme.bg} rounded-xl p-5 border ${colorScheme.border} shadow-lg ${isSelected ? 'ring-2 ring-white/30' : ''}`}
      onClick={onSelect}
    >
      {/* Timeline dot */}
      <div className={`absolute -left-11 w-6 h-6 rounded-full ${colorScheme.icon} flex items-center justify-center text-white shadow-lg`}>
        <div className="w-4 h-4 flex items-center justify-center">
          {getStatusIcon(event.status)}
        </div>
      </div>
      
      {/* Date and Status */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-400 font-medium">
          {event.date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}>
          {event.status}
        </span>
      </div>
      
      {/* Title & Provider */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
        <div className="text-sm text-gray-300">Provider: {event.provider}</div>
      </div>
      
      {/* Description */}
      <p className="text-gray-300 mb-3">{event.description}</p>
      
      {/* Optimized notes section with lazy loading */}
      {event.notes && (
        <div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onSelect();
            }}
            className={`text-sm ${colorScheme.text} hover:opacity-80 focus:outline-none flex items-center`}
          >
            {isSelected ? 'Hide notes' : 'Show notes'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${isSelected ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <AnimatePresence>
            {isSelected && (
              <motion.div 
                {...notesAnimation}
                className="mt-3 p-4 bg-black/20 border border-white/5 rounded-lg text-gray-300 text-sm"
              >
                {event.notes}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      {/* Action buttons with contextual options based on status */}
      <div className="mt-4 flex justify-end flex-wrap gap-2">
        {event.status === 'scheduled' && (
          <>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onMarkComplete(event.id);
              }}
              className="text-sm bg-green-900/20 text-green-400 hover:text-green-300 px-3 py-1 rounded-lg border border-green-500/30"
            >
              Mark Complete
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-sm bg-white/10 text-gray-300 hover:text-white px-3 py-1 rounded-lg border border-white/10"
            >
              Reschedule
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-sm bg-red-900/20 text-red-400 hover:text-red-300 px-3 py-1 rounded-lg border border-red-500/30"
            >
              Cancel
            </motion.button>
          </>
        )}
        
        {event.status === 'missed' && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onReschedule(event.id);
            }}
            className="text-sm bg-blue-900/20 text-blue-400 hover:text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30"
          >
            Reschedule
          </motion.button>
        )}
        
        {event.status === 'pending' && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-sm bg-blue-900/20 text-blue-400 hover:text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30"
          >
            Schedule
          </motion.button>
        )}
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-sm bg-white/10 text-gray-300 hover:text-white px-3 py-1 rounded-lg border border-white/10"
        >
          Edit
        </motion.button>
      </div>
      
      {/* Progress indicator for scheduled events */}
      {event.status === 'scheduled' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Time until appointment</span>
            <span>3 days remaining</span>
          </div>
          <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colorScheme.progress}`}
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TreatmentTimeline;