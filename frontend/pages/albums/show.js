import React from 'react';
import PropTypes from 'prop-types';

import Album from '../../components/pages/Album';

const AlbumPage = ({ query }) => (
  <Album id={query.id} />
);

AlbumPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default AlbumPage;
