import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_GENRES_QUERY, DELETE_GENRE_MUTATION } from '../../../lib/genres';
import IndexTable from '../../organisms/IndexTable';

const Genres = () => {
  const { loading, error, data } = useQuery(ALL_GENRES_QUERY);

  return (
    <IndexTable
      itemName='genres'
      data={data}
      loading={loading}
      error={error}
      query={ALL_GENRES_QUERY}
      deleteMutation={DELETE_GENRE_MUTATION}
    />
  );
};

export default Genres;
