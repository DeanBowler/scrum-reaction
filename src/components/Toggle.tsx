import React from 'react';
import styled from 'styled-components';
import { getColor } from '@styled/theme';
import Box, { BoxProps } from '@styled/Box';
import Text from '@styled/Text';

export interface ToggleProps extends BoxProps {
  label: string;
  currentValue: boolean;
  onClick?(): void;
}

interface StyledToggleProps {
  toggled: boolean;
}

const StyledInput = styled.input`
  display: none;
`;

const StyledToggle = styled.span<StyledToggleProps>`
  width: 42px;
  height: 24px;
  border-radius: 14px;
  margin-right: 0.5rem;

  background: ${p => (p.toggled ? getColor('primary') : getColor('neutralMidDark'))};

  transition: opacity 300ms ease-in-out;

  :hover {
    opacity: 0.9;
  }
`;

const StyledThumb = styled.div<StyledToggleProps>`
  position: relative;
  left: ${p => (p.toggled ? '20px' : '4px')};
  height: 18px;
  width: 18px;
  top: 3px;
  background: ${getColor('neutralLightest')};
  border-radius: 14px;

  transition: left 300ms cubic-bezier(0.65, 0.05, 0.36, 1), opacity 300ms ease-in-out;
`;

const ToggleContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  :focus {
    outline: none;

    ${StyledThumb} {
      opacity: 0.8;
    }
  }
`;

ToggleContainer.defaultProps = {
  as: 'label',
};

const LabelText = styled(Text)`
  white-space: nowrap;
`;

export default function Toggle({ label, currentValue, onClick, ...rest }: ToggleProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <ToggleContainer
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      {...rest}
    >
      <StyledInput type="checkbox" defaultChecked={currentValue} />
      <StyledToggle toggled={currentValue}>
        <StyledThumb toggled={currentValue} />
      </StyledToggle>
      <LabelText>{label}</LabelText>
    </ToggleContainer>
  );
}
