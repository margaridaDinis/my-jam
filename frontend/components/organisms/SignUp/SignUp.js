import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import ErrorMessage from '../../molecules/ErrorMessege';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
    ) {
      name
      email
    }
  }
`;

const initialState = {
  name: '', email: '', password: '',
};

const SignUp = () => {
  const [values, setValues] = useState(initialState);
  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp({ variables: values });
    setValues(initialState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up</h2>

        <Input
          name='name'
          label='Name'
          value={values.name}
          handleChange={handleChange}
          required
        />
        <Input
          type='email'
          name='email'
          label='Email'
          value={values.email}
          handleChange={handleChange}
          required
        />
        <Input
          type='password'
          name='password'
          label='Password'
          value={values.password}
          handleChange={handleChange}
          required
        />
        <button type='submit'>Signup</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
