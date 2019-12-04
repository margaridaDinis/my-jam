import React, { Fragment } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteLocation from '../../molecules/DeleteLocation';

export const ALL_LOCATIONS_QUERY = gql`
  query ALL_LOCATIONS_QUERY {
    locations {
      id
      name
    }
  }
`;

const Locations = () => {
  const { data, loading, error } = useQuery(ALL_LOCATIONS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { locations } = data;

  return (
    <Fragment>
      <Link href='/new-location'>
        <a>New Location</a>
      </Link>
      <h1>Locations</h1>
      {locations.length === 0 && 'No locations'}
      {locations.length >= 1 && (
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              {location.name}
              <Link href={{ pathname: 'location', query: { id: location.id } }}>
                <a>➕</a>
              </Link>
              <Link href={{ pathname: 'update-location', query: { id: location.id } }}>
                <a>✏️</a>
              </Link>
              <DeleteLocation id={location.id}>Delete Location</DeleteLocation>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};


export default Locations;
