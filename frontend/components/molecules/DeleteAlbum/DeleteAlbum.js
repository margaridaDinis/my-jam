import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import Button from '@kiwicom/orbit-components/lib/Button';
import { ALL_ALBUMS_QUERY, DELETE_ALBUM_MUTATION } from '../../../lib/album';
import { removeImage } from '../../../actions/file';

const DeleteAlbum = ({ id, image, children }) => {
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
    if (confirm('Are you sure you want to delete this albums?')) {
      removeAlbum({ variables: { id } })
        .then(() => removeImage(image))
        .catch((e) => alert(e.message)); // eslint-disable-line
    }
  };

  return (
    <Button onClick={deleteHandler} type='critical'>
      {children}
    </Button>
  );
};

DeleteAlbum.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteAlbum;
