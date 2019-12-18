import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import getTokens from '@kiwicom/orbit-components/lib/getTokens';
import ThemeProvider from '@kiwicom/orbit-components/lib/ThemeProvider';
import Header from '../../organisms/Header';
import Meta from '../../organisms/Meta';
import Nav from '../../organisms/Nav';


const Page = ({ children }) => {
  const customTokens = getTokens({
    fontFamily: 'Roboto',
  });

  return (
    <ThemeProvider theme={{ orbit: customTokens }}>
      <Fragment>
        <Header />
        <Meta />
        <Grid
          columns='1fr'
          desktop={{ columns: 'minmax(256px, 1fr) 4fr' }}
        >
          <aside>
            <Nav/>
          </aside>
          <main style={{ padding: '1rem' }}>
            {children}
          </main>
        </Grid>
      </Fragment>
    </ThemeProvider>
  );
};

Page.propTypes = {
  children: PropTypes.element,
};

export default Page;
