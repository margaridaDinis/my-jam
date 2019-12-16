import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/dist/lib/router';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import Desktop from '@kiwicom/orbit-components/lib/Desktop';
import Mobile from '@kiwicom/orbit-components/lib/Mobile';
import {
  Loading, Button, TextLink, Text, Heading, Stack, Separator,
} from '@kiwicom/orbit-components/lib';
import { Edit } from '@kiwicom/orbit-components/lib/icons';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../molecules/ErrorMessage';
import DeleteButton from '../../atoms/DeleteButton';

const IndexTable = ({
  itemName, data, loading, error, query, deleteMutation,
}) => {
  const { t } = useTranslation();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Fragment>
      <Stack spaceAfter='medium'>
        <Grid gap='2rem' columns='1fr' tablet={{ columns: 'repeat(3, 1fr)' }}>
          <div>
            <Heading type='title5'>{t('table.name')}</Heading>
          </div>
          <div style={{ justifySelf: 'center' }}>
            <Heading type='title5'>{t('table.count')}</Heading>
          </div>
          <div/>
        </Grid>
      </Stack>
      <Separator spaceAfter='medium'/>
      {data[itemName].map((item) => (
        <Stack spaceAfter='medium' key={item.id}>
          <Grid
            gap='2rem'
            columns='1fr 1fr'
            tablet={{ columns: 'repeat(3, 1fr)' }}
          >
            <div style={{ alignSelf: 'center' }}>
              <TextLink
                type='secondary'
                size='normal'
                onClick={() => Router.push({ pathname: `/${itemName}/show`, query: { id: item.id } })}
              >
                <span>{item.name}</span>
              </TextLink>
            </div>
            <div style={{ alignSelf: 'center', justifySelf: 'center' }}>
              <Text>{item.albums.length}</Text>
            </div>
            <div>
              <Stack justify='end'>
                <Link href={{ pathname: `/${itemName}/update`, query: { id: item.id } }}>
                  <Button type='secondary' size='small'>
                    <Desktop>{t('button.edit')}️</Desktop>
                    <Mobile>
                      <Edit />
                    </Mobile>
                  </Button>
                </Link>
                <DeleteButton
                  id={item.id}
                  mutation={deleteMutation}
                  refetchQuery={query}
                  size='small'
                >
                  {t('button.delete')}
                </DeleteButton>
              </Stack>
            </div>
          </Grid>
          <Separator spaceAfter='medium'/>
        </Stack>
      ))}
    </Fragment>
  );
};

IndexTable.propTypes = {
  itemName: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  deleteMutation: PropTypes.object.isRequired,
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default IndexTable;
