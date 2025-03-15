import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPatientData, addPatientRecord, setPredictionResult, savePatientRecord } from "../features/patientSlice";
import { motion } from "framer-motion";
import FormSection from "./FormSection";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextAreaInput from "./inputs/TextAreaInput";
import FileUploadSection from "./FileUploadSection";

const PatientForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    medicalHistory: "",
    currentMedications: "",
    primaryDiagnosis: "",
    lengthOfStay: "",
    previousAdmissions: ""
  });
  const [fileUrls, setFileUrls] = useState([]);

  const autofillStyle = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    background-color: transparent !important;
  }
`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newPatient = { 
        ...patientInfo, 
        fileUrls,
        id: patientInfo.patientId, // No timestamp appended
        diagnosis: patientInfo.primaryDiagnosis,
        date: new Date().toLocaleDateString(),
        readmissionRisk: "Unknown"
      };
      

      dispatch(setPatientData(newPatient));
      dispatch(savePatientRecord(newPatient));
      dispatch(addPatientRecord(newPatient));
      
      // Simulate fetching prediction result
      const hardcodedPrediction = {
        readmissionRisk: "Medium",
        probability: 0.65,
      };

      dispatch(setPredictionResult(hardcodedPrediction));
      navigate("/results");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Styles for form inputs to match login page
  const inputStyle = "w-full px-4 py-2.5 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white";
  const sectionStyle = "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-5";
  const sectionHeaderStyle = "px-4 py-2 bg-white/5 border-b border-white/10 text-sm font-medium text-gray-300";

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg p-7 w-full mx-auto">
      <style>{autofillStyle}</style>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 mr-3"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">New Patient Entry</h2>
            <p className="text-gray-400 text-sm">Enter patient details below</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 mb-6 flex items-center"
      >
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
        <span className="text-sm text-gray-400 mr-2">Patient ID:</span>
        <span className="text-sm font-medium text-white">{patientInfo.patientId}</span>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Personal Details</div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={patientInfo.firstName}
                  onChange={handleInputChange}
                  required
                  className={inputStyle}
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={patientInfo.lastName}
                  onChange={handleInputChange}
                  required
                  className={inputStyle}
                  placeholder="Last Name"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={patientInfo.age}
                  onChange={handleInputChange}
                  required
                  className={inputStyle}
                  placeholder="Age"
                />
              </div>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={patientInfo.gender}
                  onChange={handleInputChange}
                  required
                  className={`${inputStyle} bg-transparent`}
                >
                  <option value="" className="bg-gray-800">Select Gender</option>
                  <option value="male" className="bg-gray-800">Male</option>
                  <option value="female" className="bg-gray-800">Female</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Medical Information</div>
          <div className="p-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                id="primaryDiagnosis"
                name="primaryDiagnosis"
                value={patientInfo.primaryDiagnosis}
                onChange={handleInputChange}
                required
                className={inputStyle}
                placeholder="Primary Diagnosis"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  id="lengthOfStay"
                  name="lengthOfStay"
                  value={patientInfo.lengthOfStay}
                  onChange={handleInputChange}
                  required
                  className={inputStyle}
                  placeholder="Length of Stay (days)"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="previousAdmissions"
                  name="previousAdmissions"
                  value={patientInfo.previousAdmissions}
                  onChange={handleInputChange}
                  required
                  className={inputStyle}
                  placeholder="Previous Admissions"
                />
              </div>
            </div>
            
            <div className="relative">
              <textarea
                id="currentMedications"
                name="currentMedications"
                value={patientInfo.currentMedications}
                onChange={handleInputChange}
                className={inputStyle}
                rows="2"
                placeholder="Current Medications"
              ></textarea>
            </div>
            
            <div className="relative">
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={patientInfo.medicalHistory}
                onChange={handleInputChange}
                className={inputStyle}
                rows="3"
                placeholder="Medical History"
              ></textarea>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={sectionStyle}
        >
          <div className={sectionHeaderStyle}>Document Upload</div>
          <div className="p-4">
            <FileUploadSection fileUrls={fileUrls} setFileUrls={setFileUrls} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex justify-between mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-medium shadow-lg shadow-blue-600/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Record
              </span>
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default PatientForm;