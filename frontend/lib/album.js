import gql from 'graphql-tag';
import { perPage } from '../config';

export const ALL_ALBUMS_QUERY = gql`
  query ALL_ALBUMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    albums(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      year
      name
      description
      image
      largeImage
      type
      artists {
        name
      }
    }
  }
`;

export const SINGLE_ALBUM_QUERY = gql`
  query SINGLE_ALBUM_QUERY($id: ID!) {
    album(where: { id: $id }) {
      id
      name
      year
      description
      image
      largeImage
      type
      genres {
        id
        name
      }
      artists {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`;

export const ALBUMS_PAGINATION_QUERY = gql`
  query ALBUMS_PAGINATION_QUERY {
    albumsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const SEARCH_ALBUMS_QUERY = gql`
  query SEARCH_ALBUNS_QUERY($searchTerm: String!) {
    albums(where: {
      OR: [
        { name_contains: $searchTerm },
        { description_contains: $searchTerm },
        { artists_some: { name_contains: $searchTerm }}
      ]
    }) {
      id
      name
      image
      artists { name }
    }
  }
`;

export const CREATE_ALBUM_MUTATION = gql`
  mutation CREATE_ALBUM_MUTATION(
    $name: String!
    $year: Int
    $description: String
    $image: String
    $largeImage: String
    $genres: [String]
    $artists: [String]
    $location: String
    $type: String
  ) {
    createAlbum(
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
      genres: $genres
      artists: $artists
      location: $location
      type: $type
    ) {
      id
      name
      year
      description
      image
      largeImage
    }
  }
`;

export const UPDATE_ALBUM_MUTATION = gql`
  mutation UPDATE_ALBUM_MUTATION(
    $id: ID!
    $name: String
    $year: Int
    $description: String
    $image: String
    $largeImage: String
    $genres: [String]
    $artists: [String]
    $location: String
    $type: String
  ) {
    updateAlbum(
      id: $id
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
      genres: $genres
      artists: $artists
      location: $location
      type: $type
    ) {
      id
      name
      year
      description
      genres { id }
      artists { id }
    }
  }
`;

export const DELETE_ALBUM_MUTATION = gql`
  mutation DELETE_ALBUM_MUTATION($id: ID!) {
    deleteAlbum(id: $id) {
      id
    }
  }
`;
