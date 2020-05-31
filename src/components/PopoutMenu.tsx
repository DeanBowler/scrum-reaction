import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useClickAway, useKey } from 'react-use';

import BorderBox from '@styled/BorderBox';
import Box, { BoxProps } from '@styled/Box';
import { FaEllipsisV } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import useDebouncedState from '@hooks/useDebouncedState';
import { LayoutProps, layout, variant } from 'styled-system';
import { getColor } from '@styled/theme';
import { IconType } from 'react-icons/lib';

const PopoutMenuMenuContainer = styled(BorderBox)`
  z-index: 1;
  position: absolute;
  top: 100%;
  left: auto;
  right: 0;
  background: ${getColor('neutralLightest')};
  border-radius: 5px;
  border: 1px solid ${getColor('neutralMid')};
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
  border-top: 1px solid ${getColor('neutralMidLight')};
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
        background: ${getColor('neutralLight')};
      }
    `}

  :focus {
    outline: none;
    background: ${getColor('neutralLight')};
  }
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
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      px={[2, 3]}
      py={[1, 2]}
    >
      {children}
    </PopoutMenuItemContainer>
  );
};

type MenuButtonVariant = 'small' | 'large';

const StyledMenuButton = styled.button<LayoutProps & { variant: MenuButtonVariant }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: ${getColor('neutralMidDark')};

  border: 1px solid transparent;

  ${variant<unknown, MenuButtonVariant>({
    variants: {
      small: {
        width: 2,
        height: 2,
        fontSize: 2,
      },
      large: {
        width: 3,
        height: 3,
        fontSize: 4,
      },
    },
  })}

  ${layout};

  :focus {
    outline: none;
    border-color: ${getColor('primary')};
  }

  :hover {
    color: ${getColor('neutralDark')};
    background: ${getColor('neutralLight')};
  }

  :disabled {
    color: ${getColor('neutralMidLight')};
    border-color: transparent;
    background: none;
  }

  &[hidden] {
    user-select: none;
    pointer-events: none;
    opacity: 0;
  }
`;

interface PopoutMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  variant?: MenuButtonVariant;
}

PopoutMenu.Button = function PopoutMenuButton({
  icon: Icon = FaEllipsisV,
  variant = 'small',
  ...p
}: PopoutMenuButtonProps) {
  return (
    <StyledMenuButton variant={variant} {...p}>
      <Icon />
    </StyledMenuButton>
  );
};
