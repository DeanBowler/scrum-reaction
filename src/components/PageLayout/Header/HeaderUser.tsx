import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import Box from '@styled/Box';
import BorderBox from '@styled/BorderBox';
import { useAuth } from '@contexts/authContext';

import HeaderUserMenu from './HeaderUserMenu';

export const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
`;

export const HeaderUserContainer = styled(BorderBox)`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${p => p.theme.colors.neutralLight};
  color: ${p => p.theme.colors.neutralDarker};
`;

export default function HeaderUser() {
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
