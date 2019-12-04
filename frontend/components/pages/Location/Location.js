import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import ErrorMessage from '../../molecules/ErrorMessage';

export const SINGLE_LOCATION_QUERY = gql`
  query SINGLE_LOCATION_QUERY($id: ID!) {
    location(where: { id: $id }) {
      id
      name
      description
      albums {
        id
        name
      }
    }
  }
`;

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
        <Link href={{ pathname: 'update-location', query: { id: location.id } }}>
          <a>✏️</a>
        </Link>
      </p>
      <p>{location.description}</p>
      <div>
        <b>Albums:</b>
        {location.albums.map((album) => (
          <Link key={album.id} href={{ pathname: 'album', query: { id: album.id } }}>
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
