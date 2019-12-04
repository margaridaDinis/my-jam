import React from 'react';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import NewLocation from '../../components/pages/NewLocation';

const NewLocationPage = () => (
  <RequestSignIn>
    <NewLocation />
  </RequestSignIn>
);

export default NewLocationPage;
