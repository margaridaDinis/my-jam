import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Button from '@kiwicom/orbit-components/lib/Button';
import Plus from '@kiwicom/orbit-components/lib/icons/Plus';
import { useTranslation } from 'react-i18next';
import Albums from '../../components/pages/Albums';

const AlbumsPage = ({ query }) => {
  const { t } = useTranslation();
  const page = !parseFloat(query.page) ? 1 : parseFloat(query.page);

  return (
    <Fragment>
      <Stack direction='row' justify='between' spaceAfter='large'>
        <Heading type='display'>{t('albums.heading')}</Heading>
        <Link href='/albums/new'>
          <Button iconLeft={<Plus />}>{t('albums.button.new')}</Button>
        </Link>
      </Stack>
      <Albums page={page} />
    </Fragment>
  );
};

AlbumsPage.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
  }),
};

export default AlbumsPage;
