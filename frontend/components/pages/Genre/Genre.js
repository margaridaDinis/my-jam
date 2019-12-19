import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import {
  Button, Heading, List, ListItem, Loading, Stack, Text,
} from '@kiwicom/orbit-components/lib';
import { Check, Edit } from '@kiwicom/orbit-components/lib/icons';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import { SINGLE_GENRE_QUERY } from '../../../lib/genres';

const Genre = ({ id }) => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(
    SINGLE_GENRE_QUERY,
    { variables: { id } },
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const { genre } = data;

  return (
    <div>
      <Head>
        <title>{genre.name} | My Jam</title>
      </Head>

      <Stack direction='row' justify='between' spaceAfter='medium'>
        <Heading type='display'>
          {genre.name}
        </Heading>
        <Link href={{ pathname: '/genres/update', query: { id: genre.id } }}>
          <Button iconLeft={<Edit />}>
            {t('button.edit')}
          </Button>
        </Link>
      </Stack>

      {genre.albums.length > 1 ? (
        <List
          size='normal'
          type='primary'
          dataTest='test'
          spaceAfter={null}
        >
          {genre.albums.map((album) => (
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
        <Text>{t('genres.no_albums')}</Text>
      )}
    </div>
  );
};

Genre.propTypes = {
  id: PropTypes.string,
};

export default Genre;
