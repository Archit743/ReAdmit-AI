// redux/patientSlice.js
import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    currentPatient: null,
    predictionResult: null,
    patientRecords: [],
    loading: false,
    error: null
  },
  reducers: {
    setPatientData: (state, action) => {
      state.currentPatient = action.payload;
    },
    setPredictionResult: (state, action) => {
      state.predictionResult = action.payload;
      
      // Once we have a prediction result, we can update the current patient
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
      state.patientRecords = state.patientRecords.filter(record => record.id !== action.payload);
    },
      
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setPatientData, 
  setPredictionResult, 
  addPatientRecord,
  removePatientRecord,
  setLoading, 
  setError 
} = patientSlice.actions;

export default patientSlice.reducer;