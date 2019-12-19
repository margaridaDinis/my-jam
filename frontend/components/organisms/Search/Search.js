import React, { useState } from 'react';
import DownShift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { InputField, Stack } from '@kiwicom/orbit-components/lib';
import SearchIcon from '@kiwicom/orbit-components/lib/icons/Search';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { SEARCH_ALBUMS_QUERY } from '../../../lib/album';
import SearchDropDown from '../../molecules/SearchDropDown';

const Search = () => {
  const { t } = useTranslation();
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
    <Stack align='center' justify='end'>
      <DownShift
        onChange={navigateToAlbum}
        itemToString={(item) => (item === null ? '' : label(item))}
      >
        {({
          getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
        }) => (
          <div>
            <InputField
              placeholder={t('search.placeholder')}
              prefix={<SearchIcon />}
              {...getInputProps({
                onChange,
                type: 'search',
                id: 'search',
                className: loading ? 'loading' : '',
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
    </Stack>
  );
};

export default Search;
