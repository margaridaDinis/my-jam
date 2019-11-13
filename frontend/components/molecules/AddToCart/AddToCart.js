import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id, children }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION);

  const addToCartHandler = () => {
    // eslint-disable-next-line
    addToCart({ variables: { id } }).catch((e) => alert(e.message));
  };

  return (
    <button onClick={addToCartHandler} disabled={loading}>
      {children}
    </button>
  );
};

AddToCart.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};

export default AddToCart;
