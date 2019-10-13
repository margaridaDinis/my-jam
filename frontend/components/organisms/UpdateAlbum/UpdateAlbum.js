import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import ErrorMessage from '../../molecules/ErrorMessege';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

import { UPDATE_ALBUM_MUTATION, SINGLE_ITEM_QUERY } from './index';

const initialState = {};

const UpdateAlbum = ({ id }) => {
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: { name, value, type } }) => {
    const val = type === 'number' ? parseFloat(value) : value;

    setValues({ ...values, [name]: val });
  };

  const handleSubmit = async(e, updateAlbum) => {
    e.preventDefault();
    const res = await updateAlbum({
      variables: {
        id,
        ...values
      }
    });

    Router.push({
      pathname: '/album',
      query: { id: res.data.updateAlbum.id }
    })
  };

  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.album) return <p>No item found for ID {id}</p>;

        return (
          <Mutation mutation={UPDATE_ALBUM_MUTATION} variables={values}>
            {(updateAlbum, { loading, error }) => (
              <Form onSubmit={ e => handleSubmit(e, updateAlbum)}>
                {error && <ErrorMessage error={error} />}
                <fieldset disabled={loading} aria-busy={loading}>
                  <Input
                    name='name'
                    label='Album Name'
                    defaultValue={data.album.name}
                    handleChange={handleChange}
                    required
                  />
                  <Input
                    type='number'
                    name='year'
                    label='Year'
                    defaultValue={data.album.year}
                    handleChange={handleChange}
                  />
                  <Input
                    type='textarea'
                    name='description'
                    label='Description'
                    defaultValue={data.album.description}
                    handleChange={handleChange}
                  />
                  {data.album.image && <img src={data.album.image} alt='Uploaded Image' width='200'/>}
                </fieldset>
                <button type='submit'>Save Changes</button>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

UpdateAlbum.defaultProps = {
  id: ''
};

UpdateAlbum.propsTypes = {
  id: PropTypes.string
};

export default UpdateAlbum;
