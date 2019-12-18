import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Button, Heading } from '@kiwicom/orbit-components/lib/index';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';

const LocationForm = ({
  isEdit, defaultValues, error, onSubmit, isLoading,
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState(defaultValues);

  const initialName = defaultValues ? defaultValues.name : '';
  const pageTitle = initialName ? t('locations.pageTitle.edit', { location: initialName }) : t('locations.pageTitle.new');

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Fragment>
      <Head>
        <title>{pageTitle} | {t('app.name')}</title>
      </Head>
      <Heading type='display' spaceAfter='large'>{pageTitle}</Heading>
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
    </Fragment>
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
