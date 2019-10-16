import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { ALL_ALBUMS_QUERY } from '../../organisms/Albums';

export const DELETE_ALBUM_MUTATION = gql`
  mutation DELETE_ALBUM_MUTATION($id: ID!) {
    deleteAlbum(id: $id) {
      id
    }
  }
`;

const DeleteAlbum = ({ id, children }) => {
  const deleteHandler = (deleteAlbum) => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this album?')) {
      deleteAlbum();
    }
  };

  const handleUpdate = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ALBUMS_QUERY });
    data.albums = data.albums.filter((album) => album.id !== payload.data.deleteAlbum.id);
    cache.writeQuery({ query: ALL_ALBUMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ALBUM_MUTATION}
      variables={{ id }}
      update={handleUpdate}
    >
      {(deleteAlbum) => (
        <button onClick={() => deleteHandler(deleteAlbum)}>
          {children}
        </button>
      )}
    </Mutation>
  );
};

DeleteAlbum.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteAlbum;
