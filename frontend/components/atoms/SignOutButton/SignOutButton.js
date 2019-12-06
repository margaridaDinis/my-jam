import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../organisms/User';
import { SIGN_OUT_MUTATION } from '../../../lib/user';

const SignOutButton = ({ children }) => {
  const [signOut] = useMutation(
    SIGN_OUT_MUTATION,
    {
      refetchQueries: [
        { query: CURRENT_USER_QUERY },
      ],
    },
  );

  return (
    <button onClick={signOut}>
      {children}
    </button>
  );
};

SignOutButton.propTypes = {
  children: PropTypes.string,
};

export default SignOutButton;
