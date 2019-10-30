import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import ErrorMessage from '../ErrorMessage';

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($userId: ID!, $permissions: [Permission]) {
    updatePermissions(userId: $userId, permissions: $permissions) {
      id
      name
      email
      permissions
    }
  }
`;

const UserPermissions = ({
  id, name, email, permissions, possiblePermissions,
}) => {
  const [userPermissions, setUserPermissions] = useState(permissions);
  const [updatePermissions, { loading, error }] = useMutation(UPDATE_PERMISSIONS_MUTATION);

  const changeHandler = ({ target: { checked, value } }) => {
    if (checked) setUserPermissions([...userPermissions, value]);
    if (!checked) setUserPermissions(userPermissions.filter((permission) => permission !== value));

    updatePermissions({ variables: { permissions: userPermissions, userId: id } });
  };

  return (
    <Fragment>
      {error && (
        <tr>
          <td colSpan={9}>
            <ErrorMessage error={error}/>
          </td>
        </tr>
      )}
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map((permission) => {
          const permissionKey = `${id}-permission-${permission}`;
          const hasPermission = userPermissions.includes(permission);
          return (
            <td key={permissionKey}>
              <label htmlFor={permissionKey}>
                <input
                  type='checkbox'
                  id={permissionKey}
                  value={permission}
                  checked={hasPermission}
                  onChange={changeHandler}
                  disabled={loading}
                />
              </label>
            </td>
          );
        })}
      </tr>
    </Fragment>

  );
};

UserPermissions.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
  possiblePermissions: PropTypes.array.isRequired,
};

export default UserPermissions;
