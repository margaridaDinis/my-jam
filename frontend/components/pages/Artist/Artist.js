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
import { SINGLE_ARTIST_QUERY } from '../../../lib/artist';

const Artist = ({ id }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_ARTIST_QUERY, { variables: { id } });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const { artist } = data;

  return (
    <Fragment>
      <Head>
        <title>{artist.name} | My Jam</title>
      </Head>

      <Stack direction='row' justify='between' spaceAfter='medium'>
        <Heading type='display'>
          {artist.name}
        </Heading>
        <Link href={{ pathname: '/artists/update', query: { id: artist.id } }}>
          <Button iconLeft={<Edit />}>
            {t('button.edit')}
          </Button>
        </Link>
      </Stack>

      {artist.albums.length > 1 ? (
        <List
          size='normal'
          type='primary'
          dataTest='test'
          spaceAfter={null}
        >
          {artist.albums.map((album) => (
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
         <Text>{t('artists.no_albums')}</Text>
      )}
    </Fragment>
  );
};

Artist.propTypes = {
  id: PropTypes.string,
};

export default Artist;
