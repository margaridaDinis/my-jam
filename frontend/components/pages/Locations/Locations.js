import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_LOCATIONS_QUERY, DELETE_LOCATION_MUTATION } from '../../../lib/locations';
import IndexTable from '../../organisms/IndexTable';

const Locations = () => {
  const { loading, error, data } = useQuery(ALL_LOCATIONS_QUERY);

  return (
    <IndexTable
      itemName='locations'
      data={data}
      loading={loading}
      error={error}
      query={ALL_LOCATIONS_QUERY}
      deleteMutation={DELETE_LOCATION_MUTATION}
    />
  );
};

export default Locations;
