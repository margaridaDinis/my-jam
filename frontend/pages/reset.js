import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardSection } from '@kiwicom/orbit-components/lib/index';
import ResetPassword from '../components/organisms/Reset';

const Reset = ({ query }) => (
  <Card>
    <CardSection>
      <ResetPassword resetToken={query.resetToken || ''} />
    </CardSection>
  </Card>
);

Reset.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string,
  }),
};

export default Reset;
