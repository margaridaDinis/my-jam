import React from 'react';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import GenreForm from '../../components/pages/GenreForm';

const CreateAlbumPage = () => (
  <RequestSignIn>
    <GenreForm />
  </RequestSignIn>
);

export default CreateAlbumPage;
