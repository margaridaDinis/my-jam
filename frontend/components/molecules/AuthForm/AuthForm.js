import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from '../../atoms/Form';
import ErrorMessage from '../ErrorMessege';
import Input from '../../atoms/Input';

const initialState = {
  name: '', email: '', password: '',
};

const AuthForm = ({
  title, handleSubmit, showName, loading, error,
}) => {
  const [values, setValues] = useState(initialState);

  const change = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    handleSubmit(values);
    setValues(initialState);
  };

  return (
    <Form onSubmit={submit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>{title}</h2>
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
        <Input
          type='email'
          name='email'
          label='Email'
          value={values.email}
          handleChange={change}
          required
        />
        <Input
          type='password'
          name='password'
          label='Password'
          value={values.password}
          handleChange={change}
          required
        />
        <button type='submit'>{title}</button>
      </fieldset>
    </Form>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showName: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default AuthForm;
