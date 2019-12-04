import React from 'react';
import PropTypes from 'prop-types';

import UpdateAlbum from '../../components/pages/UpdateAlbum';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const UpdateAlbumPage = ({ query }) => (
  <RequestSignIn>
    <UpdateAlbum id={query.id} />
  </RequestSignIn>
);

UpdateAlbumPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateAlbumPage;
