import gql from 'graphql-tag';
import Albums from './Albums';

export const ALL_ALBUMS_QUERY = gql`
  query ALL_ALBUMS_QUERY {
    albums {
      id
      year
      name
      description
      image
      largeImage
    }
  }
`;

export default Albums;
