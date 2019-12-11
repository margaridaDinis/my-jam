import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../../components/pages/Genres';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const GenresPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <Genres page={page} />
    </RequestSignIn>
  );
};

GenresPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default GenresPage;
