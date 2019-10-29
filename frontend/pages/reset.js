import React from 'react';
import PropTypes from 'prop-types';
import ResetPassword from '../components/organisms/Reset';

const Reset = ({ query }) => (
    <ResetPassword resetToken={query.resetToken || ''} />
);

Reset.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string,
  }),
};

export default Reset;
