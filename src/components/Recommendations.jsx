import React from 'react';
import { motion } from 'framer-motion';

const Recommendations = ({ prediction }) => {
  const getRecommendations = () => {
    const risk = prediction.readmissionRisk?.toLowerCase() || '';
    
    if (risk.includes('high')) {
      return [
        {
          text: "Schedule follow-up appointment within 2 weeks of discharge",
          category: "Follow-up Care",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          color: "red"
        },
        {
          text: "Connect patient with care coordinator for transition support",
          category: "Care Coordination",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          color: "purple"
        },
        {
          text: "Review medication adherence plan with patient and caregiver",
          category: "Medication Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ),
          color: "blue"
        },
        {
          text: "Consider home health services assessment",
          category: "Home Care",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          color: "green"
        },
        {
          text: "Monitor vital signs daily for first week post-discharge",
          category: "Monitoring",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          ),
          color: "amber"
        }
      ];
    } else if (risk.includes('medium')) {
      return [
        {
          text: "Schedule follow-up appointment within 30 days",
          category: "Follow-up Care",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          color: "amber"
        },
        {
          text: "Medication adherence monitoring recommended",
          category: "Medication Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ),
          color: "blue"
        },
        {
          text: "Provide detailed discharge instructions with warning signs",
          category: "Patient Education",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          color: "purple"
        },
        {
          text: "Consider telehealth check-in at 2 weeks post-discharge",
          category: "Remote Care",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          ),
          color: "green"
        }
      ];
    } else {
      return [
        {
          text: "Standard follow-up protocols recommended",
          category: "Follow-up Care",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          color: "green"
        },
        {
          text: "Provide routine discharge instructions",
          category: "Patient Education",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          color: "blue"
        },
        {
          text: "Patient education on healthy lifestyle maintenance",
          category: "Lifestyle",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
          color: "purple"
        }
      ];
    }
  };

  // Function to get the color classes based on color name
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
        icon: "bg-gradient-to-br from-blue-500 to-blue-600"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-500/30",
        text: "text-purple-400",
        icon: "bg-gradient-to-br from-purple-500 to-purple-600"
      },
      amber: {
        bg: "bg-amber-600/20",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: "bg-gradient-to-br from-amber-500 to-amber-600"
      },
      green: {
        bg: "bg-green-600/20",
        border: "border-green-500/30",
        text: "text-green-400",
        icon: "bg-gradient-to-br from-green-500 to-green-600"
      },
      red: {
        bg: "bg-red-600/20",
        border: "border-red-500/30",
        text: "text-red-400",
        icon: "bg-gradient-to-br from-red-500 to-red-600"
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const recommendations = getRecommendations();
  const risk = prediction.readmissionRisk?.toLowerCase() || '';
  
  // Get appropriate risk color
  const riskColor = risk.includes('high') ? 'red' : risk.includes('medium') ? 'amber' : 'green';
  const riskColorClasses = getColorClasses(riskColor);

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Background effects */}
      <div className="relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Action Steps
          </h3>
          
          <div className={`px-4 py-2 rounded-full ${riskColorClasses.bg} ${riskColorClasses.border} ${riskColorClasses.text} text-sm font-medium flex items-center`}>
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {risk ? `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk` : 'Risk Level'} 
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {recommendations.map((rec, index) => {
            const colorClasses = getColorClasses(rec.color);
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="backdrop-blur-lg bg-white/8 border border-white/10 rounded-xl p-4 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex">
                  <div className={`p-2 ${colorClasses.icon} rounded-lg text-white flex-shrink-0 shadow-lg`}>
                    {rec.icon}
                  </div>
                  <div className="ml-3">
                    <div className={`text-xs font-medium mb-1 ${colorClasses.text}`}>
                      {rec.category}
                    </div>
                    <p className="text-white text-sm">{rec.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Action summary */}
        <div className="mt-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
          <div className="flex items-center mb-3">
            <div className={`p-2 ${riskColorClasses.icon} rounded-lg text-white flex-shrink-0 shadow-lg mr-3`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white">Action Summary</h4>
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            This patient requires 
            {risk.includes('high') 
              ? ' intensive follow-up care with frequent monitoring and comprehensive support. Consider care coordination and early intervention for any complications.'
              : risk.includes('medium')
                ? ' regular follow-up care with structured discharge planning. Focus on medication adherence and patient education about warning signs.'
                : ' standard follow-up care and routine instructions. Emphasize preventive measures and healthy lifestyle maintenance.'}
          </p>
          
          <div className="mt-4">
            <div className="text-sm text-gray-400 mb-2">Priority Level</div>
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-2 rounded-full ${risk.includes('high') ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-white/10'}`}></div>
              <div className={`h-2 rounded-full ${risk.includes('medium') ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-white/10'}`}></div>
              <div className={`h-2 rounded-full ${!risk.includes('high') && !risk.includes('medium') ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-white/10'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;