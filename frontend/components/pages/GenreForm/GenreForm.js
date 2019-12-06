import React, { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';
import ErrorMessage from '../../molecules/ErrorMessage';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import { ALL_GENRES_QUERY } from '../Genres';
import { SINGLE_GENRE_QUERY } from '../Genre';

export const CREATE_GENRE_MUTATION = gql`
  mutation CREATE_GENRE_MUTATION($name: String!) { createGenre(name: $name) { id name } }
`;

export const UPDATE_GENRE_MUTATION = gql`
  mutation UPDATE_GENRE_MUTATION($id: ID! $name: String!) {
    updateGenre(
      id: $id
      name: $name
    ) { id name } }
`;

const GenreForm = ({ id }) => {
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
          label='Genre Name'
          value={values.name}
          handleChange={handleChange}
          required
        />
      </fieldset>
      <button type='submit'>Submit</button>
    </Form>
  );
};

GenreForm.propTypes = {
  id: PropTypes.string,
};


export default GenreForm;
