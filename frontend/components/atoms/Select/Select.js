import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { Stack, Text } from '@kiwicom/orbit-components/lib';
import { useTranslation } from 'react-i18next';

const Select = ({
  label, type, options, addNewOption, defaultValue, onChange, loading,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(options.find((v) => v.value === defaultValue));

  const handleCreate = async (name) => {
    const newOption = await addNewOption(name);

    if (newOption) {
      setSelected({ value: newOption.id, label: newOption.name });
      onChange({ [type]: newOption.id });
    }
  };

  const handleChange = (option) => {
    onChange({ [type]: option && option.value ? option.value : '' });

    setSelected(option);
  };

  return (
    <Stack spaceAfter='medium'>
      <label htmlFor={type}>
        <Text spaceAfter='smallest'>{label}</Text>
        <CreatableSelect
          instanceId={type}
          options={options}
          value={selected}
          onChange={handleChange}
          onCreateOption={handleCreate}
          isLoading={loading}
          placeholder={t('input.select.placeholder')}
          isClearable
          isSearchable
        />
      </label>
    </Stack>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  addNewOption: PropTypes.func,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default Select;
