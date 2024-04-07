// InputField.js
import React from 'react';
import './InputField.css';

const InputField = ({ type, label, placeholder, value, onChange, name }) => {
  return (
    <div className='input-container'>
      <label className='label'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className='input-field'
      />
    </div>
  );
};

export default InputField;
