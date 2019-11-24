import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';
import GenresSelect from '../GenresSelect';

const AlbumForm = ({
  album, handleSubmit, submitting, error, isEdit,
}) => {
  const [values, setValues] = useState();

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

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  return (
    <Form onSubmit={onSubmit}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={submitting} aria-busy={submitting}>
        <Input
          name='name'
          label='Album Name'
          defaultValue={album.name}
          handleChange={handleChange}
          required={!isEdit}
        />
        <Input
          type='number'
          name='year'
          label='Year'
          defaultValue={album.year}
          handleChange={handleChange}
        />
        <Input
          type='textarea'
          name='description'
          label='Description'
          defaultValue={album.description}
          handleChange={handleChange}
        />
        <GenresSelect
          defaultValue={album.genres.map((genre) => genre.id)}
          onChange={handleChange}
        />
        {/* TODO add replace image logic */}
        {!isEdit && (
          <Input
            type='file'
            name='image'
            label='Album cover'
            handleChange={handleUploadFile}
            required={!isEdit}
          />
        )}
        {(isEdit && album) && <img src={album.image} alt='Uploaded Image' width='200' />}
        {values && values.image && <img src={values.image} alt='Uploaded Image' width='200' />}
      </fieldset>
      <button type='submit'>{isEdit ? 'Save Changes' : 'Create album'}</button>
    </Form>
  );
};


AlbumForm.defaultProps = {
  album: {
    name: '',
    year: '',
    description: '',
    image: '',
    largeImage: '',
    genres: [],
  },
};

AlbumForm.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    image: PropTypes.string,
    largeImage: PropTypes.string,
    genres: PropTypes.array,
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default AlbumForm;
