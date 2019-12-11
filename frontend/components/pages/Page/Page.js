import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import Header from '../../organisms/Header';
import Meta from '../../organisms/Meta';
import Nav from '../../organisms/Nav';

const Page = ({ children }) => (
  <Fragment>
    <Header />
    <Meta />
    <Grid columns='minmax(256px, 1fr) 4fr'>
      <aside>
        <Nav/>
      </aside>
      <main>
        {children}
      </main>
    </Grid>
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.element,
};

export default Page;
