import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';

const MultiSelect = ({
  label, type, options, addNewOption, defaultValue, onChange, loading,
}) => {
  const [selected, setSelected] = useState(options.filter((v) => defaultValue.includes(v.id)));

  useEffect(() => {
    const values = selected || [];

    onChange({ [type]: values.map((option) => option.id) });
  }, [selected]);

  const handleCreate = async (name) => {
    const newOption = await addNewOption(name);

    if (newOption) setSelected([...selected, newOption]);
  };

  const handleChange = (values) => {
    setSelected(values);
  };

  return (
    <label htmlFor={type}>
      {label}
      <CreatableSelect
        instanceId={type}
        options={options}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        getNewOptionData={(inputValue, optionLabel) => ({
          id: inputValue,
          name: optionLabel,
        })}
        value={selected}
        onChange={handleChange}
        onCreateOption={handleCreate}
        isLoading={loading}
        isMulti
        isClearable
        isSearchable
      />
    </label>
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
