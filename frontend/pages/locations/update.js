import React from 'react';
import PropTypes from 'prop-types';
import UpdateLocation from '../../components/pages/UpdateLocation';
import RequestSignIn from '../../components/organisms/RequestSignIn';

const UpdateLocationPage = ({ query }) => (
  <RequestSignIn>
    <UpdateLocation id={query.id}/>
  </RequestSignIn>
);

UpdateLocationPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default UpdateLocationPage;
