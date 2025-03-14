// components/Dashboard/ActivitySection.js
import React from 'react';
import { GlassmorphicCard } from './common/GlassmorphicCard';
import { IconWrapper } from './common/IconWrapper';
import { SectionTitle } from './common/SectionTitle';
import ActivityItem from './ActivityItem';

const ActivitySection = () => {
  return (
    <GlassmorphicCard initialDelay={0.3} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <IconWrapper color="blue">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </IconWrapper>
          <SectionTitle>Recent Activity</SectionTitle>
        </div>
        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        <ActivityItem 
          type="assessment" 
          patient="Sarah Williams" 
          time="10 minutes ago" 
          detail="Readmission risk: 21%" 
          avatar="/avatars/sarah.jpg"
        />
        <ActivityItem 
          type="upload" 
          patient="Michael Davis" 
          time="2 hours ago" 
          detail="Added 3 documents" 
          avatar="/avatars/michael.jpg"
        />
        <ActivityItem 
          type="prediction" 
          patient="Emma Johnson" 
          time="4 hours ago" 
          detail="Updated risk: 38% → 32%" 
          avatar="/avatars/emma.jpg"
        />
      </div>
    </GlassmorphicCard>
  );
};

export default ActivitySection;