import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../molecules/AuthForm';
import { REQUEST_RESET_MUTATION } from '../../../lib/user';

const RequestReset = () => {
  const { t } = useTranslation();
  const [requestReset, formState] = useMutation(REQUEST_RESET_MUTATION);
  const successMessage = (formState && formState.data && formState.data.requestReset.message) || '';

  const handleSubmit = async (values) => {
    await requestReset({ variables: values });
  };

  return (
    <AuthForm
      title={t('account.reset')}
      handleSubmit={handleSubmit}
      {...formState}
      successMessage={successMessage}
      showEmail
    />
  );
};

export default RequestReset;
