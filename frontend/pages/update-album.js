import React from 'react';
import UpdateAlbum from '../components/organisms/UpdateAlbum';

const UpdateAlbumPage = ({ query }) => {
  return (
    <UpdateAlbum id={query.id} />
  );
};

export default UpdateAlbumPage;
