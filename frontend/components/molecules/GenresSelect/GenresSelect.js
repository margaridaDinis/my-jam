import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY } from '../../organisms/Genres';
import { CREATE_GENRE_MUTATION } from '../../organisms/GenreForm';
import ErrorMessage from '../ErrorMessage';
import MultiSelect from '../../atoms/MultiSelect';

const GenresSelect = ({ defaultValue, onChange }) => {
  const { data = { genres: [] }, loading, error } = useQuery(ALL_GENRES_QUERY);
  const [createGenre, createState] = useMutation(
    CREATE_GENRE_MUTATION,
    { refetchQueries: [{ query: ALL_GENRES_QUERY }] },
  );

  const handleCreate = async (name) => {
    const res = await createGenre({ variables: { name } });

    if (createState.error) return null;

    return res.data.createGenre;
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <MultiSelect
      label='Genres'
      type='genres'
      options={data.genres}
      onChange={onChange}
      defaultValue={defaultValue}
      addNewOption={handleCreate}
      loading={loading || createState.loading}
    />
  );
};

GenresSelect.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
};

export default GenresSelect;
