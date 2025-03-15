import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './pages/Homepage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/utils/ScrollToTop.js';
import { verifyToken } from './features/authSlice.js'; // You'll need to create this thunk

function App() {
  const { isAuthenticated, token } = useSelector(state => state.auth || { isAuthenticated: false, token: null });
  const dispatch = useDispatch();
  
  useEffect(() => {
    // If there's a token, verify it's still valid
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/results" 
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App