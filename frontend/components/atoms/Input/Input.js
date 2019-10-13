import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, label, placeholder, handleChange, required, ...rest }) => {
  return (
    <label htmlFor={name}>
      {label}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          {...rest}
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
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool
};

export default Input;
