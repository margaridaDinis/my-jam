import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    album(where: { id: $id }) {
      id
      name
      year
      description
      image
      largeImage
      genres {
        id
        name
      }
      artists {
        id
        name
      }
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

  const { album } = data;
  return (
    <div>
      <Head>
        <title>{album.name} | My Jam</title>
      </Head>

      <h1>{album.name}
        <Link href={{ pathname: '/update-album', query: { id: album.id } }}>
          <a> ✏️</a>
        </Link>
      </h1>
      {album.artists && (
        <div>
          {album.artists.map((artist) => (
            <p key={artist.id} >
              <Link href={{ pathname: 'artist', query: { id: artist.id } }}>
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
              <Link href={{ pathname: 'genre', query: { id: genre.id } }}>
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
