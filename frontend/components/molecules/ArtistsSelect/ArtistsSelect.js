import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_ARTIST_MUTATION, ALL_ARTISTS_QUERY, ARTISTS_OPTIONS_QUERY } from '../../../lib/artist';
import ErrorMessage from '../ErrorMessage';
import MultiSelect from '../../atoms/MultiSelect';

const ArtistsSelect = ({ defaultValue, onChange }) => {
  const { data = { artists: [] }, loading, error } = useQuery(ARTISTS_OPTIONS_QUERY);
  const [createArtist, createState] = useMutation(
    CREATE_ARTIST_MUTATION,
    { refetchQueries: [{ query: ALL_ARTISTS_QUERY }] },
  );

  const handleCreate = async (name) => {
    const res = await createArtist({ variables: { name } });

    if (createState.error) return null;

    return res.data.createArtist;
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <MultiSelect
      label='Artists'
      type='artists'
      options={data.artists}
      onChange={onChange}
      defaultValue={defaultValue}
      addNewOption={handleCreate}
      loading={loading || createState.loading}
    />
  );
};

ArtistsSelect.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
};

export default ArtistsSelect;
