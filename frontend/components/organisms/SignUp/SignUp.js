import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY, SIGN_UP_MUTATION } from '../../../lib/user';

const SignUp = () => {
  const { t } = useTranslation();

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
      title={t('account.signup')}
      handleSubmit={handleSubmit}
      {...formState}
      showName
      showEmail
      showPassword
      showConfirmPassword
    />
  );
};

export default SignUp;
