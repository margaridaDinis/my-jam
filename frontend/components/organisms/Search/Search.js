import React, { useState } from 'react';
import DownShift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { SearchStyles } from '../../../styles/DropDown';
import { SEARCH_ALBUMS_QUERY } from '../../../lib/album';
import SearchDropDown from '../../molecules/SearchDropDown';

const Search = () => {
  const [albums, setAlbums] = useState([]);
  const [getAlbums, { loading, data }] = useLazyQuery(SEARCH_ALBUMS_QUERY);

  const onChange = ({ target: { value } }) => {
    getAlbums({ variables: { searchTerm: value } });

    if (data && data.albums) {
      setAlbums(data.albums);
    }
  };

  const label = (album) => {
    const artists = album.artists.map((artist) => artist.name);

    return `${album.name} ${artists.length ? 'by' : ''} ${artists.join(' feat. ')}`;
  };

  const navigateToAlbum = (album) => {
    Router.push({ pathname: '/albums/show', query: { id: album.id } });
  };

  resetIdCounter();

  return (
    <SearchStyles>
      <DownShift
        onChange={navigateToAlbum}
        itemToString={(item) => (item === null ? '' : label(item))}
      >
        {({
          getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                onChange,
                type: 'search',
                id: 'search',
                className: loading ? 'loading' : '',
                placeholder: 'Search Album or Artist',
              })}
            />
            {isOpen && (
              <SearchDropDown
                highlightedIndex={highlightedIndex}
                getItemProps={getItemProps}
                inputValue={inputValue}
                albums={albums}
                loading={loading}
                label={label}
              />
            )}
          </div>
        )}
      </DownShift>
    </SearchStyles>
  );
};

export default Search;
