import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updatePatientApprovalStatus } from '../features/patientSlice';

const ActionFooter = ({ patient, prediction }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const patientId = patient?._id || patient?.id;
  const patientApprovalStatus = useSelector(state => 
    state.patients?.patientApprovals?.[patientId] || { isApproved: false }
  );

    // Update local state if Redux store changes
    useEffect(() => {
      if (patientApprovalStatus.isApproved) {
        setIsApproved(true);
        setApproveSuccess(true);
      }
    }, [patientApprovalStatus]);

  // Setup afterprint event listener
  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintSuccess(true);
      setTimeout(() => {
        setPrintSuccess(false);
      }, 3000);
    };
    
    if (isPrinting) {
      window.addEventListener('afterprint', handleAfterPrint);
    }
    
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [isPrinting]);
  
  // Get color classes based on color name - similar to the RiskFactors component
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        text: "text-blue-400",
        hover: "hover:text-blue-300",
        gradient: "from-blue-500 to-blue-600",
        border: "border-blue-500/30"
      },
      purple: {
        text: "text-purple-400",
        hover: "hover:text-purple-300",
        gradient: "from-purple-500 to-purple-600",
        border: "border-purple-500/30"
      },
      amber: {
        text: "text-amber-400",
        hover: "hover:text-amber-300",
        gradient: "from-amber-500 to-amber-600",
        border: "border-amber-500/30"
      },
      green: {
        text: "text-green-400",
        hover: "hover:text-green-300",
        gradient: "from-green-500 to-green-600",
        border: "border-green-500/30"
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

    // Get risk level and color based on risk score
    const getRiskLevelAndColor = (riskScore) => {
      const score = parseFloat(riskScore);
      if (score >= 50) return { level: 'High', color: 'red' };
      if (score >= 30) return { level: 'Medium', color: 'orange' };
      return { level: 'Low', color: 'green' };
    };
  
    // Format date for better readability
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

  // Print report function
  const handlePrintReport = () => {
    setIsPrinting(true);
    
    // Safely access values with fallbacks to prevent 'Unknown' values
    const patientName = patient?.name || 'N/A';
    const patientId = patient?.id || patient?._id || 'N/A';
    const dateOfBirth = patient?.dateOfBirth ? formatDate(patient?.dateOfBirth) : 'N/A';
    const riskScore = prediction?.readmissionRisk || prediction?.riskScore || 'N/A';
    const patientGender = patient?.gender || 'N/A';
    const patientAge = patient?.age || 'N/A';
    
    // Get risk level and color
    const { level: riskLevel, color: riskColor } = getRiskLevelAndColor(riskScore);
    
    // Check if we have recommendations
    const hasRecommendations = prediction?.recommendations && prediction.recommendations.length > 0;
    
    // Create a hidden iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.top = '-9999px';
    document.body.appendChild(printFrame);
    
    printFrame.contentDocument.open();
    printFrame.contentDocument.write(`
      <html>
        <head>
          <title>Patient Readmission Risk Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .report-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #ddd;
              margin-bottom: 20px;
            }
            h1 {
              color: #2c3e50;
              margin-bottom: 10px;
            }
            h2 {
              color: #3498db;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
              margin-top: 20px;
            }
            .patient-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 25px;
            }
            .info-item {
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              display: inline-block;
              min-width: 120px;
            }
            .risk-score {
              font-size: 1.2em;
              padding: 10px;
              border-radius: 5px;
              margin: 15px 0;
              display: inline-block;
            }
            .high-risk {
              background-color: #ffebee;
              color: #c62828;
              border-left: 4px solid #c62828;
            }
            .medium-risk {
              background-color: #fff8e1;
              color: #ff8f00;
              border-left: 4px solid #ff8f00;
            }
            .low-risk {
              background-color: #e8f5e9;
              color: #2e7d32;
              border-left: 4px solid #2e7d32;
            }
            .recommendations {
              margin: 20px 0;
            }
            .recommendation-item {
              padding: 8px 0;
              border-bottom: 1px dotted #eee;
            }
            .recommendation-category {
              font-style: italic;
              color: #7f8c8d;
              margin-left: 5px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #ddd;
              font-size: 0.9em;
              color: #7f8c8d;
            }
            .disclaimer {
              font-style: italic;
              margin-top: 10px;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .header, .footer {
                position: relative;
              }
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <h1>Patient Readmission Risk Assessment</h1>
              <p>Generated on ${new Date().toLocaleString()}</p>
            </div>
            
            <h2>Patient Information</h2>
            <div class="patient-info">
              <div class="info-item"><span class="label">ID:</span> ${patientId}</div>
              <div class="info-item"><span class="label">Gender:</span> ${patientGender}</div>
              <div class="info-item"><span class="label">Age:</span> ${patientAge}</div>
            </div>
            
            <h2>Risk Assessment Results</h2>
            <div class="info-item">
              <div class="risk-score ${riskColor === 'red' ? 'high-risk' : riskColor === 'orange' ? 'medium-risk' : 'low-risk'}">
                <span class="label">Readmission Risk:</span> ${riskScore}% (${riskLevel} Risk)
              </div>
            </div>
            
            ${prediction?.summary ? `
            <div class="info-item">
              <span class="label">Summary:</span>
              <p>${prediction.summary}</p>
            </div>
            ` : ''}
            
            ${hasRecommendations ? `
            <h2>Clinical Recommendations</h2>
            <div class="recommendations">
              ${prediction.recommendations.map(rec => `
                <div class="recommendation-item">
                  ${rec.text || rec} ${rec.category ? `<span class="recommendation-category">(${rec.category})</span>` : ''}
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            <div class="footer">
              <p>Report generated by Hospital Readmission Risk Assessment Tool</p>
              <p class="disclaimer">This assessment is a clinical decision support tool and should be used in conjunction with clinical judgment. It does not replace the need for proper clinical evaluation.</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printFrame.contentDocument.close();
    
    // Print and remove the iframe
    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
      
      // Trigger the main window print event for the afterprint listener
      window.dispatchEvent(new Event('afterprint'));
      
      // Reset the printing state
      setIsPrinting(false);
      
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }, 500);
  };

  // Share function
  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create shareable content
      const shareableContent = {
        patientId: patient?.id,
        patientName: patient?.name,
        predictionData: prediction,
        timestamp: new Date().toISOString(),
        sharedBy: 'Current User'
      };
      
      // Log the shared content to show something is happening
      console.log('Shared content:', shareableContent);
      
      setShareSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShareSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sharing report:', error);
      alert('Failed to share report. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleApprovePlan = async () => {
    if (isApproved) {
      return;
    }
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const approvedAt = new Date().toISOString();
      
      // Check which ID field is actually available on your patient object
      console.log("Patient object:", patient);
      
      // Use the correct ID field - try both possibilities
      const patientId = patient?._id || patient?.id;
      
      if (!patientId) {
        console.error("No patient ID found:", patient);
        alert("Error: No patient ID found");
        return;
      }
      
      const approvalData = {
        patientId: patientId,
        predictionId: prediction?.id,
        approvedAt: approvedAt,
        status: 'APPROVED'
      };
      
      console.log('Approval data:', approvalData);
      
      // Update the Redux store with approval status
      dispatch(updatePatientApprovalStatus({
        patientId: patientId,
        status: 'APPROVED',  // Add this explicitly 
        isApproved: true,    // Add this explicitly
        approvedAt: approvedAt,
      }));
      setIsApproved(true);
      setApproveSuccess(true);
      
      setTimeout(() => {
        setApproveSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error approving plan:', error);
      alert('Failed to approve plan. Please try again.');
    }
  };

  // Save to patient record function
  const handleSaveToRecord = async () => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const recordData = {
        patientId: patient?.id,
        predictionData: prediction,
        savedAt: new Date().toISOString(),
        savedBy: 'Current User',
        recordType: 'PREDICTION_RESULT'
      };
      
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        navigate('/');
        setSaveSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving to patient record:', error);
    }
  };

  // Button variants for different actions
  const buttonVariants = {
    standard: {
      className: "text-sm px-4 py-2 rounded-lg border border-white/10 flex items-center transition-colors shadow-lg",
      colors: (color) => {
        const classes = getColorClasses(color);
        return `${classes.text} ${classes.hover} border-${color}-500/30`;
      }
    },
    filled: {
      className: "text-sm px-4 py-2 rounded-lg text-white flex items-center shadow-lg",
      colors: (color) => {
        const classes = getColorClasses(color);
        return `bg-gradient-to-br ${classes.gradient}`;
      }
    }
  };

  // Tooltip component
  const ButtonTooltip = ({ active, label }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
      className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap"
    >
      {label}
    </motion.div>
  );

  const blueColors = getColorClasses("blue");
  const purpleColors = getColorClasses("purple");
  const amberColors = getColorClasses("amber");
  const greenColors = getColorClasses("green");

  return (
    <div className="px-6 py-4 border-t border-white/10 flex flex-wrap gap-2 justify-between items-center">
      <div className="flex flex-wrap gap-3">
        <motion.div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${buttonVariants.standard.className} ${blueColors.text} ${blueColors.hover} ${blueColors.border}`}
            onClick={handlePrintReport}
          >
            <div className={`p-2 bg-gradient-to-br ${blueColors.gradient} rounded-lg text-white flex-shrink-0 shadow-lg mr-2`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            Print Report
          </motion.button>
          <ButtonTooltip active={printSuccess} label="Print completed successfully!" />
        </motion.div>

        <motion.div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${buttonVariants.standard.className} ${purpleColors.text} ${purpleColors.hover} ${purpleColors.border}`}
            onClick={handleShare}
            disabled={isSharing}
          >
            <div className={`p-2 bg-gradient-to-br ${purpleColors.gradient} rounded-lg text-white flex-shrink-0 shadow-lg mr-2`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            {isSharing ? 'Sharing...' : shareSuccess ? 'Shared!' : 'Share'}
          </motion.button>
          <ButtonTooltip active={shareSuccess} label="Successfully shared!" />
        </motion.div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <motion.div className="relative">
          <motion.button 
            whileHover={{ scale: isApproved ? 1 : 1.05 }}
            whileTap={{ scale: isApproved ? 1 : 0.95 }}
            className={`${buttonVariants.filled.className} ${buttonVariants.filled.colors(isApproved ? "green" : "amber")}`}
            onClick={handleApprovePlan}
            disabled={isApproved}
          >
            <div className={`p-2 bg-gradient-to-br ${isApproved ? greenColors.gradient : amberColors.gradient} rounded-lg text-white flex-shrink-0 shadow-lg mr-2`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {approveSuccess ? 'Approved!' : 'Approve Plan'}
          </motion.button>
          <ButtonTooltip active={approveSuccess} label="Plan approved successfully!" />
        </motion.div>

        <motion.div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${buttonVariants.filled.className} ${buttonVariants.filled.colors("blue")}`}
            onClick={handleSaveToRecord}
          >
            <div className={`p-2 bg-gradient-to-br ${blueColors.gradient} rounded-lg text-white flex-shrink-0 shadow-lg mr-2`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            {saveSuccess ? 'Saved!' : 'Save to Patient Record'}
          </motion.button>
          <ButtonTooltip active={saveSuccess} label="Saved to patient record!" />
        </motion.div>
      </div>
    </div>
  );
};

export default ActionFooter;