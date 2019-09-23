import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, value, label, placeholder, handleChange, required }) => {
  return (
    <label htmlFor={name}>
      {label}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
};

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool
};

export default Input;
