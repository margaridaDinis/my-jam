import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Albums from '../../components/pages/Albums';
import IndexHeader from '../../components/molecules/IndexHeader';

const AlbumsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <Fragment>
      <IndexHeader scope='albums'/>
      <Albums page={page}/>
    </Fragment>
  );
};

AlbumsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default AlbumsPage;
