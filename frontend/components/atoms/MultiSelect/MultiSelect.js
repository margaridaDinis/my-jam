import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';

const MultiSelect = ({
  label, type, options, addNewOption, defaultValue, onChange, loading,
}) => {
  const [selected, setSelected] = useState(options.filter((v) => defaultValue.includes(v.id)));

  useCallback(() => {
    const values = selected || [];

    onChange({ [type]: values.map((option) => option.id) });
  }, [selected]);

  const handleCreate = async (name) => {
    const newOption = await addNewOption(name);

    if (newOption) setSelected([...selected, newOption]);
  };

  const handleChange = (values) => setSelected(values);

  const isValidNewOption = (inputValue, _, selectOptions) => (
    !selectOptions.find(({ name }) => name.toLowerCase() === inputValue.toLowerCase())
  );

  return (
    <label htmlFor={type}>
      {label}
      <CreatableSelect
        instanceId={type}
        options={options}
        value={selected}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        getNewOptionData={(inputValue, optionLabel) => ({ id: inputValue, name: optionLabel })}
        onChange={handleChange}
        onCreateOption={handleCreate}
        isValidNewOption={isValidNewOption}
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
