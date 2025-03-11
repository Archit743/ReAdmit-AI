// components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm transition-colors"
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Predict Readmission Risk'}
    </button>
  );
};

export default SubmitButton;