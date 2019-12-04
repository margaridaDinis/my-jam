import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { ALL_LOCATIONS_QUERY } from '../../pages/Locations';


export const DELETE_LOCATION_MUTATION = gql`
  mutation DELETE_LOCATION_MUTATION($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;

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
