import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../lib/user';

const User = ({ children }) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return (
    <Fragment>
      {children(data || { me: { name: '' } })}
    </Fragment>
  );
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
