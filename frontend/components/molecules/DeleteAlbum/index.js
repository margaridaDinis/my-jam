import gql from 'graphql-tag';
import DeleteAlbum from './DeleteAlbum';

export const DELETE_ALBUM_MUTATION = gql`
  mutation DELETE_ALBUM_MUTATION($id: ID!) {
    deleteAlbum(id: $id) {
      id
    }
  }
`;

export default DeleteAlbum;
