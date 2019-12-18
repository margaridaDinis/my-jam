import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Heading } from '@kiwicom/orbit-components/lib/index';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';
import {
  ALL_ARTISTS_QUERY,
  CREATE_ARTIST_MUTATION,
  SINGLE_ARTIST_QUERY,
  UPDATE_ARTIST_MUTATION,
} from '../../../lib/artist';

const ArtistForm = ({ id }) => {
  const { t } = useTranslation();
  const { data, loading } = id ? useQuery(SINGLE_ARTIST_QUERY, { variables: { id } }) : {};
  const [submit, { loading: submitting, error }] = useMutation(
    id ? UPDATE_ARTIST_MUTATION : CREATE_ARTIST_MUTATION,
    {
      refetchQueries: [{
        query: ALL_ARTISTS_QUERY,
      }],
    },
  );

  const initialName = data ? data.artist.name : '';

  const pageTitle = initialName ? t('artists.pageTitle.edit', { artist: initialName }) : t('artists.pageTitle.new');

  const [values, setValues] = useState({ name: initialName, id });

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submit({ variables: values, id });

    Router.push({
      pathname: '/artists/show',
      query: { id: id || res.data.createArtist.id },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>{pageTitle} | {t('app.name')}</title>
      </Head>
      <Heading type='display' spaceAfter='large'>{pageTitle}</Heading>
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
    </Fragment>
  );
};

ArtistForm.propTypes = {
  id: PropTypes.string,
};

export default ArtistForm;
