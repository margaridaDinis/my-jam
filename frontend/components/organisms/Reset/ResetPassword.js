import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../User';
import AuthForm from '../../molecules/AuthForm';

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;

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
