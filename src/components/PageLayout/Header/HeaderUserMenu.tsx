import React from 'react';

import { useAuth } from '@contexts/authContext';
import PopoutMenu from '@components/PopoutMenu';

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
          <PopoutMenu.Item>{user.name}</PopoutMenu.Item>
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
