import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY, DELETE_GENRE_MUTATION } from '../../../lib/genres';

const DeleteGenre = ({ id, children }) => {
  const [removeGenre] = useMutation(
    DELETE_GENRE_MUTATION,
    {
      refetchQueries: [{
        query: ALL_GENRES_QUERY,
      }],
    },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this genre?')) {
      // eslint-disable-next-line
      removeGenre({ variables: { id } }).catch((e) => alert(e.message));
    }
  };

  return (
    <button onClick={deleteHandler}>
      {children}
    </button>
  );
};

DeleteGenre.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteGenre;
