import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import ErrorMessage from '../../molecules/ErrorMessage';
import { SINGLE_ARTIST_QUERY } from '../../../lib/artist';

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
        <Link href={{ pathname: '/artist/update/', query: { id: artist.id } }}>
          <a>✏️</a>
        </Link>
      </p>
      <div>
        <b>Albums:</b>
        {artist.albums.map((album) => (
          <Link key={album.id} href={{ pathname: '/albums/show', query: { id: album.id } }}>
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
