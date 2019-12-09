import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/Input';
import { removeImage, uploadImage } from '../../../actions/file';

const FileInput = ({ defaultValue, onChange, isEdit }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(defaultValue);

  const reset = () => {
    setImage('');
    onChange({ image: '', largeImage: '' });
  };

  const upload = async ({ target: { files } }) => {
    const [uploadedFile] = files;
    setLoading(true);

    if (!uploadedFile) {
      reset(image);
      return;
    }

    if (image) removeImage(image);

    try {
      const imageUrls = await uploadImage(uploadedFile);

      setImage(imageUrls.secure_url);
      onChange({
        image: imageUrls.secure_url,
        largeImage: imageUrls.eager[0].secure_url,
      });
    } catch (e) {
      // TODO trigger error report
      alert('Error uploading image'); // eslint-disable-line
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <Input
        type='file'
        name='image'
        label='Album cover'
        handleChange={upload}
        required={!isEdit}
        accept='image/x-png,image/gif,image/jpeg'
      />
      {loading && <p>Loading...</p>}
      {(!loading && image) && <img src={image} alt='Uploaded Image' width='200' />}
    </Fragment>
  );
};


FileInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default FileInput;
