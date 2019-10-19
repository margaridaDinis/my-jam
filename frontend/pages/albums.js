import React from 'react';
import PropTypes from 'prop-types';

import Albums from '../components/organisms/Albums';

const AlbumsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <Albums page={page} />
  );
};

AlbumsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default AlbumsPage;
