import React, { useState } from 'react';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button } from '@kiwicom/orbit-components/lib/index';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ErrorMessage from '../../molecules/ErrorMessage';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import {
  ALL_GENRES_QUERY,
  CREATE_GENRE_MUTATION,
  SINGLE_GENRE_QUERY,
  UPDATE_GENRE_MUTATION,
} from '../../../lib/genres';

const GenreForm = ({ id }) => {
  const { t } = useTranslation();
  const { data, loading } = id ? useQuery(SINGLE_GENRE_QUERY, { variables: { id } }) : {};
  const [submit, { loading: submitting, error }] = useMutation(
    id ? UPDATE_GENRE_MUTATION : CREATE_GENRE_MUTATION,
    {
      refetchQueries: [{
        query: ALL_GENRES_QUERY,
      }],
    },
  );

  const initialName = data ? data.genre.name : '';

  const [values, setValues] = useState({ name: initialName, id });

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submit({ variables: values });

    Router.push({
      pathname: '/genres/show',
      query: { id: id || res.data.createGenre.id },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading || submitting} aria-busy={loading || submitting}>
        <Input
          name='name'
          label={t('input.label.name')}
          value={values.name}
          handleChange={handleChange}
          required
        />
      </fieldset>
      <Button
        loading={submitting}
        submit
      >
        {t('button.submit.general')}
      </Button>
    </Form>
  );
};

GenreForm.propTypes = {
  id: PropTypes.string,
};


export default GenreForm;
