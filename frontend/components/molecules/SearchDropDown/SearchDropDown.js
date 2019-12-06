import React from 'react';
import PropTypes from 'prop-types';
import { DropDown, DropDownItem } from '../../../styles/DropDown';

const SearchDropDown = ({
  albums, label, getItemProps, highlightedIndex, inputValue, loading,
}) => (
  <DropDown>
    {albums.map((album, index) => (
      <DropDownItem
        {...getItemProps({ item: album })}
        key={album.id}
        highlighted={index === highlightedIndex}
      >
        <img src={album.image} alt={album.name} width={50}/>
        {label(album)}
      </DropDownItem>
    ))}
    {(!albums.length && !loading) && (
      <DropDownItem>
        Nothing found for {inputValue}
      </DropDownItem>
    )}
    {(!albums.length && loading) && (
      <DropDownItem>
        Loading...
      </DropDownItem>
    )}
  </DropDown>
);

SearchDropDown.propTypes = {
  albums: PropTypes.array.isRequired,
  label: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.bool,

};

export default SearchDropDown;
