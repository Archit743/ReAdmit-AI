// components/Dashboard/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Header from './Header';
import StatsSection from './StatsSection';
import ActivitySection from './ActivitySection';
import RiskTrendSection from './RiskTrendSection';
import QuickActionsSection from './QuickActionsSection';
import { fetchPatientRecords, fetchWeeklyStats, setMockWeeklyStats } from '../../features/patientSlice';

const Dashboard = ({ onGenerateEntry }) => {
  const dispatch = useDispatch();
  const { patientRecords, weeklyStats, loading, error } = useSelector((state) => state.patient);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAssessments: 0,
    avgReadmissionRisk: '0%',
    highRiskPatients: 0
  });
  
  const [changes, setChanges] = useState({
    totalPatients: 0,
    pendingAssessments: 0,
    avgReadmissionRisk: 0,
    highRiskPatients: 0
  });

  // Fetch data when component mounts
  useEffect(() => {
    // Fetch patient records
    dispatch(fetchPatientRecords());
    
    // Try to fetch weekly stats, if API endpoint doesn't exist, use mock data
    dispatch(fetchWeeklyStats()).catch(() => {
      // If API doesn't exist, use mock data for demo purposes
      setTimeout(() => {
        dispatch(setMockWeeklyStats());
      }, 1000);
    });
  }, [dispatch]);

  // Calculate stats from patient records
  useEffect(() => {
    if (patientRecords && patientRecords.length > 0) {
      // Count total patients
      const totalPatients = patientRecords.length;
      
      // Count pending assessments (patients without readmission risk assessment)
      const pendingAssessments = patientRecords.filter(
        patient => patient.readmissionRisk === undefined || patient.readmissionRisk === null
      ).length;
      
      // Calculate average readmission risk (for patients who have been assessed)
      const assessedPatients = patientRecords.filter(
        patient => patient.readmissionRisk !== undefined && patient.readmissionRisk !== null
      );
      
      let avgRisk = 0;
      if (assessedPatients.length > 0) {
        const totalRisk = assessedPatients.reduce(
          (sum, patient) => sum + parseFloat(patient.readmissionRisk), 0
        );
        avgRisk = totalRisk / assessedPatients.length;
      }
      
      // Count high risk patients (risk > 70%)
      const highRiskPatients = patientRecords.filter(
        patient => patient.readmissionRisk && parseFloat(patient.readmissionRisk) > 70
      ).length;
      
      setStats({
        totalPatients,
        pendingAssessments,
        avgReadmissionRisk: `${avgRisk.toFixed(1)}%`,
        highRiskPatients
      });
      
      setIsLoaded(!loading);
    }
  }, [patientRecords, loading]);

  // Calculate week-over-week changes
  useEffect(() => {
    if (weeklyStats && weeklyStats.lastWeek) {
      const { lastWeek } = weeklyStats;
      
      // Calculate percentage changes
      setChanges({
        totalPatients: lastWeek.totalPatients > 0 
          ? ((stats.totalPatients - lastWeek.totalPatients) / lastWeek.totalPatients) * 100 
          : 0,
        pendingAssessments: lastWeek.pendingAssessments > 0 
          ? ((stats.pendingAssessments - lastWeek.pendingAssessments) / lastWeek.pendingAssessments) * 100 
          : 0,
        avgReadmissionRisk: lastWeek.avgReadmissionRisk > 0 
          ? ((parseFloat(stats.avgReadmissionRisk) - lastWeek.avgReadmissionRisk) / lastWeek.avgReadmissionRisk) * 100 
          : 0,
        highRiskPatients: lastWeek.highRiskPatients > 0 
          ? ((stats.highRiskPatients - lastWeek.highRiskPatients) / lastWeek.highRiskPatients) * 100 
          : 0
      });
    }
  }, [stats, weeklyStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl p-6">
      {/* Background color blobs for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header */}
        <Header onGenerateEntry={onGenerateEntry} />

        {/* Stats Cards */}
        <StatsSection 
          stats={stats} 
          isLoaded={isLoaded} 
          changes={changes} 
        />
        
        {/* Error message if any */}
        {error && (
          <div className="p-4 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Recent Activity section */}
        <ActivitySection />

        {/* Additional sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RiskTrendSection />
          <QuickActionsSection />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;