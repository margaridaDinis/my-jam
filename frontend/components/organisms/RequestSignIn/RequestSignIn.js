import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Card, CardSection } from '@kiwicom/orbit-components/lib/index';
import { CURRENT_USER_QUERY } from '../User';
import SignIn from '../SignIn';

const RequestSignIn = ({ children }) => {
  const { t } = useTranslation();
  const { data = {}, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>{t('app.loading')}</p>;
  if (!data.me) {
    return (
      <Card>
        <CardSection>
          <SignIn />
        </CardSection>
      </Card>
    );
  }

  return children;
};

RequestSignIn.propTypes = {
  children: PropTypes.node,
};

export default RequestSignIn;
