import gql from 'graphql-tag';

import CreateAlbum from './CreateAlbum';

export const CREATE_ALBUM_MUTATION = gql`
  mutation CREATE_ALBUM_MUTATION(
    $name: String!
    $year: Int
    $description: String
    $image: String!
    $largeImage: String!
  ) {
    createAlbum(
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
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

export default CreateAlbum;
