import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text } from '@kiwicom/orbit-components/lib/index';

const Input = ({
  name, type, label, placeholder, handleChange, required, ...rest
}) => (
  <Stack spaceAfter='medium'>
    <label htmlFor={name}>
      <Stack spacing='tight' direction='row' align='start' spaceAfter='smallest'>
        <Text>{label}</Text>
        {required && <Text type='critical'>*</Text>}
      </Stack>
      {type === 'textarea' ? (
        <textarea
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows='5'
          {...rest}
        />
      ) : (
        <input
          type={type}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      )}
    </label>
  </Stack>
);

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
