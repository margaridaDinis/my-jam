import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Pagination from '@kiwicom/orbit-components/lib/Pagination';
import Router from 'next/dist/lib/router';
import { perPage } from '../../../config';
import { ALBUMS_PAGINATION_QUERY } from '../../../lib/album';

const PaginationComponent = ({ page }) => {
  const { loading, data } = useQuery(ALBUMS_PAGINATION_QUERY);

  if (loading) return null;

  const { count } = data.albumsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  if (pages <= 1) return null;

  const handlePageChange = (newPage) => Router.push({ pathname: '/albums', query: { page: newPage } });

  // TODO page title
  return (
    <div style={{ padding: '2rem 0' }}>

      {/* <Head> */}
      {/*  <title>Albums | My Jam | Page {page} of {pages}</title> */}
      {/* </Head> */}
      <Pagination pageCount={pages} selectedPage={page} onPageChange={handlePageChange} />
    </div>
  );
};

PaginationComponent.defaultProps = {
  page: 1,
};

PaginationComponent.propTypes = {
  page: PropTypes.number,
};

export default PaginationComponent;
