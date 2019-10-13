import gql from 'graphql-tag';

import UpdateAlbum from './UpdateAlbum';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    album(where: { id: $id }) {
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
  ) {
    updateAlbum(
      id: $id
      name: $name
      year: $year
      description: $description
    ) {
      id
      name
      year
      description
    }
  }
`;

export default UpdateAlbum;
