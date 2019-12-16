import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Genres from '../../components/pages/Genres';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import IndexHeader from '../../components/molecules/IndexHeader';

const GenresPage = ({ query }) => {
  const { t } = useTranslation();
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <Head>
        <title>{t('genres.pageTitle.index')} | {t('app.name')}</title>
      </Head>
      <IndexHeader scope='genres'/>
      <Genres page={page} />
    </RequestSignIn>
  );
};

GenresPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default GenresPage;
