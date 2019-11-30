import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteArtist from '../../molecules/DeleteArtist';

export const ALL_ARTISTS_QUERY = gql`
  query ALL_ARTISTS_QUERY {
    artists {
      id
      name
      albums {
        id
      }
    }
  }
`;

const Artists = () => {
  const { loading, error, data } = useQuery(ALL_ARTISTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Artists</h1>
      <Link href='/new-artist'>
        <a>New</a>
      </Link>
      <ul>
        {data.artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            <Link href={{ pathname: 'artist', query: { id: artist.id } }}>
              <a>➕</a>
            </Link>
            <Link href={{ pathname: 'update-artist', query: { id: artist.id } }}>
              <a>✏️</a>
            </Link>
            <DeleteArtist id={artist.id}>Delete Artist</DeleteArtist>
          </li>))}
      </ul>
    </div>
  );
};

// Artist.propTypes = {
//   page: PropTypes.number
// };

export default Artists;
