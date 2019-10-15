import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteAlbum from '../DeleteAlbum';

const Album = ({ album }) => {
  return (
    <article>
      {album.image && <img src={album.image} alt={album.name} />}
      <h2>
        <Link href={{ pathname: '/album', query: { id: album.id } }}>
          <a>{album.name}</a>
        </Link>
      </h2>

      <div className="buttonList">
        <Link href={{ pathname: '/update-album', query: { id: album.id } }}>
          <a>Edit ✏️</a>
        </Link>
        <Link href='/'>
          <a>Add to cart️</a>
        </Link>
        <DeleteAlbum id={album.id}>Delete</DeleteAlbum>
      </div>
    </article>
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
  })
};

export default Album;
