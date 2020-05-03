import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useClickAway, useKey } from 'react-use';

import BorderBox from '@styled/BorderBox';
import Box, { BoxProps } from '@styled/Box';
import { FaEllipsisV } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import useDebouncedState from '@hooks/useDebouncedState';

const PopoutMenuMenuContainer = styled(BorderBox)`
  z-index: 1;
  position: absolute;
  top: 100%;
  left: auto;
  right: 0;
  background: ${p => p.theme.colors.neutralLightest};
  border-radius: 5px;
  border: 1px solid ${p => p.theme.colors.neutralMid};
  padding: 10px 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 0px -1px;
`;

export interface PopoutMenuProps {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function PopoutMenu({ show, onClose, children }: PopoutMenuProps) {
  const containerRef = useRef(null);

  useClickAway(containerRef, () => setTimeout(onClose, 0), ['mouseup']);
  useKey('Escape', onClose);

  const debouncedShow = useDebouncedState(show, 50);

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {debouncedShow && (
        <motion.div
          style={{ position: 'relative', zIndex: 1 }}
          transition={{
            ease: 'easeOut',
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
        >
          <PopoutMenuMenuContainer minWidth="6" ref={containerRef} marginTop="1">
            {children}
          </PopoutMenuMenuContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const StyledPopoutMenuDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${p => p.theme.colors.neutralMidLight};
  margin: 10px;
`;

PopoutMenu.Divider = () => <StyledPopoutMenuDivider />;

interface PopoutMenuItemContainerProps extends BoxProps {
  isClickable?: boolean;
}

const PopoutMenuItemContainer = styled(Box)<PopoutMenuItemContainerProps>`
  cursor: default;
  display: block;
  ${p =>
    p.isClickable &&
    css`
      cursor: pointer;
      :hover {
        background: ${p => p.theme.colors.neutralLight};
      }
    `}
`;

export interface PopoutMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  as?: React.ElementType;
}

PopoutMenu.Item = function PopoutMenuItem({
  children,
  onClick,
  as = 'a',
}: PopoutMenuItemProps) {
  return (
    <PopoutMenuItemContainer
      as={as}
      isClickable={!!onClick}
      onClick={onClick}
      px={[2, 3]}
      py={[1, 2]}
    >
      {children}
    </PopoutMenuItemContainer>
  );
};

const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  height: 2.618rem;
  width: 2.618rem;
  color: ${({ theme }) => theme.colors.neutralMidDark};

  border: 1px solid transparent;

  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  :hover {
    color: ${({ theme }) => theme.colors.neutralDark};
    background: ${({ theme }) => theme.colors.neutralLight};
  }

  :disabled {
    color: ${({ theme }) => theme.colors.neutralMidLight};
    border-color: transparent;
    background: none;
  }

  &[hidden] {
    user-select: none;
    pointer-events: none;
    opacity: 0;
  }
`;

PopoutMenu.Button = function PopoutMenuButton(
  p: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <StyledMenuButton {...p}>
      <FaEllipsisV />
    </StyledMenuButton>
  );
};
