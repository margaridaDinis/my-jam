import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import AlbumForm from '../../molecules/AlbumForm';
import { ALL_ALBUMS_QUERY, CREATE_ALBUM_MUTATION } from '../../../lib/album';

const CreateAlbum = () => {
  const [createAlbum, { loading, error }] = useMutation(
    CREATE_ALBUM_MUTATION,
    {
      refetchQueries: [{
        query: ALL_ALBUMS_QUERY,
      }],
    },
  );

  const handleSubmit = async (values) => {
    const res = await createAlbum({ variables: values });

    Router.push({
      pathname: '/albums/show',
      query: { id: res.data.createAlbum.id },
    });
  };

  return (
    <AlbumForm
      handleSubmit={handleSubmit}
      submitting={loading}
      error={error}
    />
  );
};

export default CreateAlbum;
