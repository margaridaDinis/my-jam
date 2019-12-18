import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ErrorMessage from '../ErrorMessage';
import Select from '../../atoms/Select';
import { ALL_LOCATIONS_QUERY, CREATE_LOCATION_MUTATION, LOCATIONS_OPTIONS_QUERY } from '../../../lib/locations';

const LocationSelect = ({ defaultValue, onChange }) => {
  const { data = { locations: [] }, loading, error } = useQuery(LOCATIONS_OPTIONS_QUERY);
  const [createLocation, createState] = useMutation(
    CREATE_LOCATION_MUTATION,
    { refetchQueries: [{ query: ALL_LOCATIONS_QUERY }] },
  );

  const handleCreate = async (name) => {
    const res = await createLocation({ variables: { name } });

    if (createState.error) return null;

    return res.data.createGenre;
  };

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <p>Loading...</p>;

  return (
    <Select
      label='Location'
      type='location'
      options={data.locations}
      onChange={onChange}
      defaultValue={defaultValue}
      addNewOption={handleCreate}
      loading={createState.loading}
    />
  );
};

LocationSelect.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default LocationSelect;
