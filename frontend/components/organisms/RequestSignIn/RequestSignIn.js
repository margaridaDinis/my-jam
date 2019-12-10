import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../User';
import SignIn from '../SignIn';

const RequestSignIn = ({ children }) => {
  const { t } = useTranslation();
  const { data = {}, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>{t('app.loading')}</p>;
  if (!data.me) {
    return (
    <div>
      <p>{t('account.login_request')}</p>
      <SignIn />
    </div>
    );
  }

  return children;
};

RequestSignIn.propTypes = {
  children: PropTypes.node,
};

export default RequestSignIn;
