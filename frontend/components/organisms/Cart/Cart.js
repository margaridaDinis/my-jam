import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CartStyles from '../../../styles/CartStyles';
import CloseButton from '../../../styles/CloseButton';
import Supreme from '../../../styles/Supreme';
import Button from '../../../styles/Button';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  const { data: { cartOpen } } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton
          title='close'
          onClick={toggleCart}
        >
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart</p>
      </header>
      <footer>
        <p>$10.10</p>
        <Button>Checkout</Button>
      </footer>
    </CartStyles>
  );
};

export default Cart;
