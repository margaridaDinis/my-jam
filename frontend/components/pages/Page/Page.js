import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../../organisms/Header';
import Meta from '../../organisms/Meta';

const theme = {
  red: '#FF0000',
  white: '#FFFFFF',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Livvic, sans-serif;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.black};
  }
  button {  font-family: Livvic, sans-serif; }
`;

const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledPage>
        <Header />
        <Meta />
        <Inner>
          {children}
        </Inner>
      </StyledPage>
    </>
  </ThemeProvider>
);

Page.propTypes = {
  children: PropTypes.element,
};

export default Page;
