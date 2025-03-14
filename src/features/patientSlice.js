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
      return await fetchWithAuth(`${API_URL}/stats/weekly`, { method: 'GET' }, getState);
    } catch (error) {
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
      return await fetchWithAuth(`${API_URL}/predictions`, {
        method: 'POST',
        body: JSON.stringify(patientData),
      }, getState);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mock data thunk for development/demo purposes
export const setMockWeeklyStats = createAsyncThunk(
  'patient/setMockWeeklyStats',
  async (_, { dispatch }) => {
    // Mock weekly stats data
    const mockData = {
      currentWeek: {
        totalPatients: 87,
        pendingAssessments: 12,
        avgReadmissionRisk: 42.3,
        highRiskPatients: 15
      },
      lastWeek: {
        totalPatients: 82,
        pendingAssessments: 14,
        avgReadmissionRisk: 45.7,
        highRiskPatients: 18
      },
      trendData: [
        { week: 'Feb 15-21', totalPatients: 78, avgReadmissionRisk: 48.2, highRiskPatients: 20, pendingAssessments: 18 },
        { week: 'Feb 22-28', totalPatients: 82, avgReadmissionRisk: 45.7, highRiskPatients: 18, pendingAssessments: 14 },
        { week: 'Mar 1-7', totalPatients: 85, avgReadmissionRisk: 44.1, highRiskPatients: 17, pendingAssessments: 13 },
        { week: 'Mar 8-14', totalPatients: 87, avgReadmissionRisk: 42.3, highRiskPatients: 15, pendingAssessments: 12 }
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
    weeklyStats: null,     // Add this new state property
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
      state.patientRecords.push(action.payload);  // ✅ Directly push instead of spread operator
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
      });
  },
});

export const {
  setPatientData,
  setPredictionResult,
  addPatientRecord,
  removePatientRecord,
  clearPatientData,
  setLoading,
  setError,
} = patientSlice.actions;

export default patientSlice.reducer;
