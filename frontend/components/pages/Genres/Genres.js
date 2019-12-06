import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteGenre from '../../molecules/DeleteGenre';
import { ALL_GENRES_QUERY } from '../../../lib/genres';

const Genres = () => {
  const { loading, error, data } = useQuery(ALL_GENRES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Genres</h1>
      <Link href='/genres/new'>
        <a>New</a>
      </Link>
      <ul>
        {data.genres.map((genre) => (
          <li key={genre.id}>
            {genre.name}
            <Link href={{ pathname: '/genres/show', query: { id: genre.id } }}>
              <a>➕</a>
            </Link>
            <Link href={{ pathname: '/genres/update', query: { id: genre.id } }}>
              <a>✏️</a>
            </Link>
            <DeleteGenre id={genre.id}>Delete Genre</DeleteGenre>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Genre.propTypes = {
//   page: PropTypes.number
// };

export default Genres;
