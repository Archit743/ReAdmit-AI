import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistStore, persistReducer } from "redux-persist";
import patientReducer from "../features/patientSlice";
import { combineReducers } from "redux";

// Configuring persistence
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  patient: persistReducer(persistConfig, patientReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);
