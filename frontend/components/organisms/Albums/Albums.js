import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ErrorMessage from '../../molecules/ErrorMessege';
import Album from '../../molecules/Album';
import Pagination from '../../molecules/Pagination/Pagination';

import { perPage } from '../../../config';

export const ALL_ALBUMS_QUERY = gql`
  query ALL_ALBUMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    albums(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      year
      name
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const AlbumsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const Albums = ({ page }) => {
  const { loading, error, data } = useQuery(
    ALL_ALBUMS_QUERY,
    { variables: { skip: (page * perPage) - perPage } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Center>
      <Pagination page={page} />
      <AlbumsList>
        {data.albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </AlbumsList>
      <Pagination page={page} />
    </Center>
  );
};

Albums.propTypes = {
  page: PropTypes.number
};

export default Albums;
