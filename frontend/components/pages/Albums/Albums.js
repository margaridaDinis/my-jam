import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import Link from 'next/link';
import ErrorMessage from '../../molecules/ErrorMessage';
import Album from '../../molecules/Album';
import Pagination from '../../molecules/Pagination/Pagination';

import { perPage } from '../../../config';
import { ALL_ALBUMS_QUERY } from '../../../lib/album';

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
    { variables: { skip: (page * perPage) - perPage } },
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Fragment>
      <Link href='/albums/new'>
        <a>New Album</a>
      </Link>
      <Center>
        <Pagination page={page} />
        <AlbumsList>
          {data.albums.map((album) => (
            <Album key={album.id} album={album} />
          ))}
        </AlbumsList>
        <Pagination page={page} />
      </Center>
    </Fragment>
  );
};

Albums.propTypes = {
  page: PropTypes.number,
};

export default Albums;
