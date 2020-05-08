import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { getColor } from '@styled/theme';
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
  background: ${getColor('neutralLight')};
  color: ${getColor('neutralDarker')};
  border: none;
  padding: 0;
`;

export default function HeaderUser() {
  const { user, isLoadingAuth } = useAuth();
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
        <AnimatePresence>
          {!isLoadingAuth && (
            <motion.div
              transition={{
                ease: 'easeOut',
                duration: 0.5,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {user && user.picture ? <UserImage src={user.picture} /> : <FaUser />}
            </motion.div>
          )}
        </AnimatePresence>
        {isLoadingAuth}
      </HeaderUserContainer>
      <HeaderUserMenu show={showMenu} onClose={handleClose} />
    </Box>
  );
}
