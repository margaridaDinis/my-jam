import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SINGLE_ALBUM_QUERY, UPDATE_ALBUM_MUTATION } from '../../../lib/album';
import AlbumForm from '../../molecules/AlbumForm';

const UpdateAlbum = ({ id }) => {
  const { loading, data } = useQuery(SINGLE_ALBUM_QUERY, { variables: { id } });
  const [updateAlbum, { loading: submitting, error }] = useMutation(
    UPDATE_ALBUM_MUTATION,
    { refetchQueries: [{ query: SINGLE_ALBUM_QUERY, variables: { id } }] },
  );

  if (loading) return <p>Loading...</p>;
  if (!data || !data.album) return <p>No item found for ID {id} </p>;

  const handleSubmit = async (values) => {
    const res = await updateAlbum({ variables: { id, ...values } });

    Router.push({
      pathname: '/albums/show',
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
