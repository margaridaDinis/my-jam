import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import Link from 'next/link';

export const SINGLE_ARTIST_QUERY = gql`
  query SINGLE_ARTIST_QUERY($id: ID!) {
    artist(where: { id: $id }) {
      id
      name
      albums {
        id
        name
      }
    }
  }
`;

const Artist = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ARTIST_QUERY, { variables: { id } });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { artist } = data;
  
  return (
    <div>
      <h1>Artist</h1>
      <p>
        {artist.name}
        <Link href={{ pathname: 'update-artist', query: { id: artist.id } }}>
          <a>✏️</a>
        </Link>
      </p>
      <div>
        <b>Albums:</b>
        {artist.albums.map((album) => (
          <Link key={album.id} href={{ pathname: 'album', query: { id: album.id } }}>
            <li>
              {album.name}
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
};

Artist.propTypes = {
  id: PropTypes.string,
};

export default Artist;
