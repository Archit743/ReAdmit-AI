import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL - replace with your actual API endpoint
const API_URL = 'http://localhost:5000/api';

// Helper to persist auth state to localStorage
const saveAuthToStorage = (token, hospitalInfo) => {
  localStorage.setItem('token', token);
  localStorage.setItem('hospitalInfo', JSON.stringify(hospitalInfo));
};

// Helper to clear auth state from localStorage
const clearAuthFromStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('hospitalInfo');
};

// Load initial state from localStorage if available
const loadAuthFromStorage = () => {
  const token = localStorage.getItem('token');
  const hospitalInfo = JSON.parse(localStorage.getItem('hospitalInfo'));
  
  return {
    token,
    hospitalInfo,
    isAuthenticated: !!token,
    loading: false,
    error: null
  };
};

// Helper function for making API requests
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const { token } = getState().auth;
      
      if (!token) {
        // No token found, reject
        return rejectWithValue('No token found');
      }
      
      // Call your verification endpoint
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        // Token is invalid, log the user out
        dispatch(logout());
        return rejectWithValue('Token invalid or expired');
      }
      
      // Token is valid, return success
      return await response.json();
    } catch (error) {
      // Error occurred, log the user out
      dispatch(logout());
      return rejectWithValue(error.message);
    }
  }
);

// Async thunks for authentication
export const loginHospital = createAsyncThunk(
  'auth/loginHospital',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await fetchData(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerHospital = createAsyncThunk(
  'auth/registerHospital',
  async (hospitalData, { rejectWithValue }) => {
    try {
      const data = await fetchData(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospitalData)
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHospitalProfile = createAsyncThunk(
  'auth/updateHospitalProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const data = await fetchData(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    logout: (state) => {
      state.token = null;
      state.hospitalInfo = null;
      state.isAuthenticated = false;
      clearAuthFromStorage();
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.hospitalInfo = action.payload.hospitalInfo;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload.token, action.payload.hospitalInfo);
      })
      .addCase(loginHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      
      .addCase(registerHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.hospitalInfo = action.payload.hospitalInfo;
        state.isAuthenticated = true;
        state.error = null;
        saveAuthToStorage(action.payload.token, action.payload.hospitalInfo);
      })
      .addCase(registerHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(updateHospitalProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHospitalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalInfo = action.payload.hospitalInfo;
        state.error = null;
        // Update localStorage with new hospital info
        localStorage.setItem('hospitalInfo', JSON.stringify(action.payload.hospitalInfo));
      })
      .addCase(updateHospitalProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Profile update failed';
      })
      .addCase(verifyToken.rejected, (state) => {
        // When verification fails, reset auth state
        state.token = null;
        state.hospitalInfo = null;
        state.isAuthenticated = false;
        clearAuthFromStorage();
      })
      .addCase(verifyToken.fulfilled, (state) => {
        // Token is valid, ensure authenticated state is true
        state.isAuthenticated = true;
      });
  }
});

export const { logout, setError, clearError } = authSlice.actions;

export default authSlice.reducer;
