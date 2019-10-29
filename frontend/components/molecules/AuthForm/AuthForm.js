import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from '../../atoms/Form';
import ErrorMessage from '../ErrorMessege';
import Input from '../../atoms/Input';

const initialState = {
  name: '', email: '', password: '', confirmPassword: '',
};

const AuthForm = ({
  title,
  successMessage,
  handleSubmit,
  showName,
  showEmail,
  showPassword,
  showConfirmPassword,
  loading,
  error,
  called,
}) => {
  const [values, setValues] = useState(initialState);

  const succeeded = !loading && !error && called;

  const change = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    handleSubmit(values);
  };

  return (
    <Form onSubmit={submit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>{title}</h2>
        {succeeded && successMessage && <p>{successMessage}</p>}
        {showName && (
          <Input
            type='name'
            name='name'
            label='Name'
            value={values.name}
            handleChange={change}
            required
          />
        )}
        {showEmail && (
          <Input
            type='email'
            name='email'
            label='Email'
            value={values.email}
            handleChange={change}
            required
          />
        )}
        {showPassword && (
          <Input
            type='password'
            name='password'
            label='Password'
            value={values.password}
            handleChange={change}
            required
          />
        )}
        {showConfirmPassword && (
          <Input
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            value={values.confirmPassword}
            handleChange={change}
            required
          />
        )}
        <button type='submit'>{title}</button>
      </fieldset>
    </Form>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  showName: PropTypes.bool,
  showEmail: PropTypes.bool,
  showPassword: PropTypes.bool,
  showConfirmPassword: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  called: PropTypes.bool,
};

export default AuthForm;
