import React from 'react';
import PropTypes from 'prop-types';

import GenreForm from '../components/organisms/GenreForm';

const UpdateGenrePage = ({ query }) => (
  <GenreForm id={query.id} />
);

UpdateGenrePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateGenrePage;
