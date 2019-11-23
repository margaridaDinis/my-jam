import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
   me {
     id
     name
     email
     permissions
   }
}`;

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
