import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/dist/lib/router';
import LocationForm from '../../organisms/LocationForm/LocationForm';
import { ALL_LOCATIONS_QUERY } from '../Locations';

const CREATE_LOCATION_MUTATION = gql`
  mutation CREATE_LOCATION_MUTATION($name: String!, $description: String) {
    createLocation(name: $name, description: $description) {
      id name description
    }
  }
`;

const NewLocation = () => {
  const [createLocation, { error, loading }] = useMutation(
    CREATE_LOCATION_MUTATION,
    {
      refetchQueries: [{
        query: ALL_LOCATIONS_QUERY,
      }],
    },
  );

  const onSubmit = async (values) => {
    const res = await createLocation({ variables: values });

    Router.push({
      pathname: '/locations/show',
      query: { id: res.data.createLocation.id },
    });
  };

  return (
    <div>
      <LocationForm
        defaultValues={{ name: '', description: '' }}
        error={error}
        onSubmit={onSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default NewLocation;
