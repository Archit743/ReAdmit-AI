import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FollowUpScheduler = ({ patient, prediction }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [visitType, setVisitType] = useState('');
  const [notes, setNotes] = useState('');
  
  // Example data - in a real app, these would come from an API or store
  const providers = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Internal Medicine', availability: ['Monday', 'Wednesday', 'Friday'] },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', availability: ['Tuesday', 'Thursday'] },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Endocrinology', availability: ['Monday', 'Tuesday', 'Friday'] },
    { id: 4, name: 'Dr. David Kim', specialty: 'Nephrology', availability: ['Wednesday', 'Thursday', 'Friday'] }
  ];
  
  const visitTypes = [
    { id: 'follow-up', label: 'Follow-up Visit' },
    { id: 'lab-review', label: 'Lab Results Review' },
    { id: 'medication', label: 'Medication Adjustment' },
    { id: 'specialist', label: 'Specialist Consultation' },
    { id: 'therapy', label: 'Physical Therapy' }
  ];
  
  // Calculate recommended follow-up timing based on risk level
  const getRecommendedFollowUp = () => {
    const riskLevel = prediction.readmissionRisk?.toLowerCase();
    
    if (riskLevel === 'high') {
      return '1 week';
    } else if (riskLevel === 'medium' || riskLevel === 'moderate') {
      return '2 weeks';
    } else {
      return '4-6 weeks';
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would dispatch an action to schedule the appointment
    console.log('Schedule appointment:', {
      patientId: patient.id,
      date: selectedDate,
      time: selectedTime,
      providerId: selectedProvider,
      visitType,
      notes
    });
    
    // Reset form or show confirmation
    alert('Appointment scheduled successfully!');
  };
  
  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      const hourFormatted = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      
      slots.push(`${hourFormatted}:00 ${period}`);
      slots.push(`${hourFormatted}:30 ${period}`);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Calculate today's date for the min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl text-white font-bold mb-2">Follow-up Scheduler</h2>
        <p className="text-gray-400">
          Based on the patient's risk level ({prediction.readmissionRisk}), we recommend scheduling a follow-up in {getRecommendedFollowUp()}.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Scheduling form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg p-5"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date picker */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Appointment Date</label>
                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                {/* Time picker */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Appointment Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Provider selection */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm">Select Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a provider</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name} - {provider.specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Visit type */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm">Visit Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {visitTypes.map((type) => (
                    <label 
                      key={type.id} 
                      className={`
                        flex items-center p-3 rounded-md cursor-pointer border 
                        ${visitType === type.id 
                          ? 'bg-indigo-800 border-indigo-600 text-white' 
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-650'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="visitType"
                        value={type.id}
                        checked={visitType === type.id}
                        onChange={() => setVisitType(type.id)}
                        className="hidden"
                      />
                      <span className="ml-2">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Notes */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter any special instructions or notes for this appointment..."
                ></textarea>
              </div>
              
              {/* Submit button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                >
                  Schedule Follow-up Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        
        {/* Right column - Provider info and recommendations */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-5 mb-6"
          >
            <h3 className="text-white font-semibold mb-3">Recommended Follow-up</h3>
            
            <div className="mb-4 p-3 bg-indigo-900 bg-opacity-30 border border-indigo-800 rounded-md">
              <div className="text-sm text-gray-300 mb-1">Based on risk assessment:</div>
              <div className="text-white font-medium">
                Schedule follow-up within {getRecommendedFollowUp()}
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-gray-300 font-medium mb-2">Recommended Providers</h4>
              <ul className="space-y-2">
                {providers.slice(0, 2).map((provider) => (
                  <li key={provider.id} className="flex items-start p-2 rounded-md hover:bg-gray-700">
                    <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-indigo-400">
                      {provider.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{provider.name}</div>
                      <div className="text-gray-400 text-sm">{provider.specialty}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-5"
          >
            <h3 className="text-white font-semibold mb-3">Follow-up Calendar</h3>
            
            <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-500 mb-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="text-gray-400 text-sm">
                Select a date to view calendar availability
              </p>
            </div>
            
            <div className="mt-4">
              <button className="w-full text-indigo-400 border border-indigo-800 hover:bg-indigo-900 hover:bg-opacity-30 px-4 py-2 rounded-md text-sm transition-colors">
                View Full Calendar
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Upcoming appointments */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">Patient's Upcoming Appointments</h3>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-center text-gray-400 py-6">
            No upcoming appointments scheduled.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpScheduler;