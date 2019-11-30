import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { SINGLE_ITEM_QUERY } from '../Album';
import AlbumForm from '../../molecules/AlbumForm';

export const UPDATE_ALBUM_MUTATION = gql`
  mutation UPDATE_ALBUM_MUTATION(
    $id: ID!
    $name: String
    $year: Int
    $description: String
    $image: String
    $largeImage: String
    $genres: [String]
  ) {
    updateAlbum(
      id: $id
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
      genres: $genres
    ) {
      id
      name
      year
      description
      genres {
        id
      }
    }
  }
`;

const UpdateAlbum = ({ id }) => {
  const { loading, data } = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });
  const [updateAlbum, { loading: submitting, error }] = useMutation(
    UPDATE_ALBUM_MUTATION,
    { refetchQueries: [{ query: SINGLE_ITEM_QUERY, variables: { id } }] },
  );

  if (loading) return <p>Loading...</p>;
  if (!data.album) return <p>No item found for ID {id} </p>;

  const handleSubmit = async (values) => {
    const res = await updateAlbum({ variables: { id, ...values } });

    Router.push({
      pathname: '/album',
      query: { id: res.data.updateAlbum.id },
    });
  };


  return (
    <AlbumForm
      album={data.album}
      handleSubmit={handleSubmit}
      submitting={submitting}
      error={error}
      isEdit
    />
  );
};

UpdateAlbum.defaultProps = {
  id: '',
};

UpdateAlbum.propTypes = {
  id: PropTypes.string,
};

export default UpdateAlbum;
