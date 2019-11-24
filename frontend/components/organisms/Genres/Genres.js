import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteGenre from '../../molecules/DeleteGenre';

export const ALL_GENRES_QUERY = gql`
  query ALL_GENRES_QUERY {
    genres {
      id
      name
      albums {
        id
      }
    }
  }
`;

const Genres = () => {
  const { loading, error, data } = useQuery(ALL_GENRES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Genres</h1>
      <Link href='/new-genre'>
        <a>New</a>
      </Link>
      <ul>
        {data.genres.map((genre) => (
          <li key={genre.id}>
            {genre.name}
            <Link href={{ pathname: 'genre', query: { id: genre.id } }}>
              <a>➕</a>
            </Link>
            <Link href={{ pathname: 'update-genre', query: { id: genre.id } }}>
              <a>✏️</a>
            </Link>
            <DeleteGenre id={genre.id}>Delete Genre</DeleteGenre>
          </li>))}
      </ul>
    </div>
  );
};

// Genre.propTypes = {
//   page: PropTypes.number
// };

export default Genres;
