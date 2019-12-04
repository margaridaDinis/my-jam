import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Router from 'next/dist/lib/router';
import LocationForm from '../../organisms/LocationForm/LocationForm';
import { ALL_LOCATIONS_QUERY } from '../Locations';
import { SINGLE_LOCATION_QUERY } from '../Location';

const UPDATE_LOCATION_MUTATION = gql`
  mutation UPDATE_LOCATION_MUTATION($id: ID!, $name: String!, $description: String) {
    updateLocation(id: $id, name: $name, description: $description) {
      id name description
    }
  }
`;

const UpdateLocation = ({ id }) => {
  const { data, ...state } = useQuery(SINGLE_LOCATION_QUERY, { variables: { id } });
  const [updateLocation, { error, loading }] = useMutation(
    UPDATE_LOCATION_MUTATION,
    {
      refetchQueries: [{
        query: ALL_LOCATIONS_QUERY,
      }],
    },
  );

  const onSubmit = async (values) => {
    const res = await updateLocation({ variables: { id, ...values } });

    Router.push({
      pathname: '/locations/show',
      query: { id: res.data.updateLocation.id },
    });
  };
  if (state.error || !data || !data.location) return <p>No location found for ID {id} </p>;

  return (
    <div>
      <LocationForm
        defaultValues={data.location}
        error={error}
        onSubmit={onSubmit}
        isLoading={state.loading || loading}
        isEdit
      />
    </div>
  );
};

UpdateLocation.propTypes = {
  id: PropTypes.string,
};

export default UpdateLocation;
