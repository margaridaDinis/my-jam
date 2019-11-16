import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RemoveFromCart from '../../atoms/RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ id, quantity, album }) => {
  if (!album) {
    return (
      <CartItemStyles>
        <p>Item has been removed</p>
        <RemoveFromCart id={id}/>
      </CartItemStyles>
    );
  }

  return (
    <CartItemStyles>
      <img width={100} src={album.image} alt={album.name}/>
      <div className='cart-item-details'>
        <h3>{album.name}</h3>
        <p>{quantity}</p>
      </div>
      <RemoveFromCart id={id}/>
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  id: PropTypes.string,
  quantity: PropTypes.number,
  album: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default CartItem;
