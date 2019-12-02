import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../molecules/ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';
import { SINGLE_ARTIST_QUERY } from '../Artist';
import { ALL_ARTISTS_QUERY } from '../Artists';

export const CREATE_ARTIST_MUTATION = gql`
  mutation CREATE_ARTIST_MUTATION($name: String!) { createArtist(name: $name) { id name } }
`;

export const UPDATE_ARTIST_MUTATION = gql`
  mutation UPDATE_ARTIST_MUTATION($id: ID! $name: String!) {
    updateArtist(id: $id name: $name) {
      id
    }
  }
`;

const ArtistForm = ({ id }) => {
  const { data, loading } = useQuery(SINGLE_ARTIST_QUERY, { variables: { id } });
  const [submit, { loading: submitting, error }] = useMutation(
    id ? UPDATE_ARTIST_MUTATION : CREATE_ARTIST_MUTATION,
    {
      refetchQueries: [{
        query: ALL_ARTISTS_QUERY,
      }],
    },
  );

  const initialName = data ? data.artist.name : '';

  const [values, setValues] = useState({ name: initialName, id });

  const handleChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submit({ variables: values, id });

    Router.push({
      pathname: '/artist',
      query: { id: id || res.data.createArtist.id },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading || submitting} aria-busy={loading || submitting}>
        <Input
          name='name'
          label='Artist Name'
          value={values.name}
          handleChange={handleChange}
          required
        />
      </fieldset>
      <button type='submit'>Submit</button>
    </Form>
  );
};

ArtistForm.propTypes = {
  id: PropTypes.string,
};

export default ArtistForm;
