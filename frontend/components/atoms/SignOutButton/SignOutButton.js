import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../organisms/User';
import { SIGN_OUT_MUTATION } from '../../../lib/user';
import MenuItem from '../MenuItem';

const SignOutButton = () => {
  const [signOut] = useMutation(
    SIGN_OUT_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] },
  );

  return (
    <MenuItem
      onClick={signOut}
      pathname={''}
      translationKey={'logout'}
      textType='critical'
    />
  );
};

export default SignOutButton;
