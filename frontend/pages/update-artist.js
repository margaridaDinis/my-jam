import React from 'react';
import PropTypes from 'prop-types';

import ArtistForm from '../components/organisms/ArtistForm';

const UpdateArtistPage = ({ query }) => (
  <ArtistForm id={query.id} />
);

UpdateArtistPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateArtistPage;
