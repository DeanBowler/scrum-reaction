import React from 'react';

import { useAuth } from '@contexts/authContext';
import PopoutMenu from '@components/PopoutMenu';
import Text from '@styled/Text';
import Flex from '@styled/Flex';

export interface HeaderUserMenuProps {
  show: boolean;
  onClose?: () => void;
}

export default function HeaderUserMenu(props: HeaderUserMenuProps) {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth();
  const logoutRedirect = () => logout({ returnTo: window.origin });
  return (
    <PopoutMenu {...props}>
      {user && (
        <>
          <PopoutMenu.Item>
            <Flex textAlign="center" flexDirection="column" lineHeight="solid">
              <Text my="1">{user.name}</Text>
              <Text color="neutralMidDark" my="1" fontSize="1">
                {user.email}
              </Text>
            </Flex>
          </PopoutMenu.Item>
          <PopoutMenu.Divider />
        </>
      )}
      {isAuthenticated ? (
        <PopoutMenu.Item onClick={logoutRedirect}>Logout</PopoutMenu.Item>
      ) : (
        <PopoutMenu.Item onClick={loginWithRedirect}>Login</PopoutMenu.Item>
      )}
    </PopoutMenu>
  );
}
