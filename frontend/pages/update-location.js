import React from 'react';
import PropTypes from 'prop-types';
import Location from '../components/pages/Location';

const LocationPage = ({ query }) => <Location id={query.id}/>;

LocationPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default LocationPage;
