import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { Stack, Text } from '@kiwicom/orbit-components/lib';
import { useTranslation } from 'react-i18next';

const MultiSelect = ({
  label, type, options, addNewOption, defaultValue, onChange, loading,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(options.filter((v) => defaultValue.includes(v.value)));

  useEffect(() => {
    const values = selected || [];

    onChange({ [type]: values.map((option) => option.value) });
  }, [selected]);

  const handleCreate = async (name) => {
    const newOption = await addNewOption(name);

    if (newOption) setSelected([...selected, { value: newOption.id, label: newOption.name }]);
  };

  const handleChange = (values) => setSelected(values);

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
          placeholder={t('input.multi_select.placeholder')}
          isMulti
          isClearable
          isSearchable
        />
      </label>
    </Stack>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  addNewOption: PropTypes.func,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default MultiSelect;
