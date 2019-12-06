import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteArtist from '../../molecules/DeleteArtist';
import { ALL_ARTISTS_QUERY } from '../../../lib/artist';

const Artists = () => {
  const { loading, error, data } = useQuery(ALL_ARTISTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Artists</h1>
      <Link href='/artists/new'>
        <a>New</a>
      </Link>
      <ul>
        {data.artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            <Link href={{ pathname: '/artists/show', query: { id: artist.id } }}>
              <a>➕</a>
            </Link>
            <Link href={{ pathname: '/artists/update', query: { id: artist.id } }}>
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