import React, { Fragment } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_CART_MUTATION } from '../Cart/Cart';
import User from '../User';
import SignOutButton from '../../atoms/SignOutButton';
import NavStyles from '../../../styles/NavStyles';

const Nav = () => {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <User>
      {({ me }) => (
        <NavStyles>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/albums'>
            <a>Albums</a>
          </Link>
          {me && (
            <Fragment>
              <Link href='/new-album'>
                <a>New Album</a>
              </Link>
              <Link href='/account'>
                <a>Account</a>
              </Link>
              <button onClick={toggleCart}>Cart</button>
              <SignOutButton>
                SignOut
              </SignOutButton>
            </Fragment>
          )}
          {!me && (
            <Link href='/signup'>
              <a>Sign Up</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
