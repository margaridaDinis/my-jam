import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';
import { SINGLE_ALBUM_QUERY } from '../../../lib/album';

const Album = ({ id }) => {
  const { loading, data } = useQuery(
    SINGLE_ALBUM_QUERY,
    { variables: { id } },
  );

  if (loading) return <p>Loading...</p>;
  if (!data.album) return <p>No item found for ID {id} </p>;

  const { album } = data;
  return (
    <div>
      <Head>
        <title>{album.name} | My Jam</title>
      </Head>

      <h1>{album.name}
        <Link href={{ pathname: '/albums/update', query: { id: album.id } }}>
          <a> ✏️</a>
        </Link>
      </h1>
      {album.artists && (
        <div>
          {album.artists.map((artist) => (
            <p key={artist.id} >
              <Link href={{ pathname: '/artists/show', query: { id: artist.id } }}>
                <a>
                  {artist.name}
                </a>
              </Link>
            </p>
          ))}
        </div>
      )}
      <p>{album.year}</p>
      <p>{album.description}</p>
      {album.largeImage && <img src={album.largeImage} alt={album.name} width='400' />}
      {album.genres && (
        <div>
          {album.genres.map((genre) => (
            <p key={genre.id}>
              <Link href={{ pathname: '/genres/show', query: { id: genre.id } }}>
                <a>
                  {genre.name}
                </a>
              </Link>
            </p>
          ))}
        </div>
      )}
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
