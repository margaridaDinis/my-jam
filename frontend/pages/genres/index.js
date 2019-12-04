import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../../components/pages/Genres';

const GenresPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return <Genres page={page} />;
};

GenresPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default GenresPage;
