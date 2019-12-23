import React from 'react';
import PropTypes from 'prop-types';
import { ChoiceGroup, Radio, Stack } from '@kiwicom/orbit-components/lib';
import ALBUM_TYPES from '../../../lib/albumTypes';

const AlbumType = ({
  name, label, handleChange, value,
}) => (
  <Stack spaceAfter='medium'>
    <ChoiceGroup
      id={name}
      label={label}
      onChange={handleChange}
    >
      {ALBUM_TYPES.map((type) => (
        <Radio
          key={type.value}
          label={type.label}
          value={type.value}
          name={name}
          id={type.value}
          checked={type.value === value}
        />
      ))}
    </ChoiceGroup>
  </Stack>
);

AlbumType.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default AlbumType;
