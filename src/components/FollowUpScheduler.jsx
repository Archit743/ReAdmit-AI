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

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden p-6 relative z-10">
      {/* Background effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>

      {/* Header */}
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
        Schedule Follow-Up
      </h3>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Appointment Date</label>
            <div className="relative">
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                required
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Appointment Time</label>
            <div className="relative">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 appearance-none"
                required
              >
                <option value="" disabled className="text-gray-500">
                  Select a time
                </option>
                {timeSlots.map((time) => (
                  <option key={time} value={time} className="text-gray-800">
                    {time}
                  </option>
                ))}
              </select>
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Provider Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Provider</label>
          <div className="relative">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 appearance-none"
              required
            >
              <option value="" disabled className="text-gray-500">
                Select a provider
              </option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id} className="text-gray-800">
                  {provider.name} - {provider.specialty} ({provider.availability.join(', ')})
                </option>
              ))}
            </select>
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Visit Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Visit Type</label>
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

        {/* Notes Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              placeholder="Enter any special instructions or notes..."
            />
            <svg
              className="absolute left-3 top-6 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setNotes(noteTemplates[visitType] || '')}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            disabled={!visitType}
          >
            Insert Template
          </motion.button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg border border-white/10"
          >
            Schedule Appointment
          </motion.button>
        </div>
      </form>

      {/* Appointment Preview */}
      <div className="mt-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-5">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Appointment Preview</h4>
        <div className="space-y-2">
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

      {/* Recommended Follow-Up */}
      <div className="mt-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-5">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Recommended Follow-Up</h4>
        <p className="text-gray-400 text-sm">
          Based on risk assessment ({prediction.readmissionRisk}), we recommend follow-up in{' '}
          {getRecommendedFollowUp()}.
        </p>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Patient's Upcoming Appointments</h4>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-5">
          {upcomingAppointments.length > 0 ? (
            <ul className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id} className="bg-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">
                        {appt.date} at {appt.time}
                      </div>
                      <div className="text-gray-300">
                        {appt.provider} - {appt.visitType}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Reschedule</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Cancel</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-400 py-6">No upcoming appointments scheduled.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowUpScheduler;