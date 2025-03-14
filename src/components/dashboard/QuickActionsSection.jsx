// components/Dashboard/QuickActionsSection.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  LineChart, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';
import { GlassmorphicCard } from './common/GlassmorphicCard';
import { IconWrapper } from './common/IconWrapper';
import { SectionTitle } from './common/SectionTitle';
import QuickAction from './QuickAction';

const QuickActionsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.patient);
  
  // Define action handlers
  const handleNewPatient = () => navigate('/patients/new');
  const handleRunAssessment = () => navigate('/assessment');
  const handleGenerateReport = () => navigate('/reports/generate');
  const handleHighRiskPatients = () => navigate('/patients/high-risk');
  
  return (
    <GlassmorphicCard initialDelay={0.5} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <IconWrapper color="green">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </IconWrapper>
        <SectionTitle>Quick Actions</SectionTitle>
      </div>
      <div className="space-y-3">
        <QuickAction 
          title="New Patient" 
          icon={<UserPlus className="h-5 w-5" />} 
          color="blue"
          onClick={handleNewPatient}
        />
        <QuickAction 
          title="Run Assessment" 
          icon={<LineChart className="h-5 w-5" />} 
          color="green"
          onClick={handleRunAssessment}
        />
        <QuickAction 
          title="Generate Report" 
          icon={<FileText className="h-5 w-5" />} 
          color="purple"
          onClick={handleGenerateReport}
        />
        <QuickAction 
          title="High Risk Patients" 
          icon={<AlertTriangle className="h-5 w-5" />} 
          color="blue"
          onClick={handleHighRiskPatients}
        />
      </div>
    </GlassmorphicCard>
  );
};

export default QuickActionsSection;