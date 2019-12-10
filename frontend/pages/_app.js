import App, { Container } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import '../lib/i18n';

import withData from '../lib/withData';

import Page from '../components/pages/Page';

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitalProps) {
      pageProps = await Component.getInitalProps(ctx);
    }

    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(_App);
