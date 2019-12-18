import gql from 'graphql-tag';

export const ALL_GENRES_QUERY = gql`
  query ALL_GENRES_QUERY {
    genres {
      id
      name
      albums {
        id
      }
    }
  }
`;

export const GENRES_OPTIONS_QUERY = gql`
  query GENRES_OPTIONS_QUERY {
    genres {
      value: id
      label: name
    }
  }
`;

export const SINGLE_GENRE_QUERY = gql`
  query SINGLE_GENRE_QUERY($id: ID!) {
    genre (where: { id: $id }) {
      id
      name
      albums {
        id
        name
      }
    }
  }
`;

export const CREATE_GENRE_MUTATION = gql`
  mutation CREATE_GENRE_MUTATION($name: String!) { createGenre(name: $name) { id name } }
`;

export const UPDATE_GENRE_MUTATION = gql`
  mutation UPDATE_GENRE_MUTATION($id: ID! $name: String!) {
    updateGenre(
      id: $id
      name: $name
    ) { id name } }
`;

export const DELETE_GENRE_MUTATION = gql`
  mutation DELETE_GENRE_MUTATION($id: ID!) {
    deleteGenre(id: $id) {
      id
    }
  }
`;
