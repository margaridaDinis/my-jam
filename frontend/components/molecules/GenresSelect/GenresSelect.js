import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY } from '../../organisms/Genres';
import { CREATE_GENRE_MUTATION } from '../../organisms/GenreForm';
import ErrorMessage from '../ErrorMessage';

const GENRES = 'genres';

const GenresSelect = ({ defaultValue, onChange }) => {
  const { data = { genres: [] }, loading, error } = useQuery(ALL_GENRES_QUERY);
  const [selected, setSelected] = useState(data.genres.filter((v) => defaultValue.includes(v.id)));

  const [createGenre, createState] = useMutation(
    CREATE_GENRE_MUTATION,
    { refetchQueries: [{ query: ALL_GENRES_QUERY }] },
  );

  useEffect(() => {
    const values = selected || [];

    onChange({ [GENRES]: values.map((option) => option.id) });
  }, [selected]);

  const handleCreate = async (name) => {
    const res = await createGenre({ variables: { name } });

    if (createState.error) return;

    const newGenre = res.data.createGenre;

    setSelected([...selected, newGenre]);
  };

  const handleChange = (values) => {
    setSelected(values);
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <label htmlFor={GENRES}>
      Genre
      <CreatableSelect
        instanceId={GENRES}
        options={data.genres}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        getNewOptionData={(inputValue, optionLabel) => ({
          id: inputValue,
          name: optionLabel,
        })}
        value={selected}
        onChange={handleChange}
        onCreateOption={handleCreate}
        isLoading={loading || createState.loading}
        isMulti
        isClearable
        isSearchable
      />
    </label>
  );
};

GenresSelect.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
};

export default GenresSelect;
