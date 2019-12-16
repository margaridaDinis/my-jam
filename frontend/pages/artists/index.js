import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Artists from '../../components/pages/Artists';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import IndexHeader from '../../components/molecules/IndexHeader';

const ArtistsPage = ({ query }) => {
  const { t } = useTranslation();
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <Head>
        <title>{t('artists.pageTitle.index')} | {t('app.name')}</title>
      </Head>
      <IndexHeader scope='artists'/>
      <Artists page={page} />
    </RequestSignIn>
  );
};

ArtistsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default ArtistsPage;
