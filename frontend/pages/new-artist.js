import React from 'react';
import ArtistForm from '../components/organisms/ArtistForm';
import RequestSignIn from '../components/organisms/RequestSignIn';

const CreateArtistPage = () => (
  <RequestSignIn>
    <ArtistForm />
  </RequestSignIn>
);

export default CreateArtistPage;
