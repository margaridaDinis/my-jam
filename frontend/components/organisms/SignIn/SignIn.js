import React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../User';
import AuthForm from '../../molecules/AuthForm';

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signIn(
      email: $email
      password: $password
    ) {
      id
      email
    }
  }
`;

const SignIn = () => {
  const [signIn, formState] = useMutation(
    SIGN_IN_MUTATION,
    {
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    },
  );

  const handleSubmit = async (values) => {
    await signIn({ variables: values });
    Router.push({ pathname: '/' });
  };

  return (
    <AuthForm
      title='Sign In'
      handleSubmit={handleSubmit}
      {...formState}
      showEmail
      showPassword
    />
  );
};

export default SignIn;
