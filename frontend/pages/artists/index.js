import React from 'react';
import PropTypes from 'prop-types';

import Artists from '../../components/pages/Artists';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import IndexHeader from '../../components/molecules/IndexHeader';

const ArtistsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <IndexHeader scope='artists'/>
      <Artists page={page} />
    </RequestSignIn>
  );
};

ArtistsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default ArtistsPage;
