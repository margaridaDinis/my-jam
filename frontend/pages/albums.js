import React from 'react';

import Albums from '../components/organisms/Albums';

const AlbumsPage = ({ query }) => {
  const page = isNaN(parseFloat(query.page)) ? 1 : parseFloat(query.page);

  return (
    <Albums page={page} />
  );
};

export default AlbumsPage;
