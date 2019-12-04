import React from 'react';
import PropTypes from 'prop-types';

import Artist from '../../components/pages/Artist';

const ArtistPage = ({ query }) => <Artist id={query.id} />;

ArtistPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default ArtistPage;
