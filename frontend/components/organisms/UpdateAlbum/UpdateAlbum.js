import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import ErrorMessage from '../../molecules/ErrorMessage';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import { SINGLE_ITEM_QUERY } from '../Album';
import { ALL_GENRES_QUERY } from '../Genres';

export const UPDATE_ALBUM_MUTATION = gql`
  mutation UPDATE_ALBUM_MUTATION(
    $id: ID!
    $name: String
    $year: Int
    $description: String
    $genres: [String]
  ) {
    updateAlbum(
      id: $id
      name: $name
      year: $year
      description: $description
      genres: $genres
    ) {
      id
      name
      year
      description
      genres {
        id
      }
    }
  }
`;

const UpdateAlbum = ({ id }) => {
  const { data: genresData } = useQuery(ALL_GENRES_QUERY);
  const { loading, data } = useQuery(SINGLE_ITEM_QUERY, { variables: { id } });
  const [updateAlbum, { loading: submitting, error }] = useMutation(UPDATE_ALBUM_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (!data.album) return <p>No item found for ID {id} </p>;

  const initialGenres = data.album.genres.map((genre) => genre.id);
  const [values, setValues] = useState({ genres: initialGenres });

  const handleChange = ({ target: { name, value, type } }) => {
    let val;

    switch (type) {
      case 'number':
        val = parseFloat(value);
        break;
      case 'select-multiple': {
        const valueExists = values[name].includes(value);
        if (valueExists) {
          val = values[name].filter((v) => (v !== value));
          break;
        }
        val = [...values[name], value];
        break;
      }
      default:
        val = value;
    }

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

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={submitting} aria-busy={submitting}>
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
        <label htmlFor='genres'>
          Genre
          <select
            name='genres'
            id='genres'
            onChange={handleChange}
            multiple
          >
            {genresData.genres.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className={values.genres.includes(genre.id) ? 'selected' : ''}
              >
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <Input
          type='textarea'
          name='description'
          label='Description'
          defaultValue={data.album.description}
          handleChange={handleChange}
        />
        {data.album.image && <img src={data.album.image} alt={data.album.name} width='200' />}
      </fieldset>
      <button type='submit'>Save Changes</button>
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
