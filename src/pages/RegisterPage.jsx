import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerHospital } from '../features/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [hospitalData, setHospitalData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    physicianName: ''
  });
  const [localError, setLocalError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({
      ...hospitalData,
      [name]: value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (hospitalData.password !== hospitalData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    
    // Clear any previous local errors
    setLocalError('');
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...dataToSubmit } = hospitalData;
    
    dispatch(registerHospital(dataToSubmit));
  };

  const nextStep = () => {
    if (currentStep === 1 && (!hospitalData.name || !hospitalData.email)) {
      setLocalError('Please fill all fields before proceeding');
      return;
    }
    if (currentStep === 2 && (!hospitalData.department || !hospitalData.physicianName)) {
      setLocalError('Please fill all fields before proceeding');
      return;
    }
    setLocalError('');
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600' : 'bg-white/10'} transition-colors duration-300`}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: currentStep === step ? 1.1 : 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-white font-medium">{step}</span>
              )}
            </motion.div>
            {step < 3 && (
              <motion.div 
                className={`w-16 h-1 rounded-full ${currentStep > step ? 'bg-blue-600' : 'bg-white/10'}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const formContainerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-2xl shadow-2xl w-full max-w-150 p-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Hospital Registration</h2>
          <p className="text-gray-400 mb-2">Join our network of healthcare providers</p>
          
          {renderStepIndicator()}
        </motion.div>
        
        {(error || localError) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error || localError}</span>
            </div>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Hospital Information</h3>
                <p className="text-gray-400 text-sm mb-4">Let's start with your basic details</p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Hospital Name</label>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={hospitalData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="Enter hospital name"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={hospitalData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="Enter email address"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Department Details</h3>
                <p className="text-gray-400 text-sm mb-4">Tell us about your specialization</p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="department" className="text-sm font-medium text-gray-300">Department</label>
                  </div>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={hospitalData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="E.g. Cardiology"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="physicianName" className="text-sm font-medium text-gray-300">Physician Name</label>
                  </div>
                  <input
                    type="text"
                    id="physicianName"
                    name="physicianName"
                    value={hospitalData.physicianName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="Lead physician name"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4">
                <h3 className="text-lg font-medium text-white mb-2">Security Setup</h3>
                <p className="text-gray-400 text-sm mb-4">Create a secure password for your account</p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={hospitalData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="Create password"
                  />
                  {hospitalData.password && (
                    <div className="px-4 pb-2">
                      <div className="flex items-center space-x-2 mt-2">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 rounded-full flex-1 ${i < passwordStrength ? [
                              'bg-red-500', 
                              'bg-orange-500', 
                              'bg-yellow-500', 
                              'bg-green-500'
                            ][passwordStrength - 1] : 'bg-gray-700'}`}
                          />
                        ))}
                      </div>
                      <div className="text-xs mt-1 text-gray-400">
                        {passwordStrength === 0 && "Very weak"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Medium"}
                        {passwordStrength === 3 && "Strong"}
                        {passwordStrength === 4 && "Very strong"}
                      </div>
                    </div>
                  )}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={hospitalData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white"
                    placeholder="Confirm password"
                  />
                  {hospitalData.password && hospitalData.confirmPassword && (
                    <div className="px-4 pb-2">
                      <div className="text-xs mt-1 flex items-center">
                        {hospitalData.password === hospitalData.confirmPassword ? (
                          <>
                            <svg className="w-3 h-3 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-500">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-red-500">Passwords don't match</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Registration Summary</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Hospital:</span>
                    <span className="text-white">{hospitalData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-white">{hospitalData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span className="text-white">{hospitalData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physician:</span>
                    <span className="text-white">{hospitalData.physicianName}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-8 flex items-center justify-between"
          >
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={prevStep}
                className="py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </motion.button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={nextStep}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg shadow-blue-600/20"
              >
                <span className="flex items-center">
                  Next Step
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`py-3.5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg shadow-blue-600/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Registering...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Complete Registration
                  </span>
                )}
              </motion.button>
            )}
          </motion.div>
        </form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="text-gray-400 mb-4">
            Already have an account?
          </div>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-blue-400 hover:text-blue-300 hover:bg-white/10 transition-colors w-full flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to your account
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="text-gray-400 text-xs">Secure Registration</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-gray-400 text-xs">HIPAA Compliant</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="text-gray-400 text-xs">End-to-End Encrypted</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;