import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useQuery } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY } from '../../organisms/Genres';
import ErrorMessage from '../ErrorMessage';

const GENRES = 'genres';

const GenresSelect = ({ defaultValue, handleChange }) => {
  const { data, loading, error } = useQuery(ALL_GENRES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  if (!data.genres) return <p>No genres found</p>;

  const onChange = (values) => {
    const target = { name: GENRES, type: 'select' };

    target.value = values
      ? values.map((option) => option.value)
      : [];

    handleChange({ target });
  };

  const options = data.genres.map((genre) => ({ value: genre.id, label: genre.name }));
  const selectedValues = options.filter((v) => defaultValue.includes(v.value));

  return (
    <label htmlFor={GENRES}>
      Genre
      <Select
        instanceId={GENRES}
        options={options}
        defaultValue={selectedValues}
        onChange={onChange}
        isMulti
        isClearable
        isSearchable
      />
    </label>
  );
};

GenresSelect.propTypes = {
  defaultValue: PropTypes.array,
  handleChange: PropTypes.func,
};

export default GenresSelect;
