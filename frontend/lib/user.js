import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
    __type(name: "Permission") {
      enumValues {
        name
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      email
      permissions
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
    ) {
      id
      name
      email
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signIn(
      email: $email
      password: $password
    ) {
      id
      email
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION{
    signOut {
      message
    }
  }
`;

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($userId: ID!, $permissions: [Permission]) {
    updatePermissions(userId: $userId, permissions: $permissions) {
      id
      name
      email
      permissions
    }
  }
`;
