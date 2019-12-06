import React from 'react';
import PropTypes from 'prop-types';

import Artists from '../../components/pages/Artists';

const ArtistsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return <Artists page={page} />;
};

ArtistsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default ArtistsPage;
