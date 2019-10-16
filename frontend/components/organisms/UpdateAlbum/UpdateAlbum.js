import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import ErrorMessage from '../../molecules/ErrorMessege';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    album(where: { id: $id }) {
      id
      name
      year
      description
      image
      largeImage
    }
  }
`;

export const UPDATE_ALBUM_MUTATION = gql`
  mutation UPDATE_ALBUM_MUTATION(
    $id: ID!
    $name: String
    $year: Int
    $description: String
  ) {
    updateAlbum(
      id: $id
      name: $name
      year: $year
      description: $description
    ) {
      id
      name
      year
      description
    }
  }
`;

const initialState = {};

const UpdateAlbum = ({ id }) => {
  const { loading, data } = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });
  const [updateAlbum, { loading: submitting, error }] = useMutation(UPDATE_ALBUM_MUTATION);
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: { name, value, type } }) => {
    const val = type === 'number' ? parseFloat(value) : value;

    setValues({ ...values, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAlbum({
      variables: {
        id,
        ...values,
      },
    });

    Router.push({
      pathname: '/album',
      query: { id: res.data.updateAlbum.id },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!data.album) return <p>No item found for ID {id} </p>;

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={submitting} aria-busy={submitting}>
        <Input
          name="name"
          label="Album Name"
          defaultValue={data.album.name}
          handleChange={handleChange}
          required
        />
        <Input
          type="number"
          name="year"
          label="Year"
          defaultValue={data.album.year}
          handleChange={handleChange}
        />
        <Input
          type="textarea"
          name="description"
          label="Description"
          defaultValue={data.album.description}
          handleChange={handleChange}
        />
        {data.album.image && <img src={data.album.image} alt="Uploaded Image" width="200" />}
      </fieldset>
      <button type="submit">Save Changes</button>
    </Form>
  );
};

UpdateAlbum.defaultProps = {
  id: '',
};

UpdateAlbum.propTypes = {
  id: PropTypes.string,
};

export default UpdateAlbum;
