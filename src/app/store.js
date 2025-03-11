import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistStore, persistReducer } from "redux-persist";
import patientReducer from "../features/patientSlice";
import authReducer, { logout } from "../features/authSlice";

// Configuring persistence
const persistConfig = {
  key: "root",
  storage,
};

// Root reducer without persistence
const rootReducer = combineReducers({
  patient: patientReducer,
  auth: authReducer,
});

// Main reducer that resets state on logout
const appReducer = (state, action) => {
  if (action.type === logout.type) {
    return {
      auth: { token: null, hospitalInfo: null, isAuthenticated: false }, // Reset only auth state
      patient: state.patient, // Keep patient records if needed
    };
  }
  return rootReducer(state, action);
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);
