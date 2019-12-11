import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../../components/pages/Locations';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const LocationsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <Locations page={page}/>
    </RequestSignIn>
  );
};

LocationsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default LocationsPage;
