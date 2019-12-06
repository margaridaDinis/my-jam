import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY, SIGN_UP_MUTATION } from '../../../lib/user';

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
