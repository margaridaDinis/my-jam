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
      refetchQueries: [{
        query: ALL_ALBUMS_QUERY,
      }],
    },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this album?')) {
      // eslint-disable-next-line
      removeAlbum({ variables: { id } }).catch((e) => alert(e.message));
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
