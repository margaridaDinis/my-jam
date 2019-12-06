import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import AuthForm from '../../molecules/AuthForm';
import { REQUEST_RESET_MUTATION } from '../../../lib/user';

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
