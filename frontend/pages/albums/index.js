import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Albums from '../../components/pages/Albums';
import IndexHeader from '../../components/molecules/IndexHeader';

const AlbumsPage = ({ query }) => {
  const { t } = useTranslation();
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <Fragment>
      <Head>
        <title>{t('albums.pageTitle.index')} | {t('app.name')}</title>
      </Head>
      <IndexHeader scope='albums'/>
      <Albums page={page}/>
    </Fragment>
  );
};

AlbumsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default AlbumsPage;
