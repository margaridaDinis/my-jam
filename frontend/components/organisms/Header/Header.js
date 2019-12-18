import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import NavigationBar from '@kiwicom/orbit-components/lib/NavigationBar';
import ButtonLink from '@kiwicom/orbit-components/lib/ButtonLink';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import Search from '../Search';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

// TODO open and close sidebar menu
const Header = () => (
  <div style={{ height: '7.5rem' }}>
    <NavigationBar
      // onMenuOpen={() => {}}
      // onShow={() => {}}
      // onHide={() => {}}
      dataTest='test'
    >
      <Grid
        columns='1fr 2fr'
        tablet={{ columns: 'minmax(256px, 1fr) 4fr' }}
      >
        <Link href='/'>
          <ButtonLink size='large' transparent title='MyJam'>
            MyJam
          </ButtonLink>
        </Link>
        <Search />
      </Grid>
    </NavigationBar>
  </div>
);

export default Header;
