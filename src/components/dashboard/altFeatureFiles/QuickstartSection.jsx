// components/Dashboard/QuickStartSection.js
import React from 'react';
import { GlassmorphicCard } from '../common/GlassmorphicCard';
import { IconWrapper } from '../common/IconWrapper';
import { SectionTitle } from '../common/SectionTitle';

const QuickStartSection = () => {
  const steps = [
    { 
      title: "1. Add Patient Records", 
      description: "Create new patient profiles with medical history and demographics"
    },
    { 
      title: "2. Generate Risk Assessment", 
      description: "Use our AI model to predict readmission probability"
    },
    { 
      title: "3. Review and Approve", 
      description: "Clinical staff should review and approve risk assessments"
    },
    { 
      title: "4. Monitor Outcomes", 
      description: "Track patient status and refine intervention strategies"
    }
  ];

  return (
    <GlassmorphicCard initialDelay={0.3} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <IconWrapper color="cyan">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </IconWrapper>
        <SectionTitle>Getting Started</SectionTitle>
      </div>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.title} className="p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
            <h4 className="font-medium text-white">{step.title}</h4>
            <p className="text-sm text-gray-300 mt-1">{step.description}</p>
          </div>
        ))}
        
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-colors">
          View Documentation
        </button>
      </div>
    </GlassmorphicCard>
  );
};

export default QuickStartSection;