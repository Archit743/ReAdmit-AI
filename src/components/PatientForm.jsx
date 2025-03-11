import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPatientData, addPatientRecord, setPredictionResult } from "../features/patientSlice";
import FormSection from "./FormSection";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextAreaInput from "./inputs/TextAreaInput";
import FileUploadSection from "./FileUploadSection";
import SubmitButton from "./SubmitButton";

const PatientForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`, // Generate a unique ID
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
  const [fileUrls, setFileUrls] = useState([]); // Store uploaded file URLs

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
            id: `${patientInfo.patientId}-${Date.now()}`, // Add a unique ID
            diagnosis: patientInfo.primaryDiagnosis, // Map to expected field name
            date: new Date().toLocaleDateString(), // Add a date field
            readmissionRisk: "Unknown" // Add default value for readmission risk
        };

        dispatch(setPatientData(newPatient)); // Store current patient details
        dispatch(addPatientRecord(newPatient)); // Add to records list
        console.log("New Record Added:", newPatient);
        alert("Patient record added successfully!");
        // Simulate fetching prediction result from API
        // Instead of calling the API, use a hardcoded response
        const hardcodedPrediction = {
            readmissionRisk: "Medium",
            probability: 0.65,
        };

        dispatch(setPredictionResult(hardcodedPrediction));  // Store in Redux

        // Redirect to the results page
        navigate("/results");
        onClose(); // Close the form after submission
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">New Patient Entry</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-4 flex items-center bg-gray-700 p-2 rounded-lg">
        <span className="text-sm text-gray-400 mr-2">Patient ID:</span>
        <span className="text-sm font-medium text-white">{patientInfo.patientId}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSection title="Personal Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="First Name" id="firstName" name="firstName" value={patientInfo.firstName} onChange={handleInputChange} autoComplete="firstName" required />
            <TextInput label="Last Name" id="lastName" name="lastName" value={patientInfo.lastName} onChange={handleInputChange} required />
            <TextInput label="Age" id="age" name="age" type="number" value={patientInfo.age} onChange={handleInputChange} required />
            <SelectInput
              label="Gender"
              id="gender"
              name="gender"
              value={patientInfo.gender}
              onChange={handleInputChange}
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              required
            />
          </div>
        </FormSection>

        <FormSection title="Medical Information">
          <TextInput label="Primary Diagnosis" id="primaryDiagnosis" name="primaryDiagnosis" value={patientInfo.primaryDiagnosis} onChange={handleInputChange} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TextInput label="Length of Stay (days)" id="lengthOfStay" name="lengthOfStay" type="number" value={patientInfo.lengthOfStay} onChange={handleInputChange} required />
            <TextInput label="Previous Admissions" id="previousAdmissions" name="previousAdmissions" type="number" value={patientInfo.previousAdmissions} onChange={handleInputChange} required />
          </div>
          <TextAreaInput label="Current Medications" id="currentMedications" name="currentMedications" value={patientInfo.currentMedications} onChange={handleInputChange} rows="2" />
          <TextAreaInput label="Medical History" id="medicalHistory" name="medicalHistory" value={patientInfo.medicalHistory} onChange={handleInputChange} rows="3" />
        </FormSection>

        {/* File Upload Section (Handles Cloudinary Uploads) */}
        <FileUploadSection fileUrls={fileUrls} setFileUrls={setFileUrls} />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
