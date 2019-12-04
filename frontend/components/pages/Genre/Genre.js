import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';

export const SINGLE_GENRE_QUERY = gql`
  query SINGLE_GENRE_QUERY($id: ID!) {
    genre (where: { id: $id }) {
      id
      name
      albums {
        id
        name
      }
    }
  }
`;

const Genre = ({ id }) => {
  const { loading, error, data } = useQuery(
    SINGLE_GENRE_QUERY,
    { variables: { id } },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Genre</h1>
      <p>
        {data.genre.name}
        <Link href={{ pathname: '/genres/update', query: { id: data.genre.id } }}>
          <a>✏️</a>
        </Link>
      </p>
      <div>
        <b>Albums:</b>
        {data.genre.albums.map((album) => (
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

Genre.propTypes = {
  id: PropTypes.string,
};

export default Genre;
