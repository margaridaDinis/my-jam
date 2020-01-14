import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Truncate from '@kiwicom/orbit-components/lib/Truncate';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Stack from '@kiwicom/orbit-components/lib/Stack';

const Album = ({ album }) => {
  const artists = (album && album.artists) && album.artists.map(({ name }) => name);

  const image = album.image ? album.image : 'https://via.placeholder.com/250?text=Sem imagem';

  return (
    <Stack spaceAfter='large'>
      <Link href={{ pathname: '/albums/show', query: { id: album.id } }}>
        <img src={image} alt={album.name} />
      </Link>
      <Link href={{ pathname: '/albums/show', query: { id: album.id } }}>
        <Truncate>
          <Heading type='displaySubtitle'>
            {album.name}
          </Heading>
          <Heading type='title5' element='h5'>
            {artists.join(', ')}
          </Heading>
        </Truncate>
      </Link>
    </Stack>
  );
};

Album.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    largeImage: PropTypes.string,
    artists: PropTypes.array,
  }),
};

export default Album;
