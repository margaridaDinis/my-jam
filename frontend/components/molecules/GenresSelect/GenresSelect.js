import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY } from '../../organisms/Genres';
import ErrorMessage from '../ErrorMessage';

const GENRES = 'genres';

const GenresSelect = ({ defaultValue, handleChange }) => {
  const { data, loading, error } = useQuery(ALL_GENRES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  if (!data.genres) return <p>No genres found</p>;

  const onChange = ({ target: { value } }) => {
    const target = { name: GENRES, type: 'select' };
    const valueExists = defaultValue.includes(value);

    target.value = valueExists
      ? defaultValue.filter((v) => (v !== value))
      : [...defaultValue, value];

    handleChange({ target });
  };

  return (
    <label htmlFor={GENRES}>
      Genre
      <select
        name={GENRES}
        id={GENRES}
        onChange={onChange}
        multiple
      >
        {data.genres.map((genre) => (
          <option
            key={genre.id}
            value={genre.id}
            className={defaultValue.includes(genre.id) ? 'selected' : ''}
          >
            {genre.name}
          </option>
        ))}
      </select>
    </label>
  );
};

GenresSelect.propTypes = {
  defaultValue: PropTypes.array,
  handleChange: PropTypes.func,
};

export default GenresSelect;
