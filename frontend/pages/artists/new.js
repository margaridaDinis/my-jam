import React from 'react';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import ArtistForm from '../../components/pages/ArtistForm';

const CreateArtistPage = () => (
  <RequestSignIn>
    <ArtistForm />
  </RequestSignIn>
);

export default CreateArtistPage;
