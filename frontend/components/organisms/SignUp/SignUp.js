import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY } from '../User';

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
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const [signUp, { loading, error }] = useMutation(
    SIGN_UP_MUTATION,
    {
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    },
  );

  const handleSubmit = async (values) => {
    await signUp({ variables: values });
  };

  return (
    <AuthForm
      title='Sign Up'
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      showName
    />
  );
};

export default SignUp;
