import gql from 'graphql-tag';

export const ALL_LOCATIONS_QUERY = gql`
  query ALL_LOCATIONS_QUERY {
    locations {
      id
      name
      albums {
        id
        name
      }
    }
  }
`;

export const SINGLE_LOCATION_QUERY = gql`
  query SINGLE_LOCATION_QUERY($id: ID!) {
    location(where: { id: $id }) {
      id
      name
      description
      albums {
        id
        name
      }
    }
  }
`;

export const CREATE_LOCATION_MUTATION = gql`
  mutation CREATE_LOCATION_MUTATION($name: String!, $description: String) {
    createLocation(name: $name, description: $description) {
      id name description
    }
  }
`;

export const UPDATE_LOCATION_MUTATION = gql`
  mutation UPDATE_LOCATION_MUTATION($id: ID!, $name: String!, $description: String) {
    updateLocation(id: $id, name: $name, description: $description) {
      id name description
    }
  }
`;

export const DELETE_LOCATION_MUTATION = gql`
  mutation DELETE_LOCATION_MUTATION($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;
