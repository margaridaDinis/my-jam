import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { ALL_ALBUMS_QUERY } from '../../organisms/Albums';

export const DELETE_ALBUM_MUTATION = gql`
  mutation DELETE_ALBUM_MUTATION($id: ID!) {
    deleteAlbum(id: $id) {
      id
    }
  }
`;

const DeleteAlbum = ({ id, children }) => {
  const [removeAlbum] = useMutation(
    DELETE_ALBUM_MUTATION,
    {
      update(cache, { data: { deleteAlbum } }) {
        const { albums } = cache.readQuery({ query: ALL_ALBUMS_QUERY });
        cache.writeQuery({
          query: ALL_ALBUMS_QUERY,
          data: { albums: albums.filter((album) => album.id !== deleteAlbum.id) },
        });
      },
    },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this album?')) {
      removeAlbum({ variables: { id } });
    }
  };

  return (
    <button onClick={deleteHandler}>
      {children}
    </button>
  );
};

DeleteAlbum.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteAlbum;
