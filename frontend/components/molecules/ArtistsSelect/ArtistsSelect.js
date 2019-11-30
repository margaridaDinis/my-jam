import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_ARTISTS_QUERY } from '../../organisms/Artists';
import { CREATE_ARTIST_MUTATION } from '../../organisms/ArtistForm';
import ErrorMessage from '../ErrorMessage';
import MultiSelect from '../../atoms/MultiSelect';

const ArtistsSelect = ({ defaultValue, onChange }) => {
  const { data = { artists: [] }, loading, error } = useQuery(ALL_ARTISTS_QUERY);
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
