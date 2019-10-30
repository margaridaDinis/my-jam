import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../User';
import SignIn from '../SignIn';

const RequestSignIn = ({ children }) => {
  const { data = {}, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (!data.me) {
    return (
    <div>
      <p>Please sign in</p>
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
