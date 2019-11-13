import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../organisms/User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      update(cache, payload) {
        const data = cache.readQuery({ query: CURRENT_USER_QUERY });
        const removedCartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter((cartItem) => cartItem.id !== removedCartItemId);

        cache.writeQuery({ query: CURRENT_USER_QUERY, data });
      },
    },
  );

  const handleRemoveFromCart = () => {
    removeFromCart({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id,
        },
      },
    }).catch((e) => {
      // eslint-disable-next-line
      alert(e.message);
    });
  };

  return (
    <BigButton
      disabled={loading}
      onClick={handleRemoveFromCart}
      title='Delete Item'
    >
      &times;
    </BigButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
