import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CartStyles from '../../../styles/CartStyles';
import CloseButton from '../../../styles/CloseButton';
import Supreme from '../../../styles/Supreme';
import Button from '../../../styles/Button';
import User from '../User';
import CartItem from '../../molecules/CartItem';

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
  const { data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <User>
      {({ me }) => me && (
        <CartStyles open={data && data.cartOpen}>
          <header>
            <CloseButton
              title='close'
              onClick={toggleCart}
            >
              &times;
            </CloseButton>
            <Supreme>{me.name}&apos;s Cart</Supreme>
            <p>You have {me.cart.length} item{me.cart.length > 1 ? 's' : ''} in your cart</p>
          </header>
          <ul>
            {me.cart.map((cartItem) => <CartItem key={cartItem.id} {...cartItem} />)}
          </ul>
          <footer>
            <Button>Checkout</Button>
          </footer>
        </CartStyles>
      )}
    </User>
  );
};

export default Cart;
