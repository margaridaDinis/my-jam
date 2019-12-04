import React from 'react';
import RequestSignIn from '../components/organisms/RequestSignIn';
import Permissions from '../components/pages/Permissions';

const PermissionsPage = () => (
    <RequestSignIn>
      <Permissions />
    </RequestSignIn>
);

export default PermissionsPage;
