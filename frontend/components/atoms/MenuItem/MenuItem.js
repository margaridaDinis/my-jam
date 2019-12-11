import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'next/router';
import { NavigationListItem } from '@kiwicom/orbit-components/lib/NavigationList';
import Text from '@kiwicom/orbit-components/lib/Text';

const MenuItem = ({
  pathname, translationKey, router, icon, onClick, textType, ...rest
}) => {
  const { t } = useTranslation();
  const selected = router.pathname === pathname;

  const navigateToRoute = () => {
    if (onClick) return onClick();
    return router.push({ pathname, ...rest });
  };

  return (
    <NavigationListItem
      icon={icon}
      onClick={navigateToRoute}
      selected={selected}
      selectable
    >
      <Text type={textType}>
        {t(`menu.${translationKey}`)}
      </Text>
    </NavigationListItem>
  );
};

MenuItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  translationKey: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  textType: PropTypes.oneOf(['info', 'success', 'warning', 'critical']),
};

export default withRouter(MenuItem);
