import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@kiwicom/orbit-components/lib/index';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';

const LocationForm = ({
  isEdit, defaultValues, error, onSubmit, isLoading,
}) => {
  const { t } = useTranslation();
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
          label={t('input.label.name')}
          value={values.name}
          handleChange={handleChange}
          required={!isEdit}
        />
        <Input
          type='textarea'
          name='description'
          label={t('input.label.description')}
          defaultValue={values.description}
          handleChange={handleChange}
        />
      </fieldset>
      <Button
        loading={isLoading}
        submit
      >
        {t('button.submit.general')}
      </Button>
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
