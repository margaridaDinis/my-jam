import React, { Fragment } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import User from '../User';
import SignOutButton from '../../atoms/SignOutButton';
import NavStyles from '../../../styles/NavStyles';

const Nav = () => {
  const { t } = useTranslation();
  return (
    <User>
      {({ me }) => (
        <NavStyles>
          <Link href='/'>
            <a>{t('menu.home')}</a>
          </Link>
          <Link href='/albums'>
            <a>{t('menu.albums')}</a>
          </Link>
          {me && (
            <Fragment>
              <Link href='/artists'>
                <a>{t('menu.artists')}</a>
              </Link>
              <Link href='/genres'>
                <a>{t('menu.genres')}</a>
              </Link>
              <Link href='/locations'>
                <a>{t('menu.locations')}</a>
              </Link>
              <Link href='/account'>
                <a>{t('menu.account')}</a>
              </Link>
              <SignOutButton>
                {t('menu.logout')}
              </SignOutButton>
            </Fragment>
          )}
          {!me && (
            <Link href='/signup'>
              <a>{t('menu.signup')}</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
