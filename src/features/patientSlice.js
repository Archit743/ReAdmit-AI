import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL - replace with your actual API endpoint
const API_URL = 'http://localhost:5000/api';

// Helper function to fetch with authorization
const fetchWithAuth = async (url, options, getState) => {
  const { auth } = getState();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.token}`,
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// Async thunks for API operations

export const fetchWeeklyStats = createAsyncThunk(
  'patient/fetchWeeklyStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the API response
      const response = await fetchWithAuth(`${API_URL}/stats/weekly`, { method: 'GET' }, getState);
      
      // Log the API response for debugging
      console.log('API weekly stats response:', response);
      
      // Return the unmodified API response
      return response;
    } catch (error) {
      console.error('Failed to fetch weekly stats:', error);
      
      // Use mock data if in development mode or API fails
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data due to API error');
        return {
          currentWeek: {
            totalPatients: 87,
            pendingAssessments: 12,
            unapprovedAssessments: 10,
            avgReadmissionRisk: 42.3,
            highRiskPatients: 15
          },
          lastWeek: {
            totalPatients: 82,
            pendingAssessments: 14,
            unapprovedAssessments: 13,
            avgReadmissionRisk: 45.7,
            highRiskPatients: 18
          },
          trendData: [
            { week: 'Feb 15-21', totalPatients: 78, avgReadmissionRisk: 48.2, highRiskPatients: 20, pendingAssessments: 18, unapprovedAssessments: 14 },
            { week: 'Feb 22-28', totalPatients: 82, avgReadmissionRisk: 45.7, highRiskPatients: 18, pendingAssessments: 14, unapprovedAssessments: 12 },
            { week: 'Mar 1-7', totalPatients: 85, avgReadmissionRisk: 44.1, highRiskPatients: 17, pendingAssessments: 13, unapprovedAssessments: 11 },
            { week: 'Mar 8-14', totalPatients: 87, avgReadmissionRisk: 42.3, highRiskPatients: 15, pendingAssessments: 12, unapprovedAssessments: 10 }
          ]
        };
      }
      
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  'patient/fetchRecommendations',
  async (recommendationData, { getState, rejectWithValue }) => {
    try {
      const { patientData, prediction } = recommendationData;
      
      // Parse risk values properly - convert to number if needed
      const riskValue = typeof prediction.readmissionRisk === 'number' 
        ? prediction.readmissionRisk 
        : parseFloat(prediction.readmissionRisk);
      
      // Determine risk category
      const getRiskCategory = (value) => {
        if (value >= 50) return 'high';
        if (value >= 30) return 'medium';
        return 'low';
      };
      
      const riskCategory = getRiskCategory(riskValue);
      
      // Prepare the payload
      const payload = {
        riskCategory,
        riskValue,
        patientData
      };
      
      // Make the API call
      const { auth } = getState();
      const response = await fetchWithAuth(`${API_URL}/recommendations`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }, getState);
      
      return response;
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      
      // In development, use mock data
      if (process.env.NODE_ENV === 'development') {
        // Determine risk category
        const riskValue = typeof recommendationData.prediction.readmissionRisk === 'number' 
          ? recommendationData.prediction.readmissionRisk 
          : parseFloat(recommendationData.prediction.readmissionRisk);
        
        const getRiskCategory = (value) => {
          if (value >= 50) return 'high';
          if (value >= 30) return 'medium';
          return 'low';
        };
        
        const riskCategory = getRiskCategory(riskValue);
        
        // Return mock data based on risk category
        let recommendations = [];
        
        if (riskCategory === 'high') {
          recommendations = [
            {
              text: "Schedule follow-up appointment within 2 weeks of discharge",
              category: "Follow-up Care"
            },
            {
              text: "Connect patient with care coordinator for transition support",
              category: "Care Coordination"
            },
            {
              text: "Review medication adherence plan with patient and caregiver",
              category: "Medication Management"
            },
            {
              text: "Consider home health services assessment",
              category: "Home Care"
            },
            {
              text: "Monitor vital signs daily for first week post-discharge",
              category: "Monitoring"
            }
          ];
        } else if (riskCategory === 'medium') {
          recommendations = [
            {
              text: "Schedule follow-up appointment within 30 days",
              category: "Follow-up Care"
            },
            {
              text: "Medication adherence monitoring recommended",
              category: "Medication Management"
            },
            {
              text: "Provide detailed discharge instructions with warning signs",
              category: "Patient Education"
            },
            {
              text: "Consider telehealth check-in at 2 weeks post-discharge",
              category: "Remote Care"
            }
          ];
        } else {
          recommendations = [
            {
              text: "Standard follow-up protocols recommended",
              category: "Follow-up Care"
            },
            {
              text: "Provide routine discharge instructions",
              category: "Patient Education"
            },
            {
              text: "Patient education on healthy lifestyle maintenance",
              category: "Lifestyle"
            }
          ];
        }
        
        return { 
          recommendations,
          metadata: {
            riskCategory,
            riskValue,
            generatedAt: new Date().toISOString()
          }
        };
      }
      
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPatientRecords = createAsyncThunk(
  'patient/fetchPatientRecords',
  async (_, { getState, rejectWithValue }) => {
    try {
      return await fetchWithAuth(`${API_URL}/patients`, { method: 'GET' }, getState);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  'patient/fetchPatientById',
  async (patientId, { getState, rejectWithValue }) => {
    try {
      return await fetchWithAuth(`${API_URL}/patients/${patientId}`, { method: 'GET' }, getState);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const savePatientRecord = createAsyncThunk(
  'patient/savePatientRecord',
  async (patientData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const enrichedPatientData = { ...patientData, hospitalId: auth.hospitalInfo.id };
      return await fetchWithAuth(`${API_URL}/patients`, {
        method: 'POST',
        body: JSON.stringify(enrichedPatientData),
      }, getState);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePatientRecord = createAsyncThunk(
  'patient/deletePatientRecord',
  async (patientId, { getState, rejectWithValue }) => {
    try {
      await fetchWithAuth(`${API_URL}/patients/${patientId}`, { method: 'DELETE' }, getState);
      return patientId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generatePrediction = createAsyncThunk(
  'patient/generatePrediction',
  async (patientData, { getState, rejectWithValue }) => {
    try {
      // Use a different URL specifically for the prediction endpoint
      const FLASK_API_URL = 'http://localhost:5001';
      
      const { auth } = getState();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      };
      
      // Format patient data as needed by your Flask model
      const formattedData = formatPatientDataForModel(patientData);
      
      const response = await fetch(`${FLASK_API_URL}/api/predict`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formattedData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Prediction request failed');
      
      return data;
    } catch (error) {
      console.error('Prediction error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to format patient data for the ML model
function formatPatientDataForModel(patientData) {
  // Transform the patient data into the format expected by your ML model
  // This depends on your model's expected input format
  
  const modelInput = {
    // Example mapping - adjust based on your actual model input requirements
    age: patientData.age,
    gender: patientData.gender === 'Male' ? 1 : 0,
    diagnosis: patientData.diagnosisCode,
    los: patientData.lengthOfStay,
    // Add all required fields for your model
  };
  
  return modelInput;
}

export const updatePatientApprovalStatus = createAsyncThunk(
  'patient/updatePatientApprovalStatus',
  async (approvalData, { getState, dispatch, rejectWithValue }) => {
    try {
      const { patientId, status, approvedAt } = approvalData;
      // Get the user ID from auth state if available
      const { auth } = getState();
      const userId = auth.user?._id || null;
      
      // Status should be correctly converted to boolean
      const isApproved = status === 'APPROVED';
      
      const requestBody = {
        isApproved,
        approvedAt: approvedAt || (isApproved ? new Date().toISOString() : null)
        // Let the server handle approvedBy
      };

      console.log('Sending approval request with patientId:', patientId);
      console.log('Approval data:', { 
        isApproved, 
        approvedAt,
        // Use actual user ID from auth state if available, otherwise null
        approvedBy: userId 
      });
      
      // Make API call to update the approval status
      const result = await fetchWithAuth(`${API_URL}/patients/${patientId}/approval`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      }, getState);
      
      dispatch(fetchWeeklyStats());

      return { 
        patientId, 
        isApproved, 
        approvedAt: result.approvedAt,
        approvedBy: result.approvedBy
      };
    } catch (error) {
      console.error('Error in updatePatientApprovalStatus:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Mock data thunk for development/demo purposes
export const setMockWeeklyStats = createAsyncThunk(
  'patient/setMockWeeklyStats',
  async (_, { getState }) => {
    // Get patient records from state
    const { patientRecords } = getState().patient;
    
    // Calculate unapproved count
    const unapprovedCount = patientRecords.filter(patient => patient.isApproved === false).length;
    
    // Mock weekly stats data with unapprovedAssessments
    const mockData = {
      currentWeek: {
        totalPatients: 87,
        pendingAssessments: 12,
        unapprovedAssessments: unapprovedCount, // Fallback value if no records
        avgReadmissionRisk: 42.3,
        highRiskPatients: 15
      },
      lastWeek: {
        totalPatients: 82,
        pendingAssessments: 14,
        unapprovedAssessments: unapprovedCount +3, // Simulate a decrease for trend
        avgReadmissionRisk: 45.7,
        highRiskPatients: 18
      },
      trendData: [
        { week: 'Feb 15-21', totalPatients: 78, avgReadmissionRisk: 48.2, highRiskPatients: 20, pendingAssessments: 18, unapprovedAssessments: 14 },
        { week: 'Feb 22-28', totalPatients: 82, avgReadmissionRisk: 45.7, highRiskPatients: 18, pendingAssessments: 14, unapprovedAssessments: 12 },
        { week: 'Mar 1-7', totalPatients: 85, avgReadmissionRisk: 44.1, highRiskPatients: 17, pendingAssessments: 13, unapprovedAssessments: 11 },
        { week: 'Mar 8-14', totalPatients: 87, avgReadmissionRisk: 42.3, highRiskPatients: 15, pendingAssessments: 12, unapprovedAssessments: unapprovedCount || 10 }
      ]
    };
    
    return mockData;
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    currentPatient: null,
    predictionResult: null,
    patientRecords: [],
    weeklyStats: null,    
    trendData: [],   
    loading: false,
    error: null,
  },
  reducers: {
    setPatientData: (state, action) => {
      state.currentPatient = action.payload;
    },
    setPredictionResult: (state, action) => {
      state.predictionResult = action.payload;
      if (state.currentPatient) {
        state.currentPatient.readmissionRisk = action.payload.readmissionRisk;
      }
    },
    addPatientRecord: (state, action) => {
      // Add isApproved field with default value of false
      state.patientRecords.push({
        ...action.payload,
        isApproved: action.payload.isApproved || false
      });
    },

    // New reducer for removing a patient record
    removePatientRecord: (state, action) => {
      // action.payload should be the id of the record to remove
      state.patientRecords = state.patientRecords.filter(record => record._id !== action.payload);
    },
    clearPatientData: (state) => {
      state.currentPatient = null;
      state.predictionResult = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Add a manual approval action for testing/direct updates
    setPatientApprovalStatus: (state, action) => {
      const { patientId, isApproved } = action.payload;
      
      // Update current patient if it matches
      if (state.currentPatient && state.currentPatient.id === patientId) {
        state.currentPatient.isApproved = isApproved;
        state.currentPatient.approvedAt = new Date().toISOString();
      }
      
      // Update in records array
      const patientIndex = state.patientRecords.findIndex(p => p._id === patientId || p.id === patientId);
      if (patientIndex !== -1) {
        state.patientRecords[patientIndex].isApproved = isApproved;
        state.patientRecords[patientIndex].approvedAt = new Date().toISOString();
      }
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.patientRecords = action.payload;
        state.error = null;
      })
      .addCase(fetchPatientRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(savePatientRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePatientRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.patientRecords.push(action.payload);
        state.error = null;
      })
      .addCase(savePatientRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePatientRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatientRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.patientRecords = state.patientRecords.filter(
          (record) => record._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deletePatientRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generatePrediction.pending, (state) => {
        state.loading = true;
      })
      .addCase(generatePrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionResult = action.payload;
        if (state.currentPatient) {
          state.currentPatient.readmissionRisk = action.payload.readmissionRisk;
        }
        state.error = null;
      })
      .addCase(generatePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add cases for weeklyStats
      .addCase(fetchWeeklyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = {
          currentWeek: action.payload.currentWeek,
          lastWeek: action.payload.lastWeek
        };
        state.trendData = action.payload.trendData;
        state.error = null;
      })
      .addCase(fetchWeeklyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add case for mock data
      .addCase(setMockWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = {
          currentWeek: action.payload.currentWeek,
          lastWeek: action.payload.lastWeek
        };
        state.trendData = action.payload.trendData;
        state.error = null;
      })
       // Handle the approval status update
       .addCase(updatePatientApprovalStatus.pending, (state) => {
        state.loading = true;
      })
      // In extraReducers section of patientSlice.js
      .addCase(updatePatientApprovalStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { patientId, isApproved, approvedAt, approvedBy } = action.payload;
        
        // Update current patient if it matches
        if (state.currentPatient && (state.currentPatient.id === patientId || state.currentPatient._id === patientId)) {
          state.currentPatient.isApproved = isApproved;
          state.currentPatient.approvedAt = approvedAt;
          state.currentPatient.approvedBy = approvedBy;
        }
        
        // Update in records array
        const patientIndex = state.patientRecords.findIndex(p => p._id === patientId || p.id === patientId);
        if (patientIndex !== -1) {
          state.patientRecords[patientIndex].isApproved = isApproved;
          state.patientRecords[patientIndex].approvedAt = approvedAt;
          state.patientRecords[patientIndex].approvedBy = approvedBy;
        }
        
        // Update weekly stats if they exist
        if (state.weeklyStats && state.weeklyStats.currentWeek) {
          // Recalculate unapproved assessments count
          const unapprovedCount = state.patientRecords.filter(patient => patient.isApproved === false).length;
          state.weeklyStats.currentWeek.unapprovedAssessments = unapprovedCount;
        }
        
        state.error = null;
      })
      // Then add to your extraReducers
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload.recommendations;
        state.error = null;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  })

export const {
  setPatientData,
  setPredictionResult,
  addPatientRecord,
  removePatientRecord,
  clearPatientData,
  setLoading,
  setError,
  setPatientApprovalStatus
} = patientSlice.actions;

export default patientSlice.reducer;
