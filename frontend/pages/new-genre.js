import React from 'react';
import GenreForm from '../components/organisms/GenreForm';
import RequestSignIn from '../components/organisms/RequestSignIn';

const CreateAlbumPage = () => (
  <RequestSignIn>
    <GenreForm />
  </RequestSignIn>
);

export default CreateAlbumPage;
