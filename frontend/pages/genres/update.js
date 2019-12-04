import React from 'react';
import PropTypes from 'prop-types';

import GenreForm from '../../components/pages/GenreForm';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const UpdateGenrePage = ({ query }) => (
  <RequestSignIn>
    <GenreForm id={query.id} />
  </RequestSignIn>
);

UpdateGenrePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateGenrePage;
