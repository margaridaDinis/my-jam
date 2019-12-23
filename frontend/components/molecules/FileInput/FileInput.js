import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputFile, Loading, Stack, Text,
} from '@kiwicom/orbit-components/lib';
import { useTranslation } from 'react-i18next';
import { removeImage, uploadImage } from '../../../actions/file';

const FileInput = ({
  label, name, defaultValue, onChange, required,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(defaultValue);
  const [fileName, setFileName] = useState('');

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
    setFileName(uploadedFile.name);

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

  const remove = () => {
    removeImage(image);
    setImage('');
    setFileName('');
  };

  return (
    <Fragment>
      <Stack spacing='tight' direction='row' align='start' spaceAfter='smallest'>
        <Text>{label}</Text>
        {required && <Text type='critical'>*</Text>}
      </Stack>
      <InputFile
        type='file'
        id={name}
        name={name}
        onChange={upload}
        onRemoveFile={remove}
        allowedFileTypes={['image/x-png', 'image/gif', 'image/jpeg']}
        required={!required}
        fileName={fileName}
        buttonLabel={t('input.file.button')}
        placeholder={t('input.file.placeholder')}
        spaceAfter='medium'
      />
      {loading && <Loading />}
      {(!loading && image) && (
        <Stack spaceAfter='medium'>
          <img src={image} alt='Uploaded Image' width='200'/>
        </Stack>
      )}
    </Fragment>
  );
};


FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FileInput;
