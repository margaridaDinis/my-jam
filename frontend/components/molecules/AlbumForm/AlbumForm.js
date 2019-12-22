import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@kiwicom/orbit-components/lib';
import ErrorMessage from '../ErrorMessage';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';
import GenresSelect from '../GenresSelect';
import FileInput from '../FileInput';
import ArtistsSelect from '../ArtistsSelect';
import LocationSelect from '../LocationSelect';

const AlbumForm = ({
  album, handleSubmit, submitting, error, isEdit,
}) => {
  const { t } = useTranslation();
  const pageTitle = album.name ? t('albums.pageTitle.edit', { album: album.name }) : t('albums.pageTitle.new');
  const [values, setValues] = useState({});

  const handleChange = ({ target: { name, value, type } }) => {
    const val = type === 'number' ? parseFloat(value) : value;
    setValues({ ...values, [name]: val });
  };

  const handleExternalChange = (newValues) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  return (
    <Fragment>
      <Head>
        <title>{pageTitle} | {t('app.name')}</title>
      </Head>
      <Heading type='display' spaceAfter='large'>{pageTitle}</Heading>
      <Form onSubmit={onSubmit}>
        {error && <ErrorMessage error={error} />}
        <fieldset disabled={submitting} aria-busy={submitting}>
          <Input
            name='name'
            label={t('input.label.name')}
            defaultValue={album.name}
            handleChange={handleChange}
            required={!isEdit}
          />
          <ArtistsSelect
            label={t('input.label.artists')}
            defaultValue={album.artists.map((artist) => artist.id)}
            onChange={handleExternalChange}
          />
          <Input
            type='number'
            name='year'
            label={t('input.label.year')}
            defaultValue={album.year}
            handleChange={handleChange}
          />
          <GenresSelect
            label={t('input.label.genres')}
            defaultValue={album.genres.map((genre) => genre.id)}
            onChange={handleExternalChange}
          />
          <LocationSelect
            label={t('input.label.location')}
            defaultValue={'ck4hn49hp1lyx0922is0t9cgd'}
            onChange={handleExternalChange}
          />
          <Input
            type='textarea'
            name='description'
            label={t('input.label.description')}
            defaultValue={album.description}
            handleChange={handleChange}
          />
          <FileInput
            name='image'
            label={t('input.label.image')}
            defaultValue={album.image}
            onChange={handleExternalChange}
            required={!isEdit}
          />
          <footer>
            <Button
              disabled={!isEdit && (!values.name || !values.image)}
              loading={submitting}
              submit
            >
              {isEdit ? t('button.submit.update_album') : t('button.submit.new_album')}
            </Button>
          </footer>
        </fieldset>
      </Form>
    </Fragment>
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
    artists: [],
    location: {},
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
    artists: PropTypes.array,
    location: PropTypes.object,
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default AlbumForm;
