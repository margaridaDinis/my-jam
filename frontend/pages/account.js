import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const AccountPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Link href='/permissions'>
        <a>{t('account.permissions')}</a>
      </Link>
    </div>
  );
};

export default AccountPage;
