import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Loading from '@kiwicom/orbit-components/lib/Loading';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import ErrorMessage from '../../molecules/ErrorMessage';
import Album from '../../molecules/Album';
import Pagination from '../../molecules/Pagination/Pagination';

import { perPage } from '../../../config';
import { ALL_ALBUMS_QUERY } from '../../../lib/album';

const Albums = ({ page }) => {
  const { loading, error, data } = useQuery(
    ALL_ALBUMS_QUERY,
    { variables: { skip: (page * perPage) - perPage } },
  );
  if (loading) return <Loading/>;
  if (error) return <ErrorMessage error={error}/>;

  return (
    <Fragment>
      <Pagination page={page}/>
      <Grid
        gap='2rem'
        columns='1fr'
        tablet={{ gap: '1rem', columns: 'repeat(3, 1fr)' }}
        desktop={{ columns: 'repeat(4, 1fr)' }}
        justify='center'
      >
        {data.albums.map((album) => (
          <Album key={album.id} album={album}/>
        ))}
      </Grid>
      <Pagination page={page}/>
    </Fragment>
  );
};

Albums.propTypes = {
  page: PropTypes.number,
};

export default Albums;
