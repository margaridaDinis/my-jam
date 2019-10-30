import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import Table from '../../../styles/Table';
import UserPermissions from '../../molecules/UserPermissions';

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
    __type(name: "Permission") {
      enumValues {
        name
      }
    }
  }
`;

const Permissions = () => {
  const { data = {}, loading, error } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error}/>;

  const { users, __type } = data;
  const possiblePermissions = __type.enumValues.map(({ name }) => name);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          {possiblePermissions.map((permission) => (
            <th key={permission}>{permission}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserPermissions
            key={user.id}
            possiblePermissions={possiblePermissions}
            {...user}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Permissions;
