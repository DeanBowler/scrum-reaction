import React from 'react';

import BorderBox, { BorderBoxProps } from '@styled/BorderBox';
import Box from '@styled/Box';
import Text from '@styled/Text';
import Flex from '@styled/Flex';
import styled, { css } from 'styled-components';
import { getColor } from '@styled/theme';
import { ResponsiveValue, FlexProps } from 'styled-system';

type Variants = 'link';

export interface CardProps extends BorderBoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: ResponsiveValue<Variants>;
}

const CardContentContainer = styled(BorderBox)`
  background-color: ${getColor('neutralLightest')};
  border: 1px solid ${getColor('neutralMid')};
  border-radius: 5px;
  box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 100ms;
`;

const CardTitle = styled(Text)`
  font-weight: 300;
  text-align: center;

  color: ${getColor('neutralDark')};
`;

interface CardContainerProps extends FlexProps {
  variant?: ResponsiveValue<Variants>;
}

const CardContainer = styled(Flex)<CardContainerProps>`
  ${p =>
    p.variant === 'link' &&
    css`
      cursor: pointer;
      :hover > ${CardTitle} {
        color: ${getColor('primary')};
      }
      : hover > ${CardContentContainer} {
        box-shadow: 0px 8px 0px -2px rgba(0, 0, 0, 0.1);
      }
    `};
`;

export default function Card({ title, children, variant, ...rest }: CardProps) {
  return (
    <CardContainer variant={variant} flexDirection="column" flex="1 1 auto" {...rest}>
      {title && (
        <CardTitle as="div" pb={[1]} fontSize={[2, 3]}>
          {title}
        </CardTitle>
      )}
      <CardContentContainer padding={[3, 4]} mb="5px">
        <Box width="100%">{children}</Box>
      </CardContentContainer>
    </CardContainer>
  );
}
