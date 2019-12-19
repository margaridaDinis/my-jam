import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY, SIGN_IN_MUTATION } from '../../../lib/user';

const SignIn = ({ shouldRedirectOnSuccess }) => {
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

    if (shouldRedirectOnSuccess) Router.push({ pathname: '/' });
  };

  return (
    <AuthForm
      title={t('account.login')}
      handleSubmit={handleSubmit}
      {...formState}
      showEmail
      showPassword
      showResetLink
    />
  );
};

SignIn.propTypes = {
  shouldRedirectOnSuccess: PropTypes.bool,
};

export default SignIn;
