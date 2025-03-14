// components/Dashboard/common/SectionTitle.js
import React from 'react';

export const SectionTitle = ({ children }) => (
  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
    {children}
  </h3>
);