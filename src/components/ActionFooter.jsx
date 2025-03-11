import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ActionFooter = ({ patient, prediction }) => {
    const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [approveSuccess, setApproveSuccess] = useState(false);

  // Print report function
  const handlePrintReport = () => {
    // Create a printable version of patient data and prediction
    const printContent = `
      Patient: ${patient?.name || 'Unknown'}
      ID: ${patient?.id || 'Unknown'}
      Prediction: ${prediction?.summary || 'No prediction available'}
      Risk Score: ${prediction?.riskScore || 'N/A'}
      Date: ${new Date().toLocaleDateString()}
    `;
    
    // Create a hidden iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.top = '-9999px';
    document.body.appendChild(printFrame);
    
    printFrame.contentDocument.open();
    printFrame.contentDocument.write(`
      <html>
        <head>
          <title>Patient Report</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h1 { color: #333; }
            .report-container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .patient-info { margin-bottom: 20px; }
            .prediction-info { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="report-container">
            <h1>Patient Medical Report</h1>
            <div class="patient-info">
              <h2>Patient Information</h2>
              <p><strong>Name:</strong> ${patient?.name || 'Unknown'}</p>
              <p><strong>ID:</strong> ${patient?.id || 'Unknown'}</p>
              <p><strong>DOB:</strong> ${patient?.dateOfBirth || 'Unknown'}</p>
            </div>
            <div class="prediction-info">
              <h2>Prediction Results</h2>
              <p><strong>Summary:</strong> ${prediction?.summary || 'No prediction available'}</p>
              <p><strong>Risk Score:</strong> ${prediction?.riskScore || 'N/A'}</p>
              <p><strong>Recommendations:</strong> ${prediction?.recommendations || 'None provided'}</p>
            </div>
            <div class="footer">
              <p>Report generated on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printFrame.contentDocument.close();
    
    // Print and remove the iframe
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
    
    // Remove iframe after printing
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1000);
  };

  // Share function
  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Example API call to share the report
      // In a real application, you would implement a proper sharing mechanism
      // This could include email, secure messaging, or integration with an EMR system
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create shareable content
      const shareableContent = {
        patientId: patient?.id,
        patientName: patient?.name,
        predictionData: prediction,
        timestamp: new Date().toISOString(),
        sharedBy: 'Current User' // In a real app, this would be the logged-in user
      };
      
      // Here you would make the actual API call
      // const response = await api.shareReport(shareableContent);
      
      setShareSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShareSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sharing report:', error);
      // Handle error (could show an error message)
    } finally {
      setIsSharing(false);
    }
  };

  // Approve plan function
  const handleApprovePlan = async () => {
    try {
      // Example API call to approve the treatment plan
      // In a real app, this would update the database
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const approvalData = {
        patientId: patient?.id,
        predictionId: prediction?.id,
        approvedAt: new Date().toISOString(),
        approvedBy: 'Current User', // Would be the logged-in user
        status: 'APPROVED'
      };
      
      // Here you would make the actual API call
      // const response = await api.approvePlan(approvalData);
      
      setApproveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setApproveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error approving plan:', error);
      // Handle error
    }
  };

  // Save to patient record function
  const handleSaveToRecord = async () => {
    try {
      // Example API call to save the prediction to the patient's medical record
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const recordData = {
        patientId: patient?.id,
        predictionData: prediction,
        savedAt: new Date().toISOString(),
        savedBy: 'Current User', // Would be the logged-in user
        recordType: 'PREDICTION_RESULT'
      };
      
      // Here you would make the actual API call
      // const response = await api.saveToPatientRecord(recordData);
      
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        navigate('/')
        setSaveSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving to patient record:', error);
      // Handle error
    }
  };

  return (
    <div className="px-6 py-4 bg-gray-850 border-t border-gray-700 flex flex-wrap gap-2 justify-between items-center">
      <div className="flex flex-wrap gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center"
          onClick={handlePrintReport}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Report
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center"
          onClick={handleShare}
          disabled={isSharing}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {isSharing ? 'Sharing...' : shareSuccess ? 'Shared!' : 'Share'}
        </motion.button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center"
          onClick={handleApprovePlan}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {approveSuccess ? 'Approved!' : 'Approve Plan'}
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm flex items-center"
          onClick={handleSaveToRecord}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          {saveSuccess ? 'Saved!' : 'Save to Patient Record'}
        </motion.button>
      </div>
    </div>
  );
};

export default ActionFooter;