import React, { useState, useRef } from 'react';
import Box from '../../styled/Box';
import Text from '../../styled/Text';
import Button from '../../styled/Button';
import { useAuth } from '../../contexts/authContext';
import Flex from '../../styled/Flex';
import styled from 'styled-components';

import { FaUser } from 'react-icons/fa';
import BorderBox from '../../styled/BorderBox';
import PopoutMenu, { PopoutMenuProps } from '../PopoutMenu';

// const StyledHeader = Box.withComponent('header');

const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
`;

const HeaderUserContainer = styled(BorderBox)`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${p => p.theme.colors.neutralLight};
  color: ${p => p.theme.colors.neutralDarker};
`;

interface HeaderUserMenuProps {
  show: boolean;
  onClose?: () => void;
}

function HeaderUserMenu(props: HeaderUserMenuProps) {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth();

  const loginRedirect = () =>
    loginWithRedirect({ appState: { returnTo: window.location.href } });
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
        <PopoutMenu.Item onClick={loginRedirect}>Login</PopoutMenu.Item>
      )}
    </PopoutMenu>
  );
}

function HeaderUser() {
  const { user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => setShowMenu(sm => !sm);

  return (
    <Box position="relative">
      <HeaderUserContainer
        borderRadius="50%"
        width={['2', '3']}
        height={['2', '3']}
        onClick={handleClick}
      >
        {user && user.picture ? <UserImage src={user.picture} /> : <FaUser />}
      </HeaderUserContainer>
      <HeaderUserMenu show={showMenu} onClose={() => setShowMenu(false)} />
    </Box>
  );
}

export default function Header() {
  return (
    <Flex as="header" px={[1, 4]} py={[1, 2]} backgroundColor="neutralDarker">
      <Box flex={['1 1', , '0 1']} />
      <Box flex="1 0" textAlign={['center', , 'left']}>
        <Text as="span" color="neutralLight" fontSize={[3, 5]} fontFamily="Pacifico">
          ScrumReaction
        </Text>
      </Box>
      <Flex flex="1 1" alignItems="center" justifyContent="flex-end">
        <HeaderUser />
      </Flex>
    </Flex>
  );
}
