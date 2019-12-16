import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_ARTISTS_QUERY, DELETE_ARTIST_MUTATION } from '../../../lib/artist';
import IndexTable from '../../organisms/IndexTable';

const Artists = () => {
  const { loading, error, data } = useQuery(ALL_ARTISTS_QUERY);

  return (
    <IndexTable
      itemName='artists'
      data={data}
      loading={loading}
      error={error}
      query={ALL_ARTISTS_QUERY}
      deleteMutation={DELETE_ARTIST_MUTATION}
    />
  );
};

export default Artists;
