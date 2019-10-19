import React, { Fragment } from 'react';
import Link from 'next/link';

import NavStyles from '../../../styles/NavStyles';
import User from '../User';

const Nav = () => (
  <User>
    {({ me }) => (
      <NavStyles>
        <ul>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/albums'>
              <a>Albums</a>
            </Link>
          </li>
          {me && (
            <Fragment>
              <li>
                <Link href='/new-album'>
                  <a>New Album</a>
                </Link>
              </li>
              <li>
                <Link href='/signup'>
                  <a>Account</a>
                </Link>
              </li>
            </Fragment>
          )}
          {!me && (
            <li>
              <Link href='/signup'>
                <a>Sign Up</a>
              </Link>
            </li>
          )}
        </ul>
      </NavStyles>
    )}
  </User>
);

export default Nav;
