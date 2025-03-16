// components/Dashboard/UpdatesSection.js
import React from 'react';
import { GlassmorphicCard } from '../common/GlassmorphicCard';
import { IconWrapper } from '../common/IconWrapper';
import { SectionTitle } from '../common/SectionTitle';

const UpdatesSection = () => {
  const updates = [
    { 
      title: "Prediction Model v2.1 Released", 
      date: "March 15, 2025",
      description: "Improved accuracy by 12% for cardiac patients"
    },
    { 
      title: "New Risk Factors Added", 
      date: "March 10, 2025",
      description: "Added 5 new variables to risk assessment algorithm"
    },
    { 
      title: "Mobile App Update", 
      date: "March 5, 2025",
      description: "Now available for iOS and Android devices"
    }
  ];

  return (
    <GlassmorphicCard initialDelay={0.3} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <IconWrapper color="purple">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </IconWrapper>
        <SectionTitle>Recent Updates</SectionTitle>
      </div>
      
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.title} className="border-l-2 border-purple-500 pl-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-white">{update.title}</h4>
              <span className="text-xs text-gray-400">{update.date}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{update.description}</p>
          </div>
        ))}
      </div>
    </GlassmorphicCard>
  );
};

export default UpdatesSection;