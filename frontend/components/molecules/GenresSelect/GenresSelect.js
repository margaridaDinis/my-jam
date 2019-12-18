import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ErrorMessage from '../ErrorMessage';
import MultiSelect from '../../atoms/MultiSelect';
import { ALL_GENRES_QUERY, CREATE_GENRE_MUTATION, GENRES_OPTIONS_QUERY } from '../../../lib/genres';

const GenresSelect = ({ defaultValue, onChange }) => {
  const { data = { genres: [] }, loading, error } = useQuery(GENRES_OPTIONS_QUERY);
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
