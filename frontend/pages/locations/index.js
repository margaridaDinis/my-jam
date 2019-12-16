import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Locations from '../../components/pages/Locations';
import RequestSignIn from '../../components/organisms/RequestSignIn';
import IndexHeader from '../../components/molecules/IndexHeader';

const LocationsPage = ({ query }) => {
  const { t } = useTranslation();
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <RequestSignIn>
      <Head>
        <title>{t('locations.pageTitle.index')} | {t('app.name')}</title>
      </Head>
      <IndexHeader scope='locations'/>
      <Locations page={page}/>
    </RequestSignIn>
  );
};

LocationsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default LocationsPage;
