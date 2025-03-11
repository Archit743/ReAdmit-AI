import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import PatientForm from '../components/PatientForm';

const HomePage = () => {
  
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { hospitalInfo } = useSelector(state => state.auth);
  
    // Handler to toggle patient entry form visibility
    const handleGenerateEntry = () => {
      setIsFormVisible(true);
    };
  
    // Handler to close the form and return to dashboard
    const handleCloseForm = () => {
      setIsFormVisible(false);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950">
        {/* Left sidebar with profile and records */}
        <Sidebar hospitalInfo={hospitalInfo} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900 to-gray-950">
          {isFormVisible ? (
            <PatientForm onClose={handleCloseForm} />
          ) : (
            <Dashboard onGenerateEntry={handleGenerateEntry} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;