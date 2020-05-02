import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import Box from '@styled/Box';
import BorderBox, { BorderBoxProps } from '@styled/BorderBox';
import { useAuth } from '@contexts/authContext';

import HeaderUserMenu from './HeaderUserMenu';

export const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
`;

export const HeaderUserContainer = styled(BorderBox)<BorderBoxProps>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${p => p.theme.colors.neutralLight};
  color: ${p => p.theme.colors.neutralDarker};
  border: none;
  padding: 0;
`;

export default function HeaderUser() {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(sm => !sm);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  return (
    <Box position="relative">
      <HeaderUserContainer
        as="button"
        tabIndex={0}
        borderRadius="50%"
        width={['2', '3']}
        height={['2', '3']}
        onClick={handleClick}
      >
        {user && user.picture ? <UserImage src={user.picture} /> : <FaUser />}
      </HeaderUserContainer>
      <HeaderUserMenu show={showMenu} onClose={handleClose} />
    </Box>
  );
}
