import React from 'react';
import PropTypes from 'prop-types';

import Genre from '../../components/pages/Genre';

const GenrePage = ({ query }) => <Genre id={query.id} />;

GenrePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default GenrePage;
