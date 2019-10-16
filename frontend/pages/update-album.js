import React from 'react';
import PropTypes from 'prop-types';

import UpdateAlbum from '../components/organisms/UpdateAlbum';

const UpdateAlbumPage = ({ query }) => (
  <UpdateAlbum id={query.id} />
);

UpdateAlbumPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateAlbumPage;
