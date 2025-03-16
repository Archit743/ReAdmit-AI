// components/Dashboard/SystemStatusSection.js
import React from 'react';
import { GlassmorphicCard } from '../common/GlassmorphicCard';
import { IconWrapper } from '../common/IconWrapper';
import { SectionTitle } from '../common/SectionTitle';

const SystemStatusSection = () => {
  const systems = [
    { name: "Risk Assessment Engine", status: "operational", uptime: "99.9%" },
    { name: "Patient Records API", status: "operational", uptime: "99.7%" },
    { name: "Prediction Model", status: "operational", uptime: "100%" },
    { name: "Authentication Service", status: "operational", uptime: "99.8%" }
  ];

  return (
    <GlassmorphicCard initialDelay={0.3} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <IconWrapper color="green">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </IconWrapper>
        <SectionTitle>System Status</SectionTitle>
      </div>
      
      <div className="space-y-3">
        {systems.map((system) => (
          <div key={system.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${system.status === 'operational' ? 'bg-green-400' : 'bg-red-400'} mr-3`}></div>
              <span className="font-medium text-white">{system.name}</span>
            </div>
            <div className="text-gray-300 text-sm">
              Uptime: {system.uptime}
            </div>
          </div>
        ))}
      </div>
    </GlassmorphicCard>
  );
};

export default SystemStatusSection;