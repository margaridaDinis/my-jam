import React, { useState } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../molecules/ErrorMessege';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

import { CREATE_ALBUM_MUTATION } from './index';

const initialState = { name: 'Name', year: 0, description: '', image: 'sdf', largeImage: 'df' };

const CreateAlbum = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: { name, value, type } }) => {
    const val = type === 'number' ? parseFloat(value) : value;

    setValues({ ...values, [name]: val });
  };

  return (
    <Mutation mutation={CREATE_ALBUM_MUTATION} variables={values}>
      {(createAlbum, { loading, error }) => (
        <Form onSubmit={async e => {
          e.preventDefault();
          const res = await createAlbum();
          Router.push({
            pathname: '/album',
            query: { id: res.data.createAlbum.id }
          })
        }}>
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
              name='image'
              label='Album cover'
              value={values.image}
              handleChange={handleChange}
              required
            />
          </fieldset>
          <button type='submit'>Submit</button>
        </Form>
      )
      }
    </Mutation>
  );
};

export default CreateAlbum;
