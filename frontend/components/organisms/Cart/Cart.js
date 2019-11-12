import React from 'react';
import CartStyles from '../../../styles/CartStyles';
import CloseButton from '../../../styles/CloseButton';
import Supreme from '../../../styles/Supreme';
import Button from '../../../styles/Button';

const Cart = () => (
    <CartStyles open>
      <header>
        <CloseButton title='close'>&times;</CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart</p>
      </header>
      <footer>
        <p>$10.10</p>
        <Button>Checkout</Button>
      </footer>
    </CartStyles>
);

export default Cart;
