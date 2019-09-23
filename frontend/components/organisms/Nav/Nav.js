import React from 'react';
import Link from 'next/link';

import NavStyles from '../../../styles/NavStyles';

const Nav = () => {
  return (
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
        <li>
          <Link href='/new-album'>
            <a>New Album</a>
          </Link>
        </li>
      </ul>
    </NavStyles>
  );
};

export default Nav;
