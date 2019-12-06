import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from '../../molecules/AuthForm';
import { CURRENT_USER_QUERY, RESET_PASSWORD_MUTATION } from '../../../lib/user';

const ResetPassword = ({ resetToken }) => {
  const [resetPassword, formState] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [{
        query: CURRENT_USER_QUERY,
      }],
    },
  );

  const handleSubmit = async (values) => {
    await resetPassword({ variables: { ...values, resetToken } });
    Router.push({ pathname: '/' });
  };

  return (
    <AuthForm
      title='Set new password'
      handleSubmit={handleSubmit}
      {...formState}
      showPassword
      showConfirmPassword
    />
  );
};

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default ResetPassword;
