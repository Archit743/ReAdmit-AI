import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FollowUpScheduler = ({ patient, prediction }) => {
  // State for form inputs and errors
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [visitType, setVisitType] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Example data for providers, visit types, and note templates
  const providers = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Internal Medicine', availability: ['Monday', 'Wednesday', 'Friday'] },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', availability: ['Tuesday', 'Thursday'] },
  ];

  const visitTypes = [
    { id: 'follow-up', label: 'Follow-up Visit' },
    { id: 'lab-review', label: 'Lab Results Review' },
    { id: 'medication', label: 'Medication Adjustment' },
    { id: 'specialist', label: 'Specialist Consultation' },
    { id: 'therapy', label: 'Physical Therapy' },
  ];

  const noteTemplates = {
    'follow-up': 'Routine follow-up to assess recovery progress.',
    'lab-review': 'Review recent lab results and discuss next steps.',
    'medication': 'Evaluate current medication effectiveness and adjust if necessary.',
    'specialist': 'Consult with specialist for further evaluation.',
    'therapy': 'Begin or continue physical therapy sessions.',
  };

  // Sample upcoming appointments with future dates
  const upcomingAppointments = [
    { id: 1, date: '2025-06-15', time: '10:00 AM', provider: 'Dr. Sarah Johnson', visitType: 'Follow-up Visit' },
    { id: 2, date: '2025-06-22', time: '2:30 PM', provider: 'Dr. Michael Chen', visitType: 'Specialist Consultation' },
  ];

  // Determine recommended follow-up based on risk level
  const getRecommendedFollowUp = () => {
    const riskLevel = prediction.readmissionRisk?.toLowerCase();
    if (riskLevel === 'high') return '1 week';
    if (riskLevel === 'medium' || riskLevel === 'moderate') return '2 weeks';
    return '4-6 weeks';
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = { patientId: patient.id, date: selectedDate, time: selectedTime, providerId: selectedProvider, visitType, notes };
    console.log('Schedule appointment:', appointment);
    alert('Appointment scheduled successfully! Details: ' + JSON.stringify(appointment, null, 2));
    // Clear the form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedProvider('');
    setVisitType('');
    setNotes('');
    setErrors({});
  };

  // Generate available time slots (9 AM to 4:30 PM)
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
  const today = new Date().toISOString().split('T')[0];

  // Validate date based on provider availability
  useEffect(() => {
    if (selectedProvider && selectedDate) {
      const provider = providers.find((p) => p.id === parseInt(selectedProvider));
      if (provider) {
        const dateObj = new Date(selectedDate);
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()];
        if (!provider.availability.includes(dayName)) {
          setErrors((prev) => ({ ...prev, date: 'Provider is not available on this day' }));
        } else {
          setErrors((prev) => ({ ...prev, date: '' }));
        }
      }
    } else {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
  }, [selectedProvider, selectedDate, providers]);

  // Styles for form inputs to match patient form
  const inputStyle = "w-full px-4 py-2.5 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white";
  const sectionStyle = "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-5";
  const sectionHeaderStyle = "px-4 py-2 bg-white/5 border-b border-white/10 text-sm font-medium text-gray-300";

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg p-7 w-full mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <motion.div 
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mr-3"
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Schedule Follow-Up</h2>
          <p className="text-gray-400 text-sm">Plan the next patient appointment</p>
        </div>
      </motion.div>

      {/* Recommended Follow-Up */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 mb-6 flex items-center"
      >
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
        <span className="text-sm text-gray-400 mr-2">Recommended follow-up:</span>
        <span className="text-sm font-medium text-white">
          {getRecommendedFollowUp()} (based on {prediction.readmissionRisk} risk)
        </span>
      </motion.div>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit}>
        {/* Date and Time Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Appointment Details</div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={inputStyle}
                  placeholder="Select Date"
                  required
                />
                {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
              </div>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className={`${inputStyle} bg-transparent`}
                  required
                >
                  <option value="" disabled className="bg-gray-800">Select Time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time} className="bg-gray-800">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative md:col-span-2">
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className={`${inputStyle} bg-transparent`}
                  required
                >
                  <option value="" disabled className="bg-gray-800">Select Provider</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id} className="bg-gray-800">
                      {provider.name} - {provider.specialty} ({provider.availability.join(', ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visit Type Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Visit Type</div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {visitTypes.map((type) => (
                <motion.label
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-3 rounded-xl cursor-pointer border backdrop-blur-sm ${
                    visitType === type.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
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
                </motion.label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notes Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Additional Notes</div>
          <div className="p-4 space-y-2">
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className={inputStyle}
                placeholder="Enter any special instructions or notes..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setNotes(noteTemplates[visitType] || '')}
              className="text-sm text-blue-400 hover:text-blue-300"
              disabled={!visitType}
            >
              Insert Template
            </motion.button>
          </div>
        </motion.div>

        {/* Appointment Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Appointment Preview</div>
          <div className="p-4">
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Date:</span> {selectedDate || 'Not selected'}
              </p>
              <p>
                <span className="text-gray-400">Time:</span> {selectedTime || 'Not selected'}
              </p>
              <p>
                <span className="text-gray-400">Provider:</span>{' '}
                {selectedProvider
                  ? providers.find((p) => p.id === parseInt(selectedProvider))?.name
                  : 'Not selected'}
              </p>
              <p>
                <span className="text-gray-400">Visit Type:</span>{' '}
                {visitType ? visitTypes.find((v) => v.id === visitType)?.label : 'Not selected'}
              </p>
              <p>
                <span className="text-gray-400">Notes:</span> {notes || 'None'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Patient's Upcoming Appointments</div>
          <div className="p-4">
            {upcomingAppointments.length > 0 ? (
              <ul className="space-y-3">
                {upcomingAppointments.map((appt) => (
                  <li key={appt.id} className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium text-sm">
                          {appt.date} at {appt.time}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {appt.provider} - {appt.visitType}
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">Reschedule</button>
                        <button className="text-red-400 hover:text-red-300 text-xs">Cancel</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-400 py-4 text-sm">No upcoming appointments scheduled.</div>
            )}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="flex justify-between mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-medium shadow-lg shadow-blue-600/20"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Appointment
            </span>
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default FollowUpScheduler;