import React from 'react';
import Link from 'next/link';

import NavStyles from '../../../styles/NavStyles';
import User from '../User';

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <User>
          {({ me }) => me && <p>{me.name}</p>}
        </User>
      </li>
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
      <li>
        <Link href='/new-album'>
          <a>New Album</a>
        </Link>
      </li>
      <li>
        <Link href='/signup'>
          <a>Sign Up</a>
        </Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
