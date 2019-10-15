import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { DELETE_ALBUM_MUTATION } from './index';
import { ALL_ALBUMS_QUERY } from '../../organisms/Albums';

const DeleteAlbum = ({ id, children }) => {
  const deleteHandler = (deleteAlbum) => {
    if (confirm('Are you sure you want to delete this album?')) {
      deleteAlbum();
    }
  };

  const handleUpdate = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ALBUMS_QUERY });
    data.albums = data.albums.filter(({ id }) => id !== payload.data.deleteAlbum.id);
    cache.writeQuery({ query: ALL_ALBUMS_QUERY, data })
  };

  return (
    <Mutation
      mutation={DELETE_ALBUM_MUTATION}
      variables={{ id }}
      update={handleUpdate}
    >
      {(deleteAlbum, { error, loading }) => {
        return (
          <button onClick={() => deleteHandler(deleteAlbum)}>
            {children}
          </button>
        );
      }}
    </Mutation>
  );
};

DeleteAlbum.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string
};

export default DeleteAlbum;
