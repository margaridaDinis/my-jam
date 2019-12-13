import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../../components/pages/Genres';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import IndexHeader from '../../components/molecules/IndexHeader';

const GenresPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <IndexHeader scope='genres'/>
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
