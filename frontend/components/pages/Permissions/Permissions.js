import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import Table from '../../../styles/Table';
import UserPermissions from '../../molecules/UserPermissions';
import { USERS_QUERY } from '../../../lib/user';

const Permissions = () => {
  const { t } = useTranslation();
  const { data = {}, loading, error } = useQuery(USERS_QUERY);

  if (loading) return <p>{t('app.loading')}</p>;
  if (error) return <ErrorMessage error={error}/>;

  const { users, __type } = data;
  const possiblePermissions = __type.enumValues.map(({ name }) => name);

  return (
    <Table>
      <thead>
        <tr>
          <th>{t('permissions.user_name')}</th>
          <th>{t('permissions.user_email')}l</th>
          {possiblePermissions.map((permission) => (
            <th key={permission}>{permission}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
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
