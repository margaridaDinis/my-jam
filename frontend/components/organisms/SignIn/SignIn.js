import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY, SIGN_IN_MUTATION } from '../../../lib/user';

const SignIn = () => {
  const { t } = useTranslation();

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
      title={t('account.login')}
      handleSubmit={handleSubmit}
      {...formState}
      showEmail
      showPassword
    />
  );
};

export default SignIn;
