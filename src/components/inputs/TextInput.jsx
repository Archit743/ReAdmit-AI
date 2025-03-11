// components/inputs/TextInput.js
import React from 'react';

const TextInput = ({ label, id, name, value, onChange, type = "text", required = false }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        required={required}
      />
    </div>
  );
};

export default TextInput;



