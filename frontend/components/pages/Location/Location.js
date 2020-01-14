import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import Head from 'next/head';
import {
  Button, Heading, List, Loading, Stack, ListItem, Text,
} from '@kiwicom/orbit-components/lib/index';
import { Edit, Check } from '@kiwicom/orbit-components/lib/icons';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import { SINGLE_LOCATION_QUERY } from '../../../lib/locations';

const Location = ({ id }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_LOCATION_QUERY, { variables: { id } });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const { location } = data;

  return (
    <Fragment>
      <Head>
        <title>{location.name} | My Jam</title>
      </Head>

      <Stack direction='row' justify='between' spaceAfter='medium'>
        <Heading type='display'>
          {location.name}
        </Heading>
        <Link href={{ pathname: '/locations/update', query: { id: location.id } }}>
          <Button iconLeft={<Edit />}>
            {t('button.edit')}
          </Button>
        </Link>
      </Stack>

      {location.albums.length > 0 ? (
        <List
          size='normal'
          type='primary'
          dataTest='test'
          spaceAfter={null}
        >
          {location.albums.map((album) => (
            <ListItem key={album.id} icon={<Check />}>
              <Link href={{ pathname: '/albums/show', query: { id: album.id } }}>
              <span>
                {album.name}
              </span>
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
         <Text>{t('locations.no_albums')}</Text>
      )}
    </Fragment>
  );
};

Location.propTypes = {
  id: PropTypes.string,
};

export default Location;
