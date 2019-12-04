import React from 'react';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import CreateAlbum from '../../components/pages/CreateAlbum';

const CreateAlbumPage = () => (
  <RequestSignIn>
    <CreateAlbum />
  </RequestSignIn>
);

export default CreateAlbumPage;
