import React from 'react';
import PropTypes from 'prop-types';
import Locations from '../components/pages/Locations';

const LocationsPage = ({ query }) => {
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);
  
  return <Locations page={page}/>;
};

LocationsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default LocationsPage;
