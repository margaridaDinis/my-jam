import React from 'react';
import PropTypes from 'prop-types';
import UpdateLocation from '../components/pages/UpdateLocation';

const UpdateLocationPage = ({ query }) => <UpdateLocation id={query.id}/>;

UpdateLocationPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateLocationPage;
