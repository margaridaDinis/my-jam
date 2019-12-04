import React from 'react';
import PropTypes from 'prop-types';

import ArtistForm from '../../components/pages/ArtistForm';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const UpdateArtistPage = ({ query }) => (
  <RequestSignIn>
    <ArtistForm id={query.id}/>
  </RequestSignIn>
);

UpdateArtistPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateArtistPage;
