import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import AuthForm from '../../molecules/AuthForm';

export const REQUEST_RESET_MUTATION = gql`
mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [requestReset, formState] = useMutation(REQUEST_RESET_MUTATION);
  const successMessage = (formState && formState.data && formState.data.requestReset.message) || '';

  const handleSubmit = async (values) => {
    await requestReset({ variables: values });
  };

  return (
    <AuthForm
      title='Reset password'
      handleSubmit={handleSubmit}
      {...formState}
      successMessage={successMessage}
      showEmail
    />
  );
};

export default RequestReset;
