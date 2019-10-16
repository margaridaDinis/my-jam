import React, { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import ErrorMessage from '../../molecules/ErrorMessege';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

export const CREATE_ALBUM_MUTATION = gql`
  mutation CREATE_ALBUM_MUTATION(
    $name: String!
    $year: Int
    $description: String
    $image: String!
    $largeImage: String!
  ) {
    createAlbum(
      name: $name
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
      name
      year
      description
      image
      largeImage
    }
  }
`;

const initialState = {
  name: '', year: '', description: '', image: '', largeImage: '',
};

const CreateAlbum = () => {
  const [createAlbum, { loading, error }] = useMutation(CREATE_ALBUM_MUTATION);
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: { name, value, type } }) => {
    const val = type === 'number' ? parseFloat(value) : value;

    setValues({ ...values, [name]: val });
  };

  const handleUploadFile = async ({ target: { files } }) => {
    const [uploadedFile] = files;
    if (!uploadedFile) {
      setValues({ ...values, image: '', largeImage: '' });
      return;
    }

    const data = new FormData();
    data.append('file', uploadedFile);
    data.append('upload_preset', 'albums');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/margaridadinis/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const file = await response.json();
    setValues({
      ...values,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createAlbum({ variables: values });

    Router.push({
      pathname: '/album',
      query: { id: res.data.createAlbum.id },
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, createAlbum)}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <Input
          name='name'
          label='Album Name'
          value={values.name}
          handleChange={handleChange}
          required
        />
        <Input
          type='number'
          name='year'
          label='Year'
          value={values.year}
          handleChange={handleChange}
        />
        <Input
          type='textarea'
          name='description'
          label='Description'
          value={values.description}
          handleChange={handleChange}
        />
        <Input
          type='file'
          name='image'
          label='Album cover'
          handleChange={handleUploadFile}
          required
        />
        {values.image && <img src={values.image} alt='Uploaded Image' width='200' />}
      </fieldset>
      <button type='submit' disabled={!values.image}>Submit</button>
    </Form>
  );
};

export default CreateAlbum;
