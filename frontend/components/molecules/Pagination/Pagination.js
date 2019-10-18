import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import PaginationStyles from '../../../styles/PaginationStyles';

import { perPage } from '../../../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    albumsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return null;

  const { count } = data.albumsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Albums | My Jam | Page {page} of {pages}</title>
      </Head>
      <Link prefetch href={{
        pathname: 'albums',
        query: {
          page: page - 1,
        },
      }}>
        <a className='prev' aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        {page} of {pages}
      </p>
      <Link prefetch href={{
        pathname: 'albums',
        query: {
          page: page + 1,
        },
      }}>
        <a className='next' aria-disabled={page >= pages}>Next</a>
      </Link>
    </PaginationStyles>
  );
};

Pagination.defaultProps = {
  page: 1,
};

Pagination.propTypes = {
  page: PropTypes.number,
};

export default Pagination;
