import React, { Fragment } from 'react';
import Link from 'next/link';

import NavStyles from '../../../styles/NavStyles';
import User from '../User';
import SignOutButton from '../../atoms/SignOutButton';

const Nav = () => (
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

export default Nav;
