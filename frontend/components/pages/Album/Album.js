import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Button, Heading, Stack, Badge, List, ListItem,
} from '@kiwicom/orbit-components/lib';
import {
  Edit, Location, Passengers, MusicalInstruments, Calendar, ChevronRight,
} from '@kiwicom/orbit-components/lib/icons';
import { SINGLE_ALBUM_QUERY } from '../../../lib/album';

const Album = ({ id }) => {
  const { t } = useTranslation();
  const { loading, data } = useQuery(
    SINGLE_ALBUM_QUERY,
    { variables: { id } },
  );

  if (loading) return <p>Loading...</p>;
  if (!data || !data.album) return <p>No item found for ID {id} </p>;

  const { album } = data;

  return (
    <div>
      <Head>
        <title>{album.name} | My Jam</title>
      </Head>

      <Stack direction='row' justify='between'>
        <div>
          <Stack direction='row' align='center' spaceAfter='medium' type='infoInverted'>
            <Heading type='display'>
              {album.name}
            </Heading>
            {album.location && (
              <Badge type='infoInverted' icon={<Location />}>
                {album.location.name}
              </Badge>
            )}
          </Stack>
        </div>
        <Link href={{ pathname: '/albums/update', query: { id: album.id } }}>
          <Button iconLeft={<Edit />}>
            {t('button.edit')}
          </Button>
        </Link>
      </Stack>

      <List type='separated' spaceAfter='large'>
        {album.artists && (
          <ListItem label={t('album.title.artists')} icon={<Passengers color='secondary' />}>
            {album.artists.map((artist, index) => (
              <Link key={artist.id} href={{ pathname: '/artists/show', query: { id: artist.id } }}>
                <span>
                  {artist.name}{index !== (album.artists.length - 1) && ', '}
                </span>
              </Link>
            ))}
          </ListItem>
        )}
        {album.genres && (
          <ListItem label={t('album.title.genres')} icon={<MusicalInstruments color='secondary' />}>
            {album.genres.map((genre, index) => (
              <Link key={genre.id} href={{ pathname: '/genres/show', query: { id: genre.id } }}>
                <span>
                  {genre.name}{index !== (album.genres.length - 1) && ', '}
                </span>
              </Link>
            ))}
          </ListItem>
        )}
        {album.year && (
          <ListItem label={t('album.title.year')} icon={<Calendar color='secondary' />}>
            {album.year}
          </ListItem>
        )}
        {album.description && (
          <ListItem label={t('album.title.description')} icon={<Location color='secondary' />}>
            {album.description}
          </ListItem>
        )}
      </List>

      <Stack direction='row'>
        {album.largeImage && <img src={album.largeImage} alt={album.name} />}
        <aside>
          <Heading>{t('album.title.tracks')}</Heading>
          <List>
            <ListItem icon={<ChevronRight />}>
              Brevemente
            </ListItem>
          </List>
        </aside>
      </Stack>
    </div>
  );
};

Album.defaultProps = {
  id: '',
};

Album.propTypes = {
  id: PropTypes.string,
};

export default Album;
