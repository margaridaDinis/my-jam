import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    album(where: { id: $id }) {
      id
      name
      year
      description
      image
      largeImage
    }
  }
`;

const Album = ({ id }) => {
  const { loading, data } = useQuery(
    SINGLE_ITEM_QUERY,
    { variables: { id } },
  );

  if (loading) return <p>Loading...</p>;
  if (!data.album) return <p>No item found for ID {id} </p>;

  return (
    <div>
      <Head>
        <title>{data.album.name} | My Jam</title>
      </Head>
      <h1>{data.album.name}</h1>
      <p>{data.album.year}</p>
      <p>{data.album.description}</p>
      {data.album.largeImage && <img src={data.album.largeImage} alt={data.album.name} width='400' />}
    </div>
  );
};

Album.defaultProps = {
  id: '',
};

Album.propTypes = {
  id: PropTypes.string,
};

export default Album;
