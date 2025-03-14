// components/Dashboard/RiskTrendSection.js
import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassmorphicCard } from './common/GlassmorphicCard';
import { IconWrapper } from './common/IconWrapper';
import { SectionTitle } from './common/SectionTitle';

const RiskTrendSection = () => {
  const { trendData, loading } = useSelector((state) => state.patient);
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-md border border-slate-700 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-blue-400">
            Avg. Risk: {payload[0].value.toFixed(1)}%
          </p>
          <p className="text-purple-400">
            High Risk: {payload[1].value} patients
          </p>
        </div>
      );
    }
    return null;
  };
  
  const renderChart = () => {
    if (!trendData || trendData.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
          <div className="text-gray-400 text-sm">
            {loading ? "Loading trend data..." : "No trend data available"}
          </div>
        </div>
      );
    }
    
    return (
      <div className="h-64 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: '#94a3b8' }} 
              axisLine={{ stroke: '#475569' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#94a3b8' }} 
              axisLine={{ stroke: '#475569' }}
              domain={[0, 100]}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fill: '#94a3b8' }} 
              axisLine={{ stroke: '#475569' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="avgReadmissionRisk"
              name="Avg. Risk"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="highRiskPatients"
              name="High Risk Patients"
              stroke="#a855f7"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-center mt-6 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-slate-300">Avg. Readmission Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm text-slate-300">High Risk Patients</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <GlassmorphicCard initialDelay={0.4} className="p-6 lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <IconWrapper color="purple">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </IconWrapper>
        <SectionTitle>Risk Trend</SectionTitle>
      </div>
      {renderChart()}
    </GlassmorphicCard>
  );
};

export default RiskTrendSection;