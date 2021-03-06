import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading, Button, Stack } from '@kiwicom/orbit-components/lib';
import Plus from '@kiwicom/orbit-components/lib/icons/Plus';
import { useTranslation } from 'react-i18next';

const IndexHeader = ({ scope }) => {
  const { t } = useTranslation();

  return (
    <Stack direction='row' justify='between' spaceAfter='large'>
      <Heading type='display'>{t(`${scope}.heading`)}</Heading>
      <Link href={`/${scope}/new`}>
        <Button iconLeft={<Plus />}>
          {t(`${scope}.button.new`)}
        </Button>
      </Link>
    </Stack>
  );
};

IndexHeader.propTypes = {
  scope: PropTypes.string.isRequired,
};

export default IndexHeader;
