import React, { Fragment } from 'react';
import NavigationList from '@kiwicom/orbit-components/lib/NavigationList';
import AccountCircle from '@kiwicom/orbit-components/lib/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import User from '../User';
import SignOutButton from '../../atoms/SignOutButton';
import MenuItem from '../../atoms/MenuItem';

const albumsMenuItems = ['albums', 'artists', 'genres', 'locations'];

const Nav = () => {
  const { t } = useTranslation();
  return (
    <User>
      {({ me }) => (
        <Fragment>
          <NavigationList>
            {albumsMenuItems.map((item) => (
              <MenuItem key={item} pathname={`/${item}`} translationKey={item} />
            ))}
          </NavigationList>
          <NavigationList title={t('menu.account_title')}>
            {me && (
              <Fragment>
                <MenuItem pathname='/account' translationKey='account' />
                <SignOutButton />
              </Fragment>
            )}
            {!me && (
              <Fragment>
                {/* TODO link to login page */}
                <MenuItem pathname='/signup' translationKey='signup' icon={<AccountCircle />}/>
                <MenuItem pathname='/signup' translationKey='login' icon={<AccountCircle />}/>
              </Fragment>
            )}
          </NavigationList>
        </Fragment>
      )}
    </User>
  );
};

export default Nav;
