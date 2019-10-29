import React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

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
  const [signUp, formState] = useMutation(
    SIGN_UP_MUTATION,
    {
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    },
  );

  const handleSubmit = async (values) => {
    await signUp({ variables: values });
    Router.push({ pathname: '/' });
  };

  return (
    <AuthForm
      title='Sign Up'
      handleSubmit={handleSubmit}
      {...formState}
      showName
      showEmail
      showPassword
    />
  );
};

export default SignUp;
