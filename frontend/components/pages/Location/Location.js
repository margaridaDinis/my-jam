import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import ErrorMessage from '../../molecules/ErrorMessage';
import { SINGLE_LOCATION_QUERY } from '../../../lib/locations';

const Location = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_LOCATION_QUERY, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error}/>;

  const { location } = data;
  return (
    <div>
      <h1>Location</h1>
      <p>
        {location.name}
        <Link href={{ pathname: '/locations/update', query: { id: location.id } }}>
          <a>✏️</a>
        </Link>
      </p>
      <p>{location.description}</p>
      <div>
        <b>Albums:</b>
        {location.albums.map((album) => (
          <Link key={album.id} href={{ pathname: '/albums/show', query: { id: album.id } }}>
            <li>
              {album.name}
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
};

Location.propTypes = {
  id: PropTypes.string,
};

export default Location;
