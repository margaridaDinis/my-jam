import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';

const Select = ({
  label, type, options, addNewOption, defaultValue, onChange, loading,
}) => {
  const [selected, setSelected] = useState(options.find((v) => v.id === defaultValue));

  const handleCreate = async (name) => {
    const newOption = await addNewOption(name);

    if (newOption) setSelected(newOption.id);
  };

  const handleChange = (value) => {
    onChange({ [type]: value && value.id ? value.id : '' });
    setSelected(value);
  };

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
        isClearable
        isSearchable
      />
    </label>
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
