// components/Dashboard/StatsSection.js
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import StatsCard from './StatsCard';
import { UsersIcon, ClipboardIcon, ChartIcon, AlertIcon } from './common/icons';

const StatsSection = ({ stats, isLoaded, changes = {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {isLoaded && (
          <>
            <StatsCard 
              title="Total Patients" 
              value={stats.totalPatients} 
              icon={<UsersIcon />}
              color="blue" 
              delay={0.1}
              changePercentage={changes.totalPatients}
            />
            <StatsCard 
              title="Pending Assessments" 
              value={stats.pendingAssessments} 
              icon={<ClipboardIcon />}
              color="amber" 
              delay={0.2}
              changePercentage={changes.pendingAssessments}
            />
            <StatsCard 
              title="Avg. Readmission Risk" 
              value={stats.avgReadmissionRisk} 
              icon={<ChartIcon />}
              color="purple" 
              delay={0.3}
              changePercentage={changes.avgReadmissionRisk}
            />
            <StatsCard 
              title="High Risk Patients" 
              value={stats.highRiskPatients} 
              icon={<AlertIcon />}
              color="red" 
              delay={0.4}
              changePercentage={changes.highRiskPatients}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatsSection;