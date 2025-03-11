// components/FormSection.js
import React from 'react';

const FormSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-300 mb-3">{title}</h3>
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-850">
        {children}
      </div>
    </div>
  );
};

export default FormSection;