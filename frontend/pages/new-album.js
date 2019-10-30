import React from 'react';
import CreateAlbum from '../components/organisms/CreateAlbum';
import RequestSignIn from '../components/organisms/RequestSignIn';

const CreateAlbumPage = () => (
  <RequestSignIn>
    <CreateAlbum />
  </RequestSignIn>
);

export default CreateAlbumPage;
