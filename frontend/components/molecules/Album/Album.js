import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteAlbum from '../DeleteAlbum';
import User from '../../organisms/User';

const Album = ({ album }) => (
  <article>
    {album.image && <img src={album.image} alt={album.name} />}
    <h2>
      <Link href={{ pathname: '/album', query: { id: album.id } }}>
        <a>{album.name}</a>
      </Link>
    </h2>
  <User>
    {({ me }) => me && (
      <div className='buttonList'>
        <Link href={{ pathname: '/update-album', query: { id: album.id } }}>
          <a>Edit ✏️</a>
        </Link>
        <DeleteAlbum id={album.id} image={album.image}>Delete</DeleteAlbum>
      </div>
    )}
  </User>

  </article>
);

Album.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    largeImage: PropTypes.string,
  }),
};

export default Album;
