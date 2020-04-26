import React, { useRef } from 'react';
import styled from 'styled-components';
import BorderBox from '../styled/BorderBox';
import { useClickAway, useKey } from 'react-use';
import Box, { BoxProps } from '../styled/Box';

const PopoutMenuMenuContainer = styled(BorderBox)`
  min-width: 12rem;
  position: absolute;
  top: 100%;
  left: auto;
  right: 0;
  background: ${p => p.theme.colors.neutralLightest};
  border-radius: 5px;
  border: 1px solid ${p => p.theme.colors.neutralMid};
  padding: 5px 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 0px -1px;
`;

export interface PopoutMenuProps {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function PopoutMenu({ show, onClose, children }: PopoutMenuProps) {
  const containerRef = useRef(null);
  useClickAway(containerRef, onClose);
  useKey('Escape', onClose);

  return (
    show && (
      <PopoutMenuMenuContainer ref={containerRef} marginTop="1">
        {children}
      </PopoutMenuMenuContainer>
    )
  );
}

const StyledPopoutMenuDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${p => p.theme.colors.neutralMid};
  margin: 5px;
`;

PopoutMenu.Divider = () => <StyledPopoutMenuDivider />;

const PopoutMenuItemContainer: React.FunctionComponent<BoxProps> = styled(Box)`
  display: block;
  cursor: pointer;
  :hover {
    background: ${p => p.theme.colors.neutralLight};
  }
`;

export interface PopoutMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

PopoutMenu.Item = function PopoutMenuItem({ children, onClick }: PopoutMenuItemProps) {
  return (
    <PopoutMenuItemContainer as="a" onClick={onClick} px={[2, 3]} py={[1, 2]}>
      {children}
    </PopoutMenuItemContainer>
  );
};
