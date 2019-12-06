import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ALL_LOCATIONS_QUERY, DELETE_LOCATION_MUTATION } from '../../../lib/locations';

const DeleteLocation = ({ id, children }) => {
  const [deleteLocation] = useMutation(
    DELETE_LOCATION_MUTATION,
    {
      refetchQueries: [{
        query: ALL_LOCATIONS_QUERY,
      }],
    },
  );

  const deleteHandler = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this location?')) {
      // eslint-disable-next-line
      deleteLocation({ variables: { id } }).catch((e) => alert(e.message));
    }
  };

  return (
    <button onClick={deleteHandler}>
      {children}
    </button>
  );
};

DeleteLocation.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default DeleteLocation;
