// components/inputs/SelectInput.js
import React from 'react';

const SelectInput = ({ label, id, name, value, onChange, options, required = false }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm text-gray-400 mb-1">{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;