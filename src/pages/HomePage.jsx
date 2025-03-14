import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/dashboard/index';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">

      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
        {/* Left sidebar with profile and records */}
        <Sidebar hospitalInfo={hospitalInfo} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 relative z-10 backdrop-blur-sm">
          {isFormVisible ? (
            <div className="bg-white/8 border border-white/10 rounded-2xl shadow-2xl p-6">
            <PatientForm onClose={handleCloseForm} />
          </div>
          ) : (
            <div className="bg-white/8 border border-white/10 rounded-2xl shadow-2xl p-6">
              <Dashboard onGenerateEntry={handleGenerateEntry} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;