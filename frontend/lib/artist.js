import gql from 'graphql-tag';

export const ALL_ARTISTS_QUERY = gql`
  query ALL_ARTISTS_QUERY {
    artists {
      id
      name
      albums {
        id
      }
    }
  }
`;

export const SINGLE_ARTIST_QUERY = gql`
  query SINGLE_ARTIST_QUERY($id: ID!) {
    artist(where: { id: $id }) {
      id
      name
      albums {
        id
        name
      }
    }
  }
`;

export const CREATE_ARTIST_MUTATION = gql`
  mutation CREATE_ARTIST_MUTATION($name: String!) { createArtist(name: $name) { id name } }
`;

export const UPDATE_ARTIST_MUTATION = gql`
  mutation UPDATE_ARTIST_MUTATION($id: ID! $name: String!) {
    updateArtist(id: $id name: $name) {
      id
    }
  }
`;

export const DELETE_ARTIST_MUTATION = gql`
  mutation DELETE_ARTIST_MUTATION($id: ID!) {
    deleteArtist(id: $id) {
      id
    }
  }
`;
