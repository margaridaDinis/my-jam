import React from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AlbumForm from '../../molecules/AlbumForm';
import { ALL_ALBUMS_QUERY } from '../Albums';

export const CREATE_ALBUM_MUTATION = gql`
  mutation CREATE_ALBUM_MUTATION(
    $name: String!
    $year: Int
    $description: String
    $image: String!
    $largeImage: String!
  ) {
    createAlbum(
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
      name
      year
      description
      image
      largeImage
    }
  }
`;

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
      pathname: '/album',
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
