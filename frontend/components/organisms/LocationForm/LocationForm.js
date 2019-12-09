import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../molecules/ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';

const LocationForm = ({
  isEdit, defaultValues, error, onSubmit, isLoading,
}) => {
  const [values, setValues] = useState(defaultValues);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <Input
          name='name'
          label='Name'
          value={values.name}
          handleChange={handleChange}
          required={!isEdit}
        />
        <Input
          type='textarea'
          name='description'
          label='Description'
          defaultValue={values.description}
          handleChange={handleChange}
        />
      </fieldset>
      <button type='submit'>Submit</button>
    </Form>
  );
};

LocationForm.propTypes = {
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  values: PropTypes.object,
  error: PropTypes.object,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default LocationForm;
