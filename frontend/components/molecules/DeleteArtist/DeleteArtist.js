import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { ALL_ARTISTS_QUERY, DELETE_ARTIST_MUTATION } from '../../../lib/artist';

const DeleteArtist = ({ id, children }) => {
  const [deleteArtist] = useMutation(
    DELETE_ARTIST_MUTATION,
    {
      refetchQueries: [{
        query: ALL_ARTISTS_QUERY,
      }],
    },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this artist?')) {
      // eslint-disable-next-line
      deleteArtist({ variables: { id } }).catch((e) => alert(e.message));
    }
  };

  return (
    <button onClick={deleteHandler}>
      {children}
    </button>
  );
};

DeleteArtist.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteArtist;
