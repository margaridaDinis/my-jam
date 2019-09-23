import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import ErrorMessage from '../../molecules/ErrorMessege';
import Album from '../../molecules/Album';

import { ALL_ALBUMS_QUERY } from './index';

const Center = styled.div`
  text-align: center;
`;

const AlbumsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Albums = () => {
  return (
    <Query query={ALL_ALBUMS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <ErrorMessage error={error} />;

        return (
          <Center>
            <AlbumsList>
              {data.albums.map(album => (
                <Album key={album.id} album={album}/>
              ))}
            </AlbumsList>
          </Center>
        );
      }}
    </Query>
  );
};

export default Albums;
